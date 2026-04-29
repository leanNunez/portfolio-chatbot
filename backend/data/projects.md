# Proyectos — Leandro Pablo Nuñez

## Portfolio RAG Chatbot
**Estado**: En desarrollo
**Stack**: Python, FastAPI, LangChain, Google Gemini, ChromaDB, React, Vite, Tailwind CSS
**Deploy**: Render.com
**Repo**: github.com/leanNunez/portfolio-chatbot

### Descripción
Chatbot inteligente que responde preguntas sobre mi experiencia y proyectos usando
Retrieval-Augmented Generation (RAG). Los reclutadores pueden consultarle sobre mis
habilidades, proyectos y experiencia directamente en lenguaje natural, sin tener que
leer el CV completo.

### Decisiones técnicas
- RAG con LangChain para combinar búsqueda semántica con generación de lenguaje
- Embeddings de Google (models/embedding-004) con ChromaDB como vector store
- Gemini 2.0 Flash como LLM principal por su free tier generoso y alta calidad
- FastAPI como backend por su performance y documentación automática (Swagger)

---

## PremiumTech — E-commerce Full Stack
**Estado**: Live
**Stack**: React 19, TypeScript, Node.js, PostgreSQL, Prisma, Tailwind CSS, Zustand, JWT
**Repo**: github.com/leanNunez

### Descripción
Plataforma de e-commerce completa con autenticación JWT, carrito de compras,
gestión de productos y panel de administración. Arquitectura Full Stack con
separación clara entre frontend y backend.

### Decisiones técnicas
- React 19 con TypeScript para tipado estricto y mejor mantenibilidad
- Zustand para manejo de estado global del carrito (alternativa liviana a Redux)
- Prisma como ORM sobre PostgreSQL para queries type-safe
- JWT para autenticación stateless

---

## Portfolio Personal
**Estado**: Live
**Stack**: HTML5, CSS3, JavaScript, UX/UI
**Demo**: leannunez.github.io/myportfolio

### Descripción
Portfolio personal desarrollado con tecnologías web vanilla. Diseño responsive con
enfoque en UX/UI y rendimiento. Muestra proyectos, skills y datos de contacto.
