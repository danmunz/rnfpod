from __future__ import annotations

import os
import json
import requests

from tools._common import die, load_config_env


def _config() -> tuple[str, str, str, str]:
    # Auto-load config.env if API key not already set
    load_config_env()

    provider = os.getenv("LLM_PROVIDER", "openai").strip().lower()
    model = os.getenv("LLM_MODEL", "gpt-4o-mini").strip()
    base_url = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1").strip()
    api_key = os.getenv("LLM_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not api_key:
        die("Missing LLM_API_KEY or OPENAI_API_KEY in environment")
    return provider, model, base_url, api_key


def generate(prompt: str, system: str | None = None, temperature: float = 0.2) -> str:
    provider, model, base_url, api_key = _config()

    if provider not in {"openai", "openai-compatible"}:
        die(f"Unsupported LLM_PROVIDER: {provider}")

    messages = []
    if system:
        messages.append({"role": "system", "content": system})
    messages.append({"role": "user", "content": prompt})

    url = base_url.rstrip("/") + "/chat/completions"
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    resp = requests.post(url, headers=headers, data=json.dumps(payload), timeout=120)
    if resp.status_code != 200:
        die(f"LLM request failed: {resp.status_code} {resp.text}")

    data = resp.json()
    try:
        return data["choices"][0]["message"]["content"]
    except Exception:
        die("Unexpected LLM response shape")
