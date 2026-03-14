"""Cloudflare R2 upload via S3-compatible API."""

from __future__ import annotations

import os
from pathlib import Path

import boto3
from botocore.config import Config


def _get_client():
    account_id = os.environ.get("R2_ACCOUNT_ID", "")
    access_key = os.environ.get("R2_ACCESS_KEY_ID", "")
    secret_key = os.environ.get("R2_SECRET_ACCESS_KEY", "")
    if not all([account_id, access_key, secret_key]):
        raise RuntimeError("R2 credentials not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in config.env")
    return boto3.client(
        "s3",
        endpoint_url=f"https://{account_id}.r2.cloudflarestorage.com",
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


def upload_file(local_path: Path, key: str, content_type: str) -> str:
    """Upload a file to R2 and return the public URL."""
    bucket = os.environ.get("R2_BUCKET_NAME", "")
    public_url = os.environ.get("R2_PUBLIC_URL", "").rstrip("/")
    if not bucket:
        raise RuntimeError("R2_BUCKET_NAME not set in config.env")

    client = _get_client()
    client.upload_file(
        str(local_path),
        bucket,
        key,
        ExtraArgs={"ContentType": content_type},
    )
    return f"{public_url}/{key}" if public_url else key
