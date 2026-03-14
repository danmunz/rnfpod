#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

from tools._common import read_json, write_json, die
from tools.llm_client import generate

SYSTEM_PROMPT = """
You are writing show notes for a dad-and-daughter podcast that is exactly what the title promises:
Random Neural Firings. The podcasters, Dan (the dad) and AJ (the 12 year old daughter) have rambling,
sometimes random, often interesting, and always fun conversations about the world, AJ's life
and thoughts, and what it's like to be a kid these days. 

Episode descriptions should read like a clear, relaxed conversation between thoughtful people who trust
the listener's intelligence. Write with quiet confidence and restraint: say exactly what the episode is
about, why it's interesting this time, and then stop. The tone should feel human, edited, and
intentional -- never hyped, promotional, or self-important. Humor, when present, should be dry and
incidental, lightly nerdy and ironic, embedded in phrasing rather than delivered as a joke. Assume the
reader is skimming and deciding quickly; reward them with specificity, clarity, and an implied point of
view without overexplaining or summarizing the entire conversation.

Keep it specific to what was actually said.

Mentions should help the listener gain context and explore the things mentioned on the show.

Return JSON only.
""".strip()

PROMPT_EPISODE_PACKAGE = """
Return JSON only with this schema:
{{
  "episode_title": "string",
  "summary": "2 short paragraphs",
  "segments": [
    {{"title": "string", "start": number, "end": number, "one_sentence": "string"}}
  ],
  "highlights": ["string", "string", "string"],
  "mentions": [
    {{"label": "string", "type": "Book|Movie|TV|Person|Place|Organization|Website|Other", "context": "string"}}
  ]
}}

Constraints:
- Segments: 3-7.
- Segment titles: playful but clear.
- Timestamps are seconds and MUST be within the transcript timeline.
- Constrain Mentions to proper nouns or specific concepts mentioned in the transcript.

Style constraints:
- Write in the first person plural; address the listener implicitly, never directly
- Sound conversational but edited: calm, confident, understated, no filler
- Avoid hype, urgency, self-praise, or any marketing language
- Use dry, subtle humor only when it naturally fits the phrasing
- Be specific about what we talk about and why it matters this time
- Prefer plain, concrete language drawn from the conversation itself
- Avoid clichés and stock podcast or promo phrasing
- Default to one compact paragraph with short, skimmable sentences
- Use an implicit structure: framing, focus, quiet takeaway
- If it could describe many podcasts or sounds like platform copy, rewrite it
- Aim for "this sounds like us," not "this sounds professional"

Transcript with timestamps:

{transcript}
""".strip()


def build_llm_transcript(segments: list[dict]) -> str:
    lines = []
    for s in segments:
        st = float(s["start"])
        en = float(s["end"])
        spk = s.get("speaker", "SPEAKER")
        text = (s.get("text") or "").strip().replace("\n", " ")
        lines.append(f"[{st:.2f}-{en:.2f}] ({spk}) {text}")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--episode", required=True)
    args = parser.parse_args()

    ep = args.episode
    base = Path("episodes") / ep
    pub = base / "publish"

    tpath = pub / "transcript_published.json"
    if not tpath.exists():
        die("Missing transcript_published.json. Run tools/45_remap_transcript.py first.")

    data = read_json(tpath)
    segments = data.get("segments", [])

    llm_text = build_llm_transcript(segments)
    (pub / "transcript_llm.txt").write_text(llm_text)

    prompt = PROMPT_EPISODE_PACKAGE.format(transcript=llm_text)
    out = generate(prompt, system=SYSTEM_PROMPT)

    try:
        pkg = json.loads(out)
    except Exception:
        start = out.find("{")
        end = out.rfind("}")
        if start == -1 or end == -1:
            die("LLM did not return JSON.")
        pkg = json.loads(out[start : end + 1])

    write_json(pub / "episode_package.json", pkg)
    print(f"Wrote {pub/'transcript_llm.txt'}")
    print(f"Wrote {pub/'episode_package.json'}")


if __name__ == "__main__":
    main()
