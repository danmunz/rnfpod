import argparse
import re
import sys
from pathlib import Path

import requests
from rapidfuzz import fuzz
from bs4 import BeautifulSoup

from tools._common import read_json, write_json, die

WIKI_API = "https://en.wikipedia.org/w/api.php"
USER_AGENT = "RandomNeuralFiringsBot/0.1 (contact: local)"


def wiki_search(query: str) -> tuple[str | None, str | None]:
    try:
        resp = requests.get(
            WIKI_API,
            params={
                "action": "query",
                "list": "search",
                "srsearch": query,
                "format": "json",
            },
            headers={"User-Agent": USER_AGENT},
            timeout=30,
        )
    except requests.RequestException as exc:
        print(f"Warning: Wikipedia request failed for '{query}': {exc}", file=sys.stderr)
        return None, None

    if resp.status_code != 200:
        print(
            f"Warning: Wikipedia HTTP {resp.status_code} for '{query}'",
            file=sys.stderr,
        )
        return None, None

    try:
        r = resp.json()
    except requests.JSONDecodeError:
        snippet = (resp.text or "").strip().replace("\n", " ")[:200]
        print(
            f"Warning: Wikipedia returned non-JSON for '{query}': {snippet}",
            file=sys.stderr,
        )
        return None, None

    items = r.get("query", {}).get("search", [])
    if not items:
        return None, None

    top = items[0]
    title = top.get("title")
    if not title:
        return None, None

    score = fuzz.ratio(query.lower(), title.lower())
    if score < 55:
        return None, None

    url = f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
    return title, url


def extract_official_site_from_wikipedia(page_url: str) -> str | None:
    # Strict: only use the “Official website” infobox link.
    try:
        resp = requests.get(page_url, headers={"User-Agent": USER_AGENT}, timeout=30)
    except requests.RequestException:
        return None
    if resp.status_code != 200:
        return None

    html = resp.text
    soup = BeautifulSoup(html, "lxml")

    infobox = soup.select_one("table.infobox")
    if not infobox:
        return None

    # Look for a row that contains “Official website”
    for row in infobox.select("tr"):
        header = row.find("th")
        if header and re.search(r"official website", header.get_text(" ", strip=True), re.I):
            link = row.find("a", href=True)
            if link and link["href"].startswith("http"):
                return link["href"]
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    args = parser.parse_args()

    ep = args.episode
    pub = Path("episodes") / ep / "publish"

    pkg_path = pub / "episode_package.json"
    if not pkg_path.exists():
        die("Missing episode_package.json. Run tools/50_notes_and_segments.py first.")

    pkg = read_json(pkg_path)
    out = []

    for m in pkg.get("mentions", []):
        label = (m.get("label") or "").strip()
        mtype = (m.get("type") or "Other").strip()
        if not label:
            continue

        _, wiki_url = wiki_search(label)
        if not wiki_url:
            continue

        item = {"label": label, "type": mtype, "wikipedia_url": wiki_url}

        # Official site only for Organization / Website (and only if Wikipedia infobox has it)
        if mtype in {"Organization", "Website"}:
            official = extract_official_site_from_wikipedia(wiki_url)
            if official:
                item["official_url"] = official

        out.append(item)

    write_json(pub / "links.json", out)
    print(f"Wrote {pub/'links.json'} ({len(out)} links)")


if __name__ == "__main__":
    main()
