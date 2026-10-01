---
title: Portfolio Chatbot
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Portfolio Chatbot — RAG over CV

> AI-powered chatbot that answers questions about my experience, projects and skills using Retrieval-Augmented Generation (RAG).

**Live demo → [portfoliochatbot-sepia.vercel.app](https://portfoliochatbot-sepia.vercel.app)** · API → [lean-dev-portfolio-chatbot.hf.space](https://lean-dev-portfolio-chatbot.hf.space)

---

## Quick path (local)

```bash
git clone https://github.com/leanNunez/portfolio-chatbot
cd portfolio-chatbot

# 1. Backend (port 7860 is required: the Vite dev proxy targets it)
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# create .env with GOOGLE_API_KEY and GROQ_API_KEY (see backend/README.md)
python scripts/ingest.py           # build the ChromaDB knowledge base
uvicorn main:app --reload --port 7860

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev                        # http://localhost:5173
```

Open `http://localhost:5173` and ask a question. In dev the frontend calls `/api` and Vite proxies it to `http://localhost:7860`.

Details: [backend/README.md](backend/README.md) · [frontend/README.md](frontend/README.md)

---

## How it works

Instead of fine-tuning a model, the chatbot retrieves relevant context from a knowledge base (my CV, projects, skills and bio) before generating an answer.

```
User question
      │
      ▼
Injection check (keywords + semantic similarity)
      │
      ▼
Embed question (gemini-embedding-001)
      │
      ▼
Top-4 similar chunks from ChromaDB
      │
      ▼
Context + question → Gemini (fallback: Groq)
      │
      ▼
JSON response: { answer, sources }
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| LLM | Google Gemini `gemini-2.5-flash` (fallback: Groq `openai/gpt-oss-120b`) |
| Embeddings | Google `models/gemini-embedding-001` |
| Vector store | ChromaDB (rebuilt on every deploy) |
| Backend | FastAPI + Uvicorn, `slowapi` rate limiting |
| Frontend | React 19 + Vite + Tailwind CSS v4 + `react-markdown` |
| Backend deploy | Hugging Face Spaces (Docker) |
| Frontend deploy | Vercel |

---

## RAG pipeline

**Ingest** (`backend/scripts/ingest.py`, runs on every container start):

1. Read the `.md` files in `backend/data/`.
2. Split on blank lines into chunks of up to ~500 characters.
3. Embed each chunk with the Google AI API, retrying on 429 quota errors.
4. Store vectors in ChromaDB (the collection is recreated each run).

**Query** (`POST /api/chat`, every user message):

1. Reject prompt-injection attempts (keyword filter, then semantic similarity).
2. Embed the question and fetch the top 4 chunks from ChromaDB.
3. Build the prompt with the retrieved context.
4. Call Gemini; on any failure or empty answer, call Groq instead.
5. Return the full answer as JSON with its source names (`cv`, `projects`, `skills`, `bio`). There is no streaming.

---

## Updating the CV

Edit the `.md` files in `backend/data/` and push to `main`.

```
edit .md → push to main → GitHub Action syncs backend/ to HF → container rebuilds → ingest.py runs → done
```

- Keep each Q&A section in a single paragraph (no blank lines inside it) so it lands in one chunk and retrieves on its own.
- The knowledge base is ~109 chunks and the embedding free tier allows 100 requests/min, so ingest may wait on quota. A deploy's startup can take a couple of minutes.

---

## Deployment

| Part | Platform | How |
|------|----------|-----|
| Backend | Hugging Face Space (Docker) | Push to `main` → `.github/workflows/deploy-hf.yml` pushes the `backend/` subtree to the Space (requires the `HF_TOKEN` repo secret) → the container rebuilds and re-ingests. |
| Frontend | Vercel | Project **Root Directory = `frontend`**. Set `VITE_API_URL` to the backend URL for production builds. |

`render.yaml` describes an alternative backend deploy on Render (ingest at build time, then Uvicorn). It is not the live deployment.

---

## Project structure

```
portfolio-chatbot/
├── .github/workflows/
│   └── deploy-hf.yml       # Syncs backend/ to the Hugging Face Space on push to main
├── backend/
│   ├── data/               # Knowledge base (.md): bio, cv, projects, skills
│   ├── models/             # Pydantic request/response schemas
│   ├── routers/            # /api/chat route, rate limit, strike ban
│   ├── services/           # RAG pipeline, LLM calls, injection detection
│   ├── scripts/
│   │   └── ingest.py       # Chunks .md files → embeddings → ChromaDB
│   ├── Dockerfile          # HF Spaces image (port 7860)
│   ├── start.sh            # Runs ingest.py, then uvicorn
│   └── main.py             # FastAPI app, CORS, /api/status, /health
├── docs/
│   └── art-direction.md    # Visual design source of truth
├── frontend/
│   ├── src/
│   │   ├── components/     # Chat UI, robot mascot, profile panel/drawer
│   │   ├── context/        # Chat and language (ES/EN) contexts
│   │   ├── hooks/          # useChat, useMediaQuery
│   │   └── lib/            # API config, robot mood, profile data, cn()
│   └── vercel.json         # SPA routing rewrites
└── render.yaml             # Alternative backend deploy (Render)
```

---

## Architecture decisions

| Decision | Why |
|----------|-----|
| No LangChain | Dropped due to unresolvable dependency conflicts with `langchain-google-genai`. Uses `google-generativeai`, `groq` and `chromadb` directly. |
| Ephemeral ChromaDB | The knowledge base is static, so regenerating it on every deploy from the source `.md` files is reliable and needs no persistent storage. |
| Gemini + Groq fallback | Gemini is the primary model. Any Gemini error (quota, outage, safety block) or empty answer falls back to Groq, so the chat keeps answering. |
| JSON over streaming | Answers are short; a single JSON response keeps the client and error handling simple. |

---

## Author

**Leandro Pablo Nuñez** — Full Stack Developer
UTN FRT Tucumán · Expected graduation 2026/2027

[GitHub](https://github.com/leanNunez) · [Live Demo](https://portfoliochatbot-sepia.vercel.app)
