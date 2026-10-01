#!/bin/bash
set -e

# If ingest fails (e.g. embedding quota exhausted), start anyway: the API falls back
# to keyword (BM25) retrieval over the same chunks.
python scripts/ingest.py || echo "[WARN] Ingest failed — starting without vector index."

exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860} --workers 1
