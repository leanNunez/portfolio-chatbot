---
title: Portfolio Chatbot
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Portfolio Chatbot — Backend

FastAPI backend for the [Portfolio RAG Chatbot](../README.md): RAG pipeline, LLM orchestration (Gemini with Groq fallback) and prompt-injection protection.

**Deployed on:** Hugging Face Spaces (Docker, port 7860)  
**API base URL:** `https://lean-dev-portfolio-chatbot.hf.space`

---

## Quick path (local)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# create .env with GOOGLE_API_KEY and GROQ_API_KEY (see Environment variables)
python scripts/ingest.py             # build ChromaDB from data/*.md
uvicorn main:app --reload --port 7860
```

Verify: `curl http://localhost:7860/api/status` → `{"status":"ok"}`. Interactive docs at `http://localhost:7860/docs`.

Use port **7860**: the frontend's Vite dev proxy forwards `/api` there.

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Send a message, get a RAG answer. Rate limited to 20 req/min; returns `429` when exceeded. |
| `GET` | `/api/status` | Public liveness check. The frontend status badge uses it. |
| `GET` | `/health` | Health check. In production, if `HEALTH_TOKEN` is set, requires a matching `X-Health-Token` header (otherwise `404`). |

### POST /api/chat

```json
// Request (message: 1–1000 characters)
{ "message": "What technologies do you work with?" }

// Response
{
  "answer": "I work with React, TypeScript, Node.js, Python...",
  "sources": ["skills", "projects"]
}
```

`sources` holds source names: `cv`, `projects`, `skills`, `bio`. The response is a single JSON body (no streaming).

---

## Environment variables

Create `backend/.env` with the required variables; the rest are optional.

| Variable | Required | Default | Description |
|---|---|---|---|
| `GOOGLE_API_KEY` | ✅ | — | Gemini + embeddings ([aistudio.google.com](https://aistudio.google.com)) |
| `GROQ_API_KEY` | ✅ | — | Fallback LLM ([console.groq.com](https://console.groq.com/keys)) |
| `ALLOWED_ORIGINS` | ✅ in prod | `*` | Comma-separated frontend URLs for CORS |
| `LLM_MODEL` | — | `gemini-2.5-flash` | Primary Gemini model |
| `GROQ_MODEL` | — | `openai/gpt-oss-120b` | Fallback Groq model |
| `HEALTH_TOKEN` | — | — | Protects `/health` in prod (`openssl rand -hex 32`) |
| `ENVIRONMENT` | — | — | `production` disables `/docs`, `/redoc`, `/openapi.json` and lowers log level to INFO |
| `CHROMA_PERSIST_DIR` | — | `./chroma_db` | ChromaDB storage path |

---

## RAG pipeline

| Step | Detail |
|------|--------|
| Ingest | `scripts/ingest.py` splits `data/*.md` on blank lines into chunks of up to ~500 chars, embeds them with `models/gemini-embedding-001`, and recreates the `portfolio` collection. |
| Retrieve | The question is embedded and the top 4 chunks are fetched. |
| Generate | Gemini (`LLM_MODEL`) answers from that context. Any Gemini error or empty answer falls back to Groq (`GROQ_MODEL`). |

Knowledge-base tips:

- Keep each Q&A section in a single paragraph so it becomes one chunk and retrieves on its own.
- The KB is ~109 chunks and the embedding free tier allows 100 requests/min. Ingest retries on 429 (up to 5 times, 30 s apart), so startup can take a couple of minutes.

---

## Deployment

| Step | What happens |
|------|--------------|
| 1. Push to `main` | `.github/workflows/deploy-hf.yml` pushes the `backend/` subtree to the Space (needs the `HF_TOKEN` repo secret). |
| 2. Build | HF builds the `Dockerfile` (Python 3.11). |
| 3. Start | `start.sh` runs `ingest.py`, then `uvicorn` on port 7860. At startup the app pre-computes injection embeddings and warms up ChromaDB. |

Set `GOOGLE_API_KEY`, `GROQ_API_KEY`, `ALLOWED_ORIGINS`, `ENVIRONMENT=production` and optionally `HEALTH_TOKEN` as Space secrets.

`render.yaml` (repo root) is an alternative Render deploy; it is not the live one.

---

## Security

| Control | Behavior |
|---------|----------|
| Rate limiting | 20 req/min per client on `/api/chat` via `slowapi` |
| Injection detection | Keyword filter (normalized, also catches spaced-out letters), then semantic similarity against multilingual attack examples embedded at startup |
| Strike ban | 3 blocked injection attempts → IP banned for 10 minutes |
| Proxy-aware IP | `X-Forwarded-For` is trusted only when the request comes from a loopback proxy |
| Docs disabled in prod | `/docs`, `/redoc` and `/openapi.json` return 404 when `ENVIRONMENT=production` |
| Prompt hardening | The system prompt is sent separately and instructs the model to ignore role-change attempts |

---

## Architecture notes

- **No LangChain**: uses `google-genai`, `groq` and `chromadb` directly to avoid dependency conflicts.
- **Degraded mode**: if embeddings are unavailable (e.g. the free-tier daily quota of 1000 embed requests is exhausted), ingest failure no longer stops the container. Retrieval falls back to keyword (BM25) search over the same chunks, and injection detection keeps its keyword layer. Answers keep working through Groq even when Gemini's quota is also gone.
- **Ephemeral ChromaDB**: regenerated on every deploy from the `.md` sources; a static knowledge base needs no persistent storage.
- **Gemini + Groq fallback**: on any Gemini failure or empty answer, the request is retried on Groq.
