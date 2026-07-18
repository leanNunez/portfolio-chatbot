# Proyectos — Leandro Pablo Nuñez

## Repuestero — ERP Multi-Tenant AI-Native
**Estado**: Live (en producción)
**Stack**: Python, FastAPI, SQLAlchemy 2.0, PostgreSQL 16, pgvector, Alembic, LangGraph, Groq, OpenAI, sqlglot, React 19, Supabase
**Demo**: repuestero.vercel.app
**Repo**: github.com/leanNunez/repuestero
**Deploy**: Vercel (frontend) + Render (backend, Docker) + Supabase (Postgres + Auth)

### Descripción
Es el proyecto técnicamente más ambicioso de Leandro. Una reescritura de un ERP legacy real
(un sistema en Delphi/Paradox de una casa de repuestos) hacia una arquitectura multi-tenant
AI-native. El objetivo no es "otro ERP genérico": es capturar un dominio de negocio real y
corregir cada anti-patrón del sistema viejo con una decisión de diseño deliberada.

### Multi-tenancy por Row-Level Security
La pieza central. El aislamiento entre organizaciones NO depende de que la app se acuerde de
filtrar por org_id — depende de Row-Level Security de PostgreSQL. El org_id se resuelve leyendo
la base (no del JWT, así un token manipulado no puede pedir otra organización), y la app se
conecta con un rol NOSUPERUSER sin BYPASSRLS. Hay tres roles de Postgres separados a propósito:
app_user para el negocio, owner solo para migraciones Alembic, y app_readonly solo-SELECT para
el asistente. Un test dedicado prueba que una organización no puede ver los datos de otra.

### Asistente NL2SQL con defensa en profundidad
Traduce preguntas en español a SQL de solo lectura, orquestado con LangGraph como máquina de
estados: si el SQL falla, reintenta pasándole el error al LLM; si Groq se agota, cambia a OpenAI
solo. Sobre eso, 5 capas de defensa: filtro anti prompt-injection (keyword + semántico), system
prompt endurecido, guard de SQL con sqlglot (solo permite un SELECT), rol de base solo-SELECT, y
techo de filas + statement timeout. Respuesta por streaming SSE.

### Ingesta de remitos por foto (Human-in-the-Loop)
Cargar un remito de proveedor sacándole una foto: un modelo multimodal extrae los renglones y
el LLM PROPONE, pero el humano DISPONE. No se escribe una sola fila hasta que una persona
aprueba. Un remito = una transacción atómica, con un unique index sobre el hash de la imagen como
candado de concurrencia. El principio que gobierna todo el proyecto: el LLM propone, nunca dispone.

### Calidad
CI en GitHub Actions con 9 suites de pytest (incluida la de aislamiento RLS entre tenants) más
los tests de front con vitest, corriendo contra un Postgres/pgvector real. La rama main está
protegida: exige PR con la CI en verde antes de mergear.

---

## PremiumTech — E-commerce Full Stack con IA
**Estado**: Live (en producción)
**Stack**: React 19, TypeScript, TanStack Router, Zustand, Node.js, Express, PostgreSQL, Prisma, pgvector, Vitest
**Demo**: ecommerce-tech-nu.vercel.app
**Deploy**: Vercel (frontend) + Render (backend) + Neon (PostgreSQL)

### Descripción
Es el proyecto favorito de Leandro y del que más orgulloso está — no por ser el más complejo
técnicamente (ese lugar lo ocupa Repuestero), sino por la historia que tiene detrás. Plataforma de e-commerce
full stack con catálogo, carrito, autenticación, panel de administración, búsqueda semántica
y un asistente de compras con IA que puede ejecutar acciones reales sobre la tienda.

### Arquitectura y decisiones técnicas
- **Feature-Sliced Design** en el frontend: la estructura del código refleja el dominio del
  negocio, no el framework. TanStack Router para routing type-safe y Zustand para estado global.
- **REST API en Express** sobre PostgreSQL con Prisma como ORM type-safe.
- **Autenticación JWT** con access token + refresh token en cookie HttpOnly, más RBAC con
  roles customer/admin. Fue la parte que más le costó y más le enseñó.

### Búsqueda semántica híbrida
Combina full-text search de PostgreSQL con similitud coseno sobre embeddings de Cohere
(1024 dimensiones) almacenados con pgvector. El score final pondera 0.4 keyword + 0.6 semántico,
de modo que la búsqueda entiende la intención y no solo la coincidencia literal de palabras.

### AI Shopping Assistant
Asistente con **function calling** sobre Groq (llama-3.3-70b): tiene 5 herramientas propias
para consultar el catálogo y operar sobre la tienda, responde con streaming SSE y puede
encadenar hasta 8 rondas de razonamiento por consulta antes de dar la respuesta final.

### Seguridad y calidad
- **Prompt injection guard** con sistema de strike/ban y rate limiting (20 req/min) en los
  endpoints de IA.
- **Test suite** con Vitest, React Testing Library y Supertest: unit, component e integration,
  estos últimos corriendo contra una base PostgreSQL real, no mocks.
- **CI/CD** con GitHub Actions y deploy continuo.

---

## Portfolio Chatbot — RAG sobre el CV
**Estado**: Live (es este mismo chatbot)
**Stack**: Python, FastAPI, ChromaDB, Google Gemini, Groq, Docker, React, Vite, Tailwind CSS
**Demo**: portfoliochatbot-sepia.vercel.app
**Repo**: github.com/leanNunez/portfolio-chatbot
**Deploy**: Hugging Face Spaces (backend con Docker) + Vercel (frontend)

### Descripción
Este chatbot. Responde preguntas sobre la experiencia, proyectos y perfil de Leandro usando
Retrieval-Augmented Generation, para que un reclutador pueda preguntar en lenguaje natural
en vez de leer el CV entero.

### Decisiones técnicas
- **Pipeline RAG propio en FastAPI**, sin framework de orquestación: ingest de markdown →
  chunking por párrafos → embeddings con Gemini → retrieval top-k en ChromaDB → generación
  con Gemini sobre el contexto recuperado. Construirlo a mano fue deliberado: entender el
  RAG por dentro antes de delegarlo a una librería.
- **Fallback automático Gemini → Groq** ante errores 429 o de quota, para que el bot siga
  disponible bajo los límites del free tier.
- **Prompt injection guard** por similitud de embeddings contra patrones de ataque conocidos,
  más rate limiting con slowapi.
- **Docker** en Hugging Face Spaces; el pipeline de ingest se regenera en cada build, así el
  índice vectorial nunca queda desactualizado respecto al CV.

---

## Portfolio Personal
**Estado**: Live
**Stack**: HTML5, CSS3, JavaScript vanilla, UX/UI
**Demo**: leannunez.github.io/myportfolio
**Repo**: github.com/leanNunez/myportfolio

### Descripción
Portfolio personal en tecnologías web vanilla, sin frameworks. Diseño responsive con foco en
UX/UI y rendimiento. Muestra proyectos, skills, certificaciones y datos de contacto.
Hecho a propósito sin React: para un sitio estático, el framework sería peso muerto.
