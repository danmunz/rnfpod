#!/usr/bin/env python3
import argparse
import json
import re
from pathlib import Path

from tools._common import die, read_json, write_json

ANCHOR_PATTERNS = [
    r"\b(i am|i'm|im|this is|it's|its|my name is)\s+{name}\b",
    r"\baka\s+{name}\b",
]


def load_canonical_names(ep: str) -> list[str]:
    # Prefer an explicit aliases file if available.
    ep_aliases = Path("episodes") / ep / "work" / "speaker_aliases.json"
    root_aliases = Path("speaker_aliases.json")
    if ep_aliases.exists():
        data = read_json(ep_aliases)
        return list(data.keys())
    if root_aliases.exists():
        data = read_json(root_aliases)
        return list(data.keys())

    # Fall back to values in speakers.json if present.
    ep_map = Path("episodes") / ep / "speakers.json"
    root_map = Path("speakers.json")
    if ep_map.exists():
        data = read_json(ep_map)
        return list({str(v) for v in data.values() if str(v).strip()})
    if root_map.exists():
        data = read_json(root_map)
        return list({str(v) for v in data.values() if str(v).strip()})

    return []


def load_alias_map(ep: str) -> dict[str, str]:
    aliases: dict[str, str] = {}
    canonical_names = load_canonical_names(ep)
    for name in canonical_names:
        aliases[name.lower()] = name

    ep_aliases = Path("episodes") / ep / "work" / "speaker_aliases.json"
    root_aliases = Path("speaker_aliases.json")
    for alias_path in [root_aliases, ep_aliases]:
        if not alias_path.exists():
            continue
        data = read_json(alias_path)
        if not isinstance(data, dict):
            continue
        for canon, alias_list in data.items():
            for alias in alias_list:
                alias = str(alias).strip().lower()
                if alias:
                    aliases[alias] = canon
    return aliases


def find_anchor_hits(text: str, alias_map: dict[str, str]) -> list[str]:
    hits = []
    t = text.lower()
    for alias, canon in alias_map.items():
        name = re.escape(alias)
        for pat in ANCHOR_PATTERNS:
            if re.search(pat.format(name=name), t):
                hits.append(canon)
                break
    return hits


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Write a mapping even if confidence is low or ambiguous",
    )
    args = parser.parse_args()

    ep = args.episode
    work = Path("episodes") / ep / "work"
    tpath = work / "transcript.json"
    if not tpath.exists():
        die("Missing transcript.json. Run tools/12_normalize_transcript.py first.")

    data = read_json(tpath)
    segments = data.get("segments", [])

    alias_map = load_alias_map(ep)
    if not alias_map:
        die("No speaker names found. Add speakers.json or speaker_aliases.json.")

    counts: dict[str, dict[str, int]] = {}
    for s in segments:
        text = (s.get("text") or "").strip()
        if not text:
            continue
        spk_id = str(s.get("speaker_id") or s.get("speaker") or "")
        if not spk_id:
            continue
        hits = find_anchor_hits(text, alias_map)
        if not hits:
            continue
        for canon in hits:
            counts.setdefault(spk_id, {})[canon] = counts.setdefault(spk_id, {}).get(canon, 0) + 1

    # Pick the best mapping for each speaker_id
    suggested: dict[str, str] = {}
    confidence: dict[str, float] = {}
    for spk_id, name_counts in counts.items():
        total = sum(name_counts.values())
        if total <= 0:
            continue
        best_name, best_count = max(name_counts.items(), key=lambda kv: kv[1])
        suggested[spk_id] = best_name
        confidence[spk_id] = best_count / total

    # Resolve conflicts where multiple speaker_ids map to the same name
    used = {}
    final_map: dict[str, str] = {}
    conflicts = []
    for spk_id, name in suggested.items():
        if name not in used:
            used[name] = spk_id
            final_map[spk_id] = name
        else:
            conflicts.append((name, used[name], spk_id))

    # If we found no anchors at all, stop unless forced.
    if not suggested and not args.force:
        report = work / "speaker_calibration.md"
        _write_report(report, counts, suggested, confidence, conflicts)
        die(
            "No anchor phrases found for speaker calibration. "
            "Add speaker_aliases.json, or rerun with --force."
        )

    if conflicts and not args.force:
        report = work / "speaker_calibration.md"
        _write_report(report, counts, suggested, confidence, conflicts)
        die(
            "Ambiguous speaker mapping. Review speaker_calibration.md or rerun with --force."
        )

    # Apply mapping to segments
    for s in segments:
        spk_id = str(s.get("speaker_id") or s.get("speaker") or "")
        if spk_id in final_map:
            s["speaker"] = final_map[spk_id]

    data["segments"] = segments

    write_json(work / "speaker_map.json", final_map)
    write_json(work / "transcript.json", data)
    report = work / "speaker_calibration.md"
    _write_report(report, counts, suggested, confidence, conflicts)

    print(f"Wrote {work/'speaker_map.json'}")
    print(f"Updated {tpath}")
    print(f"Wrote {report}")


def _write_report(path: Path, counts, suggested, confidence, conflicts) -> None:
    lines = [
        "# Speaker calibration report\n",
        "\n",
    ]
    lines.append("## Counts by speaker_id\n")
    for spk_id, name_counts in counts.items():
        lines.append(f"- {spk_id}: {name_counts}\n")

    lines.append("\n## Suggested mapping\n")
    for spk_id, name in suggested.items():
        conf = confidence.get(spk_id, 0.0)
        lines.append(f"- {spk_id} -> {name} (confidence {conf:.2f})\n")

    if conflicts:
        lines.append("\n## Conflicts\n")
        for name, a, b in conflicts:
            lines.append(f"- {name}: {a} vs {b}\n")
    path.write_text("".join(lines))


if __name__ == "__main__":
    main()
