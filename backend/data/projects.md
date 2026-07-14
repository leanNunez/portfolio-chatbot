# Proyectos — Leandro Pablo Nuñez

## PremiumTech — E-commerce Full Stack con IA
**Estado**: Live (en producción)
**Stack**: React 19, TypeScript, TanStack Router, Zustand, Node.js, Express, PostgreSQL, Prisma, pgvector, Vitest
**Demo**: ecommerce-tech-nu.vercel.app
**Deploy**: Vercel (frontend) + Render (backend) + Neon (PostgreSQL)

### Descripción
Es el proyecto más completo de Leandro y del que más orgulloso está. Plataforma de e-commerce
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
