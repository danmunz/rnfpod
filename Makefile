EP ?=

-include config.env
export DEEPGRAM_API_KEY DEEPGRAM_MODEL DEEPGRAM_LANGUAGE
export LLM_PROVIDER LLM_MODEL LLM_BASE_URL LLM_API_KEY OPENAI_API_KEY
export R2_ACCOUNT_ID R2_ACCESS_KEY_ID R2_SECRET_ACCESS_KEY R2_BUCKET_NAME R2_PUBLIC_URL

.PHONY: episode studio env

env:
	@echo "Run this in your shell:"
	@echo "  set -a; source config.env; set +a"

studio:
	@echo "Starting RNF Studio..."
	@trap 'kill 0' EXIT; \
	(cd studio/client && npm run dev) & \
	(.venv/bin/uvicorn studio.server.main:app --reload --port 8000) & \
	wait

episode:
	@if [ -z "$(EP)" ]; then echo "Usage: make episode EP=ep001"; exit 1; fi
	python3 -m tools.10_init_episode $(EP)
	@echo ""
	@echo "Now record and place: episodes/$(EP)/raw/$(EP).wav"
	@echo "   Then press Enter to continue."; read _
	bash tools/10_transcribe.sh $(EP)
	python3 -m tools.20_make_cutlist --episode $(EP)
	python3 -m tools.30_review_cutlist --episode $(EP)
	@echo ""
	@echo "STOP: review episodes/$(EP)/work/cutlist_review.md"
	@echo "   Approve with: python3 -m tools.30_review_cutlist --episode $(EP) --approve"
	@echo "   Then re-run: make episode EP=$(EP)"
	@if [ ! -f episodes/$(EP)/work/cutlist.approved ]; then exit 2; fi
	python3 -m tools.40_apply_cutlist --episode $(EP)
	ffmpeg -f concat -safe 0 -i episodes/$(EP)/publish/keep.txt -ar 48000 -ac 2 episodes/$(EP)/publish/$(EP)_cut.wav
	ffmpeg -i episodes/$(EP)/publish/$(EP)_cut.wav -codec:a libmp3lame -qscale:a 2 episodes/$(EP)/publish/$(EP).mp3
	python3 -m tools.45_remap_transcript --episode $(EP)
	python3 -m tools.50_notes_and_segments --episode $(EP)
	python3 -m tools.60_link_resolve --episode $(EP)
	python3 -m tools.55_make_show_notes --episode $(EP)
	@echo ""
	@echo "Generate cover background at episodes/$(EP)/work/cover_bg.png (local image model), then run:"
	@echo "   python3 -m tools.70_make_cover --episode $(EP)"
	@echo "   python3 -m tools.80_publish_to_site --episode $(EP)"
