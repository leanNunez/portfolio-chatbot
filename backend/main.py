import os
import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from routers import chat

def _setup_logging():
    log_level = logging.DEBUG if os.getenv("ENVIRONMENT") != "production" else logging.INFO
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        fmt="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    ))
    root = logging.getLogger()
    root.setLevel(log_level)
    root.handlers.clear()
    root.addHandler(handler)

_setup_logging()

limiter = Limiter(key_func=get_remote_address)

IS_PROD = os.getenv("ENVIRONMENT") == "production"

app = FastAPI(
    title="Portfolio Chatbot API",
    description="RAG-powered chatbot sobre el portfolio de Leandro Nuñez",
    version="1.0.0",
    docs_url=None if IS_PROD else "/docs",
    redoc_url=None if IS_PROD else "/redoc",
    openapi_url=None if IS_PROD else "/openapi.json",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

_raw_origins = os.getenv("ALLOWED_ORIGINS", "")
if not _raw_origins:
    if IS_PROD:
        logging.getLogger(__name__).warning(
            "ALLOWED_ORIGINS no configurado en producción — CORS abierto a *. "
            "Seteá ALLOWED_ORIGINS en las variables de entorno de Render."
        )
    ALLOWED_ORIGINS = ["*"]
else:
    ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")

@app.on_event("startup")
async def startup():
    from services.rag_service import init_injection_embeddings
    init_injection_embeddings()


HEALTH_TOKEN = os.getenv("HEALTH_TOKEN", "")

@app.get("/health")
def health(request: Request):
    if IS_PROD and HEALTH_TOKEN:
        token = request.headers.get("X-Health-Token", "")
        if token != HEALTH_TOKEN:
            raise HTTPException(status_code=404)
    return {"status": "ok"}
