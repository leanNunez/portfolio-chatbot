---
title: Portfolio Chatbot
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Portfolio Chatbot — Backend

FastAPI backend for the [Portfolio RAG Chatbot](../README.md). Handles RAG pipeline, LLM orchestration, and injection protection.

**Deployed on:** Hugging Face Spaces (Docker)  
**API base URL:** `https://leannunez-portfolio-chatbot.hf.space`

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Send a message, get a RAG-powered answer |
| `GET` | `/health` | Health check (requires `X-Health-Token` in prod) |

### POST /api/chat

```json
// Request
{ "message": "What technologies do you work with?" }

// Response
{
  "answer": "I work with React, TypeScript, Node.js, Python...",
  "sources": ["skills.md", "projects.md"]
}
```

Rate limited to **20 req/min per IP**. Returns `429` when exceeded.

---

## Security

- **Rate limiting** — 20 req/min via `slowapi`
- **Injection detection** — semantic similarity check against known attack patterns at startup
- **Strike ban** — 3 injection attempts → IP banned for 10 minutes
- **Proxy-aware IP** — trusts `X-Forwarded-For` only from known proxy IPs

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_API_KEY` | ✅ | Gemini + embeddings ([aistudio.google.com](https://aistudio.google.com)) |
| `GROQ_API_KEY` | ✅ | Fallback LLM if Gemini fails ([console.groq.com](https://console.groq.com/keys)) |
| `ALLOWED_ORIGINS` | ✅ | Comma-separated frontend URLs for CORS |
| `HEALTH_TOKEN` | — | Protects `/health` in prod (`openssl rand -hex 32`) |
| `ENVIRONMENT` | — | Set to `production` to disable `/docs` and `/redoc` |

---

## Local Dev

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env  # add your API keys

# Ingest CV content into ChromaDB
python scripts/ingest.py

# Start API
uvicorn main:app --reload
```

API runs at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

---

## Architecture Notes

- **No LangChain** — uses `google-generativeai` + `chromadb` directly to avoid dependency conflicts
- **Ephemeral ChromaDB** — regenerated on every deploy from `.md` source files; no persistent storage needed for a static knowledge base
- **Gemini + Groq fallback** — if Gemini hits a 429 or fails, the pipeline retries with `llama-3.3-70b-versatile` on Groq
- **Docs disabled in prod** — `/docs`, `/redoc`, and `/openapi.json` return 404 when `ENVIRONMENT=production`
