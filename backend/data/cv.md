# CV — Leandro Pablo Nuñez

## Información Personal
- **Nombre**: Leandro Pablo Nuñez
- **Edad**: 30 años (13 de mayo de 1996)
- **Ubicación**: San Miguel de Tucumán, Argentina
- **Email**: lean.p.dev@gmail.com
- **LinkedIn**: linkedin.com/in/lean-nunez
- **GitHub**: github.com/leanNunez
- **Portfolio**: leannunez.github.io/myportfolio
- **Disponibilidad**: Inmediata

## Título / Headline
Desarrollador Full Stack con perfil backend fuerte | Python, FastAPI & PostgreSQL · React & TypeScript

## Perfil Profesional
Leandro Nuñez es desarrollador Full Stack con un perfil backend fuerte y sistemas en producción
usados por clientes reales. Trabaja el ciclo completo: relevamiento con el cliente, diseño de
arquitectura, desarrollo, deploy y soporte. Su stack principal es Python/FastAPI y React/TypeScript
sobre PostgreSQL.

En backend, Leandro se especializa en modelado de datos íntegro, arquitecturas mantenibles
(hexagonal, monolito modular) y testing automatizado contra base de datos real. Diseña sistemas
donde las reglas críticas de negocio se hacen cumplir en la base de datos, no solo en la aplicación.

Leandro también tiene experiencia integrando IA generativa (RAG, agentes, LLMs) en flujos
productivos con criterio de seguridad: validación de salidas del modelo, defensa en profundidad
y human-in-the-loop. Es estudiante de último año de la Tecnicatura Universitaria en Programación
en la UTN FRT.

## Experiencia Laboral

### LeanDev — Desarrollo de Software Freelance
Desarrollador Full Stack / Backend | Agosto 2026 a la actualidad | San Miguel de Tucumán, Argentina (Remoto)

- En LeanDev, Leandro desarrolló de punta a punta el sistema de gestión de reparto de una
  distribuidora de bebidas, hoy en producción con uso diario por repartidores y administración,
  reemplazando un software de escritorio legacy. Trabajó directo con el cliente desde el
  relevamiento hasta el diseño de arquitectura, desarrollo, deploy y soporte.
- Backend del sistema de reparto de LeanDev: FastAPI con arquitectura hexagonal (dominio,
  aplicación, infraestructura), desacoplando la lógica de negocio de los adaptadores de
  persistencia y HTTP.
- Modelo de datos del sistema de reparto de LeanDev: libros mayores append-only. Los saldos de
  cuenta corriente y el stock de envases se derivan de movimientos inmutables en lugar de
  columnas mutables, con trazabilidad completa de altas y bajas. Las reglas críticas están
  protegidas con triggers de PostgreSQL, que se cumplen aunque se acceda a la base por fuera
  de la aplicación.
- Frontend del sistema de reparto de LeanDev: una PWA offline-first (React 19, TypeScript,
  Service Worker, IndexedDB/Dexie) con cola de operaciones idempotente (identificador único por
  operación) y sincronización incremental, para que el repartidor venda y cobre sin conexión sin
  perder ni duplicar ventas o cobros al reconectar.
- Actualizaciones de la PWA en LeanDev: resolvió la entrega de actualizaciones a la PWA instalada
  mediante versionado y chequeo al volver al foco, garantizando que cada deploy llegue a los
  dispositivos sin borrar datos locales.
- Lógica compartida en LeanDev: unificó las reglas de negocio entre backend y cliente con un
  corpus de casos en JSON verificado simultáneamente por pytest y Vitest, evitando divergencias
  de cálculo entre capas.
- Calidad en LeanDev: más de 1.100 tests automatizados (520+ de backend con pytest contra
  PostgreSQL real; frontend con Vitest, Testing Library y MSW) y CI en GitHub Actions que corre
  tests, typecheck y build de imagen Docker en cada pull request.
- Infraestructura de producción en LeanDev: deploy en Render (API en Docker + frontend estático)
  sobre Neon (PostgreSQL 17), 16 migraciones Alembic versionadas y backups diarios automatizados
  a Cloudflare R2 con verificación de dump y restauración probada.
