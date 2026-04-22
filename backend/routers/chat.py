import logging
import time
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from models.schemas import ChatRequest, ChatResponse
from services.rag_service import get_answer

logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

# IPs baneadas temporalmente por intentos de injection: {ip: banned_until}
_banned: dict[str, float] = {}
# Contador de intentos de injection por IP: {ip: count}
_injection_strikes: dict[str, int] = defaultdict(int)

BAN_DURATION_SECONDS = 600  # 10 minutos
MAX_STRIKES = 3


TRUSTED_PROXIES = {"127.0.0.1", "::1"}

def _get_ip(request: Request) -> str:
    # Solo confiamos en X-Forwarded-For si el request viene de un proxy conocido (Render)
    client_ip = request.client.host if request.client else "unknown"
    if client_ip in TRUSTED_PROXIES:
        forwarded = request.headers.get("X-Forwarded-For", "")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return client_ip


@router.post("/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, body: ChatRequest):
    ip = _get_ip(request)

    # Chequear si la IP está baneada
    if ip in _banned:
        if time.time() < _banned[ip]:
            raise HTTPException(status_code=429, detail="Demasiados intentos. Intentá de nuevo más tarde.")
        else:
            del _banned[ip]
            _injection_strikes[ip] = 0

    try:
        result = await get_answer(body.message)

        # Si el filtro de injection lo bloqueó, sumar strike a la IP
        if result.get("blocked"):
            _injection_strikes[ip] += 1
            logger.warning("Injection attempt from %s (strike %d)", ip, _injection_strikes[ip])
            if _injection_strikes[ip] >= MAX_STRIKES:
                _banned[ip] = time.time() + BAN_DURATION_SECONDS
                logger.warning("IP %s banned for %ds", ip, BAN_DURATION_SECONDS)

        return ChatResponse(answer=result["answer"], sources=result["sources"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error en /api/chat: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Error interno del servidor.")
