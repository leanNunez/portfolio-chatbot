# Portfolio Chatbot — Frontend

React chat UI for the [Portfolio RAG Chatbot](../README.md). Streams answers from the FastAPI backend via SSE.

**Live → [portfoliochatbot-sepia.vercel.app](https://portfoliochatbot-sepia.vercel.app)**

## Tech Stack

| | |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Streaming | `EventSource` (SSE) |
| Deploy | Vercel |

## Local Dev

```bash
npm install
npm run dev
```

Expects the backend at `http://localhost:8000`. To change it, set `VITE_API_URL` in `.env.local`.

## Structure

```
src/
├── components/   # Chat bubble, input, typing indicator
├── hooks/        # useChat — SSE stream handling, history state
└── context/      # Language context (EN/ES)
```