- Seguridad en LeanDev: autenticación con JWT y bcrypt, control de acceso por roles y límite de
  intentos de login.

### La Paisanita Lomas — Cajero, Atención al Cliente y Coordinación de Delivery
2023 a 2026 | San Miguel de Tucumán, Argentina

- En La Paisanita Lomas, Leandro relevó y documentó los flujos operativos del negocio en cuatro
  canales de venta, identificó cuellos de botella en horario pico y prototipó una solución de
  automatización conversacional para la atención de pedidos.
- En La Paisanita Lomas coordinó la operación de delivery: procesó pedidos concurrentemente a
  través de múltiples canales (mostrador, teléfono, PedidosYa), manejando 80-90 pedidos diarios
  en horario pico.
- En La Paisanita Lomas lideró un equipo de 4 repartidores, asignando pedidos dinámicamente según
  ubicación, urgencia y disponibilidad para minimizar tiempos de entrega. También resolvió
  incidencias con clientes en tiempo real bajo alta presión operativa.

## Educación

### Universidad Tecnológica Nacional — Facultad Regional Tucumán
**Tecnicatura Universitaria en Programación** — 2023 a la actualidad. Leandro cursa el último
año en la UTN FRT, con egreso previsto para 2026/2027.
Materias relevantes: Programación I–IV, Bases de Datos I y II, Metodología de Sistemas I y II,
Arquitectura y Sistemas Operativos, Probabilidad y Estadística.
En la UTN FRT coordinó equipos en proyectos grupales y es responsable del Trabajo Final Integrador.

## Certificaciones

**IBM RAG and Agentic AI Professional Certificate** — IBM / Coursera, 2026. Completado.
Programa de 10 cursos con proyecto capstone. Cubre RAG, bases de datos vectoriales,
IA generativa multimodal, agentes de IA, LangChain, LangGraph, CrewAI, AutoGen, BeeAI
y Model Context Protocol (MCP).
Credencial verificable: coursera.org/verify/professional-cert/QWM3S2AR4S9Y

**Prompt Design in Vertex AI** — Google Cloud. Curso completado por Leandro.

**Develop GenAI Apps with Gemini** — Google Cloud. Curso completado por Leandro.

## Proyectos Personales

### Repuestero — ERP Multi-Tenant con IA
Proyecto personal de Leandro. Rol: Backend / Full Stack / AI Developer.
Stack: Python, FastAPI, SQLAlchemy 2.0, Alembic, PostgreSQL 16, pgvector, LangGraph, Groq, OpenAI, sqlglot, Docker, React 19, Supabase.

- Repuestero es la reescritura de un ERP legacy real (Delphi/Paradox) de una casa de repuestos
  hacia una arquitectura multi-tenant con IA; monolito modular package-by-feature con
  separación estricta router → service.
- Aislamiento multi-tenant en Repuestero con Row-Level Security de PostgreSQL: el identificador
  de organización se resuelve desde la base y no del token JWT, con tres roles de base separados
  (escritura sin BYPASSRLS, owner solo para migraciones y rol de solo lectura) y un test dedicado
  de aislamiento entre organizaciones.
- Modelo de datos de Repuestero: corrige anti-patrones del legacy con movimientos append-only y
  saldo como vista, numeración por secuencias en lugar de Max(id)+1, numeric en lugar de float
  para montos, y esquema versionado exclusivamente por migraciones Alembic.
- Asistente NL2SQL de Repuestero orquestado con LangGraph (máquina de estados con reintentos
  sobre el error y fallback Groq → OpenAI) y defensa en profundidad de 5 capas: filtro anti
  prompt-injection, validación de AST con sqlglot (solo SELECT), rol de base de solo lectura,
  techo de filas y statement_timeout; respuesta vía streaming SSE.
- Ingesta de documentos (remitos) por foto en Repuestero con modelo multimodal y
  Human-in-the-Loop: fase de propuesta sin escritura y confirmación transaccional, con índice
  único sobre el hash de la imagen como control de concurrencia.
- CI de Repuestero en GitHub Actions (9 suites pytest incl. aislamiento RLS + vitest) contra
  Postgres/pgvector real, con branch protection obligatoria. Deploy en vivo en Render + Vercel +
  Supabase.
