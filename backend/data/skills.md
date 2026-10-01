# Stack Técnico — Leandro Pablo Nuñez

## Perfil técnico
Leandro es desarrollador Full Stack con un perfil backend fuerte: su stack principal es
Python/FastAPI y React/TypeScript sobre PostgreSQL, usado en producción con clientes reales
(sistema de reparto freelance en LeanDev). Suma experiencia integrando IA generativa, RAG y
agentes, y está certificado por IBM en RAG and Agentic AI (2026).

## Lenguajes
- **Python** — Lenguaje principal de backend (FastAPI) y de IA
- **TypeScript** — Frontend (React) y backend (Node.js/Express)
- **JavaScript (ES6+)**
- **SQL** — PostgreSQL y MySQL
- **HTML5 / CSS3** — Avanzado
- **C#** — Básico

## Backend
- **Python / FastAPI** — Stack backend principal de Leandro, en producción en el sistema de reparto de LeanDev y en Repuestero
- **Pydantic** — Validación y esquemas
- **SQLAlchemy 2.0 + Alembic** — ORM y migraciones de esquema versionadas (16 migraciones en producción en LeanDev)
- **Node.js / Express** — API REST de PremiumTech
- **REST APIs** — Diseño e implementación
- **JWT y bcrypt** — Access + refresh token, cookies HttpOnly, control de acceso por roles, límite de intentos de login
- **Rate limiting** — En endpoints de login e IA
- **SSE streaming** — Respuestas en streaming

## Arquitectura de software
- **Arquitectura hexagonal** — Dominio, aplicación e infraestructura desacoplados (backend FastAPI del sistema de reparto de LeanDev)
- **Monolito modular** package-by-feature, con capa service separada del router (Repuestero)
- **Modelado append-only / event sourcing** — Saldos y stock derivados de movimientos inmutables
- **Idempotencia y sincronización offline** — Cola de operaciones con identificador único por operación y sincronización incremental
- **Multi-tenancy** — Aislamiento por Row-Level Security de PostgreSQL

## Bases de Datos
- **PostgreSQL** — Base principal de Leandro: triggers, Row-Level Security, pgvector, full-text search, control de concurrencia (índices únicos, secuencias), numeric para montos
- **Row-Level Security (RLS)** — Aislamiento multi-tenant a nivel de base, con roles separados sin BYPASSRLS
- **Triggers de PostgreSQL** — Reglas críticas de negocio que se cumplen aunque se acceda por fuera de la app
- **Neon** (PostgreSQL 17) y **Supabase** — Postgres gestionado
- **MySQL** — Intermedio
- **Prisma** — ORM type-safe
- Modelado relacional

## Frontend
- **React 19** y **TypeScript**
- **Vite**
- **TanStack Query / TanStack Router** — Data fetching y routing type-safe
- **Zustand** — Estado global
- **PWA offline-first** — Service Workers, IndexedDB/Dexie, actualizaciones por versionado
- **Tailwind CSS** y **Shadcn UI** — Nivel funcional
- **React Hook Form + Zod** — Formularios y validación

## IA Generativa y RAG
- **RAG (Retrieval-Augmented Generation)** — Implementación end-to-end, pipeline propio sin framework
- **Embeddings vectoriales y búsqueda semántica** — Cohere (1024 dim), Gemini embeddings
- **Function calling** — Herramientas propias con hasta 8 rondas de razonamiento
- **NL2SQL** — Traducción de lenguaje natural a SQL de solo lectura, con validación de AST por sqlglot y defensa en profundidad
- **Orquestación con LangGraph** — Máquinas de estado con reintentos y fallback entre proveedores (Groq → OpenAI)
- **Human-in-the-loop** — El LLM propone, el humano confirma (ingesta multimodal de remitos)
- **Prompt engineering** y defensa contra prompt injection (keyword + semántico)
- **IA multimodal** — Ingesta de documentos por foto en Repuestero

## Agentes de IA
- **LangChain** — Orquestación de cadenas de razonamiento
- **LangGraph** — Grafos de estado para agentes con memoria y feedback
- **CrewAI** — Arquitecturas multi-agente colaborativas
- **AutoGen** y **BeeAI** — Frameworks de agentes
- **Model Context Protocol (MCP)** — Construcción de agentes sobre MCP
- Diseño de arquitecturas multi-agente con decisión distribuida

## Modelos y Vector DBs
- **OpenAI** — LLM (fallback en Repuestero)
- **Google Gemini** — LLM y embeddings
- **Groq (llama-3.3-70b)** — Inferencia rápida y function calling
- **Cohere** — Embeddings para búsqueda semántica
- **ChromaDB** — Vector store
- **pgvector** — Vectores dentro de PostgreSQL

## Testing
- **Pytest** — Tests de backend contra PostgreSQL real (520+ en el sistema de reparto de LeanDev)
- **Vitest** — Unit y component testing
- **React Testing Library** — Testing de componentes por comportamiento
- **MSW** — Mock de red en tests de frontend
- **Supertest** — Integration testing de APIs contra PostgreSQL real
- **TDD** y corpus de casos compartido en JSON verificado por pytest y Vitest
- Leandro sostiene más de 1.100 tests automatizados en el sistema de reparto de LeanDev, corriendo en CI

## DevOps / Herramientas
- **Docker** — Containerización y deploy (sistema de reparto de LeanDev, Repuestero, chatbot RAG)
- **GitHub Actions** — CI/CD: tests, typecheck y build de imagen Docker en cada pull request
- **Git / GitHub** — Ramas, PRs, conventional commits, branch protection
- **Render**, **Neon**, **Supabase**, **Vercel**, **Hugging Face Spaces**, **Cloudinary**
- **Cloudflare R2** — Backups diarios automatizados con verificación de dump y restauración probada
- **Linux** — Intermedio
- **Bash scripting** — Básico-Intermedio
- **Neovim** — Editor principal
- **Claude Code** — Desarrollo asistido por IA

## Idiomas
- **Español** — Nativo
- **Inglés** — Lectura técnica fluida, conversación en desarrollo
