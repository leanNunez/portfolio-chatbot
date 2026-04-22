# Portfolio Chatbot — RAG over CV

> AI-powered chatbot that answers questions about my experience, projects and skills using Retrieval-Augmented Generation (RAG).

**Live demo → [portfoliochatbot-sepia.vercel.app](https://portfoliochatbot-sepia.vercel.app)**

---

## How it works

Instead of fine-tuning a model, this chatbot uses RAG — a technique that retrieves relevant context from a knowledge base before generating an answer. The knowledge base is my CV.

```
User question
      │
      ▼
Convert to embeddings (Google AI)
      │
      ▼
Search similar chunks in ChromaDB
      │
      ▼
Send context + question to Gemini
      │
      ▼
Answer grounded in my actual experience
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| LLM | Google Gemini `gemini-2.0-flash` |
| Fallback LLM | Groq `llama-3.3-70b` |
| Embeddings | Google `models/embedding-004` |
| Vector Store | ChromaDB |
| Backend | FastAPI + Uvicorn |
| Frontend | React 18 + Vite + Tailwind CSS 4 |
| Backend Deploy | Hugging Face Spaces (Docker) |
| Frontend Deploy | Vercel |

---

## Project Structure

```
chatbot/
├── backend/
│   ├── data/               # CV content as .md files (knowledge base)
│   │   ├── bio.md
│   │   ├── cv.md
│   │   ├── projects.md
│   │   └── skills.md
│   ├── routers/            # API routes
│   ├── services/           # RAG pipeline logic
│   ├── scripts/
│   │   └── ingest.py       # Chunks .md files → generates embeddings → stores in ChromaDB
│   ├── Dockerfile          # HF Spaces Docker config
│   ├── start.sh            # Runs ingest.py then starts uvicorn
│   └── main.py             # FastAPI app
└── frontend/
    ├── src/
    │   ├── components/     # Chat UI components
    │   ├── hooks/          # useChat hook
    │   └── context/        # Language context
    └── vercel.json         # SPA routing rewrites
```

---

## RAG Pipeline

**Ingest** (runs on every deploy):
1. Read `.md` files from `backend/data/`
2. Split into chunks
3. Generate embeddings via Google AI API
4. Store vectors in ChromaDB

**Query** (runs on every user message):
1. Convert question to embedding
2. Find top-k similar chunks in ChromaDB
3. Build prompt with retrieved context
4. Call Gemini API → stream answer back

---

## Local Development

```bash
# Clone
git clone https://github.com/leanNunez/portfolio-chatbot
cd portfolio-chatbot

# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Set env vars
cp .env.example .env  # add your API keys

# Ingest CV content
python scripts/ingest.py

# Start API
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Required env vars:**
```
GOOGLE_API_KEY=...
GROQ_API_KEY=...
HEALTH_TOKEN=...
ALLOWED_ORIGINS=http://localhost:5173
```

---

## Updating the CV

Just edit the `.md` files in `backend/data/` and push. Hugging Face will rebuild the container and `ingest.py` will regenerate ChromaDB automatically.

```
edit .md → git push → HF rebuilds → ingest.py runs → done
```

---

## Architecture decisions

- **No LangChain** — dropped due to unresolvable circular dependency conflicts with `langchain-google-genai`. Using `google-generativeai` + `chromadb` directly.
- **Ephemeral ChromaDB** — no persistent storage needed. The knowledge base is static (CV content), so regenerating on every deploy from source `.md` files is reliable and simple.
- **Gemini + Groq fallback** — if Gemini fails, the pipeline retries with Groq's `llama-3.3-70b` automatically.

---

## Author

**Leandro Pablo Nuñez** — Full Stack Developer (Jr.)
UTN FRT Tucumán · Graduating 2026

[GitHub](https://github.com/leanNunez) · [Live Demo](https://portfoliochatbot-sepia.vercel.app)
