# CV — Leandro Pablo Nuñez

## Información Personal
- **Nombre**: Leandro Pablo Nuñez
- **Edad**: 29 años (13 de mayo de 1996)
- **Ubicación**: San Miguel de Tucumán, Argentina
- **Email**: lean.p.dev@gmail.com
- **LinkedIn**: linkedin.com/in/lean-nunez
- **GitHub**: github.com/leanNunez
- **Portfolio**: leannunez.github.io/myportfolio
- **Disponibilidad**: Inmediata

## Título / Headline
Junior Full Stack Developer | IA Generativa & Agentic AI

## Perfil Profesional
Desarrollador full stack autodidacta especializado en IA generativa, RAG y sistemas agénticos.
Dos años construyendo proyectos en producción con React 19, Node.js/Express y Python/FastAPI
sobre PostgreSQL con pgvector. Certificado por IBM en RAG and Agentic AI (LangChain, LangGraph,
CrewAI, MCP) y cursando el último año de la Tecnicatura Universitaria en Programación en UTN FRT,
con graduación en 2026. Busca su primera posición Junior para sumar al equipo desde el día uno.

## Educación

### Universidad Tecnológica Nacional — Facultad Regional Tucumán
**Tecnicatura Universitaria en Programación** — 2023 a la actualidad. Cursando el último año,
se gradúa en 2026.
Materias relevantes: Programación Web, Bases de Datos, Algoritmos y Estructuras de Datos,
Paradigmas de Programación.

## Certificaciones

**IBM RAG and Agentic AI Professional Certificate** — IBM / Coursera, 2026. Completado.
Programa de 10 cursos con proyecto capstone. Cubre RAG, bases de datos vectoriales,
IA generativa multimodal, agentes de IA, LangChain, LangGraph, CrewAI, AutoGen, BeeAI
y Model Context Protocol (MCP).
Credencial verificable: coursera.org/verify/professional-cert/QWM3S2AR4S9Y

**Prompt Design in Vertex AI** — Google Cloud. Curso completado.

**Develop GenAI Apps with Gemini** — Google Cloud. Curso completado.

## Experiencia en Proyectos

### PremiumTech — E-commerce Full Stack con IA
Proyecto personal. Rol: Desarrollador Full Stack.
Stack: React 19, TypeScript, Node.js, Express, PostgreSQL, Prisma, pgvector.

- Arquitectura full stack con Feature-Sliced Design en el frontend (TanStack Router + Zustand)
  y REST API en Express sobre PostgreSQL/Neon, con autenticación JWT (refresh token HttpOnly)
  y RBAC customer/admin.
- Búsqueda semántica híbrida con pgvector + Cohere embeddings (1024 dimensiones), combinando
  full-text search y similitud coseno con score 0.4 keyword + 0.6 semántico.
- AI Shopping Assistant con function calling (Groq llama-3.3-70b): 5 herramientas propias,
  streaming SSE y hasta 8 rondas de razonamiento por consulta.
- Prompt injection guard con sistema de strike/ban y rate limiting (20 req/min) sobre los
  endpoints de IA.
- Test suite con Vitest, React Testing Library y Supertest (unit, component e integration
  contra PostgreSQL real). CI/CD con GitHub Actions y deploy continuo en Vercel + Render.
- Demo: ecommerce-tech-nu.vercel.app

### Portfolio Chatbot — RAG sobre el CV
Proyecto personal. Rol: Desarrollador Full Stack.
Stack: Python, FastAPI, ChromaDB, Google Gemini, Groq, Docker, React, Tailwind.

- Pipeline RAG completo en FastAPI: ingest de markdown → chunking → embeddings →
  retrieval top-k en ChromaDB → generación con Gemini sobre el contexto recuperado.
- Sistema de fallback automático Gemini → Groq ante errores 429/quota, garantizando
  disponibilidad continua bajo límites de free tier.
- Backend containerizado con Docker y desplegado en Hugging Face Spaces; el pipeline de
  ingest se regenera automáticamente en cada build. Frontend React + Vite en Vercel.
- Demo: portfoliochatbot-sepia.vercel.app

## Habilidades Técnicas

**Lenguajes**: JavaScript (ES6+), TypeScript, Python, SQL, HTML, CSS

**IA Generativa y RAG**: RAG, embeddings vectoriales, búsqueda semántica, function calling,
prompt engineering, IA multimodal

**Agentes de IA**: LangChain, LangGraph, CrewAI, AutoGen, BeeAI, Model Context Protocol (MCP),
arquitecturas multi-agente

**Modelos y Vector DBs**: Gemini, Groq, Cohere embeddings, ChromaDB, pgvector

**Frontend**: React 19, TanStack Router, TanStack Query, Zustand, Tailwind CSS,
React Hook Form + Zod, Shadcn UI

**Backend**: Node.js, Express, FastAPI, REST APIs, JWT (access + refresh), SSE streaming

**Bases de datos**: PostgreSQL (Prisma, pgvector), MySQL, modelado relacional, full-text search

**Testing**: Vitest, React Testing Library, Supertest (unit, component, integration)

**DevOps y Cloud**: Git, GitHub, Docker, GitHub Actions (CI/CD), Vercel, Render,
Hugging Face Spaces, Cloudinary

## Experiencia Laboral

### La Paisanita Lomas — Cajero, Atención al Cliente y Coordinación de Delivery
2023 a la actualidad | San Miguel de Tucumán, Argentina

- Optimizó flujos de trabajo en la operación de delivery: procesó pedidos concurrentemente
  a través de múltiples canales (mostrador, teléfono, PedidosYa), manejando 80-90 pedidos
  diarios en hora pico.
- Lideró y asignó dinámicamente un equipo de 4 cadetes, priorizando pedidos según ubicación,
  urgencia y disponibilidad para minimizar tiempos de entrega.
- Resolvió incidencias con clientes en tiempo real bajo alta presión operativa, manteniendo
  consistencia en la calidad de servicio.

## Idiomas
- **Español**: Nativo
- **Inglés**: Lectura técnica fluida; conversación en aprendizaje
