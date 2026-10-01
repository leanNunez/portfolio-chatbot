# Art Direction — Portfolio Chatbot

Source of truth: no external reference. Archetype: **Dev tool / infra**, chosen because
the subject is a backend-leaning developer whose strongest work is traceable, auditable
systems (append-only ledgers, RLS, RAG). Deliberate deviation: the content is a
conversation, not a dashboard, so reading comfort wins over density in the message log.

```
Tone: precise, calm, traceable
Signature move: every bot answer ends with a monospaced "query log" line —
  `↳ cv · projects · 1.2s` — showing the RAG sources and response time, like a
  database log entry. It proves the bot is a real retrieval system and mirrors
  Leandro's work on traceability.
Type: JetBrains Mono (display, labels, chips, log lines) / IBM Plex Sans (body) /
  ratio 1.25 — body 16px, sizes 12.8 · 16 · 20 · 25 · 31 · 39 · 49px.
  Display (name) ≥ 3× body on desktop.
Color: dominant graphite (#14171b bg, #1b1f24 surface, #232830 raised) /
  accent PostgreSQL-teal #3fb8a6 (≤10% of surface: send button, focus ring,
  status, log arrow, links) / cool neutral ramp (#e8ebee text, #b4bcc6 secondary,
  #8b95a1 muted — all ≥4.5:1 on surfaces). Teal ties to the Postgres-centric stack;
  no second accent. Error state uses #e5735f paired with text + icon, never color alone.
Space: 4px base, comfortable density (8px rhythm in the chat, 4px inside chips).
Motion: 160ms cubic-bezier(0.2, 0, 0, 1), transitions on explicit properties only
  (color, background-color, border-color, opacity, transform). UI chrome stays still;
  all character animation lives in the robot mascot (see below), and every robot
  animation is driven by chat state, never a decorative loop. All motion disabled
  under prefers-reduced-motion (robot holds a static pose).
Mascot (user override, 2026-10-01): the assistant is a robot drawn in the same tokens
  (graphite body, teal eyes/antenna light). It reacts to the conversation: idle
  (breathes, blinks, eyes follow the cursor), thinking while a request is in flight,
  dances when an answer lands, waves on hover, dances on click, sleeps when the
  backend is offline, looks worried on error. Robot = the assistant; "LN" = Leandro.
Rejected:
  - system-ui as brand face → mono display + Plex Sans body.
  - blue→violet gradients and blur glows → flat graphite, single teal accent.
  - near-black + neon glow → mid graphite surfaces, accent without glow.
  - emoji as decoration/icons → inline SVG icons only.
  - generic robot avatar with float/gesture loops → replaced by a state-driven robot
    mascot (user asked for the robot back with more life; honored as an override,
    but its motion is tied to chat events instead of a timed loop). "LN" monogram
    stays as Leandro's mark.
```
