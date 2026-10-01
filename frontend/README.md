# Portfolio Chatbot — Frontend

React chat UI for the [Portfolio RAG Chatbot](../README.md). Sends each question as a JSON `POST /api/chat` to the FastAPI backend and renders the answer.

**Live → [portfoliochatbot-sepia.vercel.app](https://portfoliochatbot-sepia.vercel.app)**

## Quick path (local)

```bash
# Backend first, in another terminal: uvicorn main:app --reload --port 7860
npm install
npm run dev        # http://localhost:5173
```

In dev, requests go to `/api` and the Vite proxy forwards them to `http://localhost:7860`. `VITE_API_URL` is ignored in dev.

## Configuration

| Variable | Where | Purpose |
|----------|-------|---------|
| `VITE_API_URL` | Vercel (production builds only) | Backend base URL, e.g. `https://lean-dev-portfolio-chatbot.hf.space` |

Requests time out after 30 s.

## Deploy (Vercel)

- **Root Directory must be `frontend`.**
- Build: `npm run build` (Vite, output `dist/`).
- `vercel.json` rewrites all routes to `index.html`.

## Tech stack

| | |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Markdown | `react-markdown` |
| Fonts | JetBrains Mono (display, labels, logs) + IBM Plex Sans (body) |
| Deploy | Vercel |

## Features

| Feature | Behavior |
|---------|----------|
| Markdown answers | Bot replies render as Markdown. |
| Query log | Each answer ends with `↳ sources · latency` (e.g. `↳ cv · projects · 1.2s`). |
| Status badge | Truthful: checks `GET /api/status` on load, then updates from real chat results. |
| Retry | Error messages (timeout, rate limit, server) offer a retry of the last question. |
| ES/EN toggle | Switches the UI language without resetting the conversation. |
| Robot mascot | State-driven moods: idle, thinking, dancing, sleeping (backend offline), worried (error). After the first question it runs to the chat gutter on wide screens; otherwise it sits in the header. |
| Profile | Side panel on desktop, compact banner on tablets; on phones only, a drawer behind the `LN` button. |
| Accessibility | `:focus-visible` rings, WCAG AA contrast, `prefers-reduced-motion` disables animation (the robot holds a static pose). |

Design source of truth: [docs/art-direction.md](../docs/art-direction.md).

## Structure

```
src/
├── components/   # ChatWindow, bubbles, input, QueryLog, StatusBadge,
│                 # RobotMascot, ProfilePanel/Banner/Drawer, LanguageToggle
├── context/      # Chat and language (ES/EN) contexts
├── hooks/        # useChat (requests, status, retry), useMediaQuery
└── lib/          # api.js (API URL, timeout), robotMood, profile data, cn()
```
