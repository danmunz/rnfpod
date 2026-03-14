import argparse
from pathlib import Path

from tools._common import read_json, write_json, die


def map_time(t: float, mapping: list[dict]) -> float | None:
    """Map a source time to destination time using time_map.json.

    mapping items: {source_from, source_to, dest_from}
    If t falls inside [source_from, source_to), dest = dest_from + (t - source_from)
    If t falls inside a removed interval, return None.
    """
    for m in mapping:
        sf = float(m["source_from"])
        st = float(m["source_to"])
        df = float(m["dest_from"])
        if sf <= t < st:
            return df + (t - sf)
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    work = base / "work"
    pub = base / "publish"

    tpath = work / "transcript.json"
    mpath = pub / "time_map.json"
    if not tpath.exists():
        die("Missing transcript.json")
    if not mpath.exists():
        die("Missing time_map.json")

    transcript = read_json(tpath)
    segments = transcript.get("segments", transcript)
    mapping = read_json(mpath)

    new_segments = []
    for s in segments:
        start = map_time(float(s["start"]), mapping)
        end = map_time(float(s["end"]), mapping)
        if start is None or end is None or end <= start:
            continue
        ns = dict(s)
        ns["start"] = start
        ns["end"] = end
        new_segments.append(ns)

    out = {"segments": new_segments}
    write_json(pub / "transcript_published.json", out)
    print(f"Wrote {pub/'transcript_published.json'}")


if __name__ == "__main__":
    main()