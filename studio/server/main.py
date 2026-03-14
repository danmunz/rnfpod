"""Random Neural Firings — Studio Server.

Run from repo root:
    uvicorn studio.server.main:app --reload --port 8000
"""

from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from tools._common import load_config_env

from studio.server.api import episodes, pipeline, audio, cuts, preview

# Load config.env / .env on startup
load_config_env()

app = FastAPI(title="RNF Studio", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(episodes.router, prefix="/api")
app.include_router(pipeline.router, prefix="/api")
app.include_router(audio.router, prefix="/api")
app.include_router(cuts.router, prefix="/api")
app.include_router(preview.router, prefix="/api")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}
