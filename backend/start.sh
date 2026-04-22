#!/bin/bash
set -e

python scripts/ingest.py

exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1
