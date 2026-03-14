#!/usr/bin/env python3
import argparse
import re
from pathlib import Path

from tools._common import die, read_json, write_json

ANCHOR_PATTERNS = [
    r"\b(i am|i'm|im|this is|it's|its|my name is)\s+{name}\b",
    r"\baka\s+{name}\b",
]


def load_alias_map(ep: str) -> dict[str, str]:
    aliases: dict[str, str] = {}

    ep_aliases = Path("episodes") / ep / "work" / "speaker_aliases.json"
    root_aliases = Path("speaker_aliases.json")
    for alias_path in [root_aliases, ep_aliases]:
        if not alias_path.exists():
            continue
        data = read_json(alias_path)
        if not isinstance(data, dict):
            continue
        for canon, alias_list in data.items():
            if canon:
                aliases[canon.lower()] = canon
            for alias in alias_list:
                alias = str(alias).strip().lower()
                if alias:
                    aliases[alias] = canon

    # Fallback to speakers.json names if no alias file exists.
    if not aliases:
        ep_map = Path("episodes") / ep / "speakers.json"
        root_map = Path("speakers.json")
        for map_path in [ep_map, root_map]:
            if not map_path.exists():
                continue
            data = read_json(map_path)
            if not isinstance(data, dict):
                continue
            for name in data.values():
                name = str(name).strip()
                if name:
                    aliases[name.lower()] = name
    return aliases


def detect_anchor(text: str, alias_map: dict[str, str]) -> str | None:
    t = text.lower()
    hits = []
    for alias, canon in alias_map.items():
        name = re.escape(alias)
        for pat in ANCHOR_PATTERNS:
            if re.search(pat.format(name=name), t):
                hits.append(canon)
                break
    if not hits:
        return None
    unique = sorted(set(hits))
    if len(unique) == 1:
        return unique[0]
    return None


def word_count(text: str) -> int:
    return len([w for w in re.split(r"\s+", text.strip()) if w])


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument("--anchor-window", type=float, default=6.0)
    parser.add_argument("--short-sec", type=float, default=1.0)
    parser.add_argument("--short-words", type=int, default=3)
    parser.add_argument("--min-prev-sec", type=float, default=1.5)
    args = parser.parse_args()

    ep = args.episode
    work = Path("episodes") / ep / "work"
    tpath = work / "transcript.json"
    if not tpath.exists():
        die("Missing transcript.json. Run tools/12_normalize_transcript.py first.")

    data = read_json(tpath)
    segments = data.get("segments", [])
    segments = sorted(segments, key=lambda s: float(s.get("start", 0.0)))

    alias_map = load_alias_map(ep)
    if not alias_map:
        die("No speaker names found. Add speakers.json or speaker_aliases.json.")

    # Pass 1: anchor window override
    anchor_updates = 0
    active_speaker = None
    active_until = 0.0
    for s in segments:
        text = (s.get("text") or "").strip()
        start = float(s.get("start", 0.0))
        anchor = detect_anchor(text, alias_map)
        if anchor:
            active_speaker = anchor
            active_until = start + args.anchor_window
        if active_speaker and start <= active_until:
            if s.get("speaker") != active_speaker:
                s["speaker"] = active_speaker
                anchor_updates += 1
        s["_anchor"] = bool(anchor)

    # Pass 2: short-segment reassignment
    short_updates = 0
    for i in range(1, len(segments)):
        s = segments[i]
        prev = segments[i - 1]
        next_seg = segments[i + 1] if i + 1 < len(segments) else None

        if s.get("_anchor"):
            continue

        dur = float(s.get("end", 0.0)) - float(s.get("start", 0.0))
        wc = word_count(s.get("text", ""))

        if dur >= args.short_sec and wc > args.short_words:
            continue

        if s.get("speaker") == prev.get("speaker"):
            continue

        prev_dur = float(prev.get("end", 0.0)) - float(prev.get("start", 0.0))
        if prev_dur < args.min_prev_sec:
            continue

        if next_seg and next_seg.get("speaker") == prev.get("speaker"):
            s["speaker"] = prev.get("speaker")
            short_updates += 1
            continue

        s["speaker"] = prev.get("speaker")
        short_updates += 1

    # Remove internal markers
    for s in segments:
        s.pop("_anchor", None)

    data["segments"] = segments
    write_json(tpath, data)
    print(f"Updated {tpath}")
    print(f"Anchor overrides: {anchor_updates}")
    print(f"Short-segment reassignments: {short_updates}")


if __name__ == "__main__":
    main()