- Demo: repuestero.vercel.app | Repo: github.com/leanNunez/repuestero

### PremiumTech — E-commerce Full Stack con IA
Proyecto personal de Leandro. Rol: Desarrollador Full Stack (con foco backend en la API).
Stack: React 19, TypeScript, Node.js, Express, PostgreSQL, Prisma, pgvector, Groq.

- PremiumTech tiene arquitectura full stack con Feature-Sliced Design en el frontend (TanStack
  Router + Zustand) y una API REST en Express sobre PostgreSQL/Neon, con autenticación JWT
  (access + refresh token en cookie HttpOnly) y control de acceso por roles customer/admin.
- Búsqueda semántica híbrida en PremiumTech con pgvector + Cohere embeddings (1024 dimensiones),
  combinando full-text search y similitud coseno con score ponderado 0.4 keyword + 0.6 semántico.
- Asistente de compras de PremiumTech: endpoint de agente con function calling (Groq
  llama-3.3-70b), 5 herramientas propias, streaming SSE y hasta 8 rondas de razonamiento por
  consulta, protegido con guard anti prompt-injection (sistema de strike/ban) y rate limiting
  (20 req/min).
- Testing de PremiumTech con Vitest, React Testing Library y Supertest (unit, component e
  integration contra PostgreSQL real), integrado a CI con GitHub Actions y deploy continuo en
  Vercel + Render.
- Demo: ecommerce-tech-nu.vercel.app | Repo: github.com/leanNunez/Ecommerce_Tech

### Portfolio Chatbot — RAG sobre el CV
Proyecto personal de Leandro. Rol: Desarrollador Full Stack.
Stack: Python, FastAPI, ChromaDB, Google Gemini, Groq, Docker, React, Tailwind.

- Portfolio Chatbot es un pipeline RAG completo en FastAPI: ingest de markdown → chunking →
  embeddings → retrieval top-k en ChromaDB → generación con Gemini sobre el contexto recuperado.
- Sistema de fallback automático Gemini → Groq ante errores 429/quota, garantizando
  disponibilidad continua bajo límites de free tier.
- Backend containerizado con Docker y desplegado en Hugging Face Spaces; el pipeline de
  ingest se regenera automáticamente en cada build. Frontend React + Vite en Vercel.
- Demo: portfoliochatbot-sepia.vercel.app

## Habilidades Técnicas

**Lenguajes**: Python, TypeScript, JavaScript (ES6+), SQL, HTML, CSS

**Backend**: FastAPI, SQLAlchemy 2.0, Alembic, Pydantic, Node.js, Express, REST APIs,
JWT (access + refresh), bcrypt, SSE streaming, rate limiting

**Arquitectura**: arquitectura hexagonal, monolito modular, modelado append-only / event sourcing,
idempotencia, sincronización offline, multi-tenancy

**Bases de datos**: PostgreSQL (Row-Level Security, triggers, pgvector, full-text search),
MySQL, migraciones Alembic, Prisma, Supabase, modelado relacional, control de concurrencia

**Frontend**: React 19, TypeScript, Vite, TanStack Query, TanStack Router, Zustand, Tailwind CSS,
PWA (Service Workers, IndexedDB/Dexie), offline-first, React Hook Form + Zod, Shadcn UI

**IA Generativa y RAG**: RAG, NL2SQL, function calling, embeddings vectoriales, búsqueda
semántica, IA multimodal, human-in-the-loop, prompt engineering, defensa contra prompt injection

**Agentes y LLMs**: LangGraph, LangChain, CrewAI, AutoGen, BeeAI, Model Context Protocol (MCP),
OpenAI, Groq, Gemini, Cohere embeddings, ChromaDB, pgvector

**Testing**: Pytest, Vitest, Supertest, MSW, React Testing Library, tests de integración contra
base real, TDD

**DevOps y Cloud**: Docker, GitHub Actions (CI/CD), Git, Linux, Render, Neon, Supabase, Vercel,
Cloudflare R2, backups automatizados, Hugging Face Spaces, Cloudinary

## Idiomas
- **Español**: Nativo
- **Inglés**: Lectura técnica fluida; conversación en desarrollo
