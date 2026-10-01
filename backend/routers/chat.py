import logging
import time
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter

from models.schemas import ChatRequest, ChatResponse
from services.rag_service import get_answer
from services.client_ip import get_client_ip

logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_client_ip)
router = APIRouter()

# IPs baneadas temporalmente por intentos de injection: {ip: banned_until}
_banned: dict[str, float] = {}
# Contador de intentos de injection por IP: {ip: count}
_injection_strikes: dict[str, int] = defaultdict(int)

BAN_DURATION_SECONDS = 600  # 10 minutos
MAX_STRIKES = 3


@router.post("/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, body: ChatRequest):
    ip = get_client_ip(request)

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
