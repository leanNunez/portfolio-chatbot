# Skills Plan — Portfolio Chatbot (específicas)

> Este plan asume que ya tienes instaladas las skills genéricas (react, tailwind, frontend-design, a11y, testing, performance).
>
> Objetivo: definir **skills específicas de chatbot** para resolver problemas UX/UI recurrentes sin duplicar la capa general.

---

## 1) Contexto detectado en este repo

Stack y estructura observada:
- `frontend/` en React + Tailwind
- `backend/` en FastAPI con endpoint `/api/chat`
- Flujo de chat con `useChat`, `ChatWindow`, `MessageBubble`

Dolores UX/UI detectados:
- Riesgo de inestabilidad visual por `key={index}` en mensajes.
- Historial se reinicia al cambiar idioma (fricción alta).
- Errores (429/500/timeout) se muestran como texto de bot sin patrón UX consistente.
- Falta de patrón robusto para estados por mensaje (`sending`, `sent`, `error`, `retrying`).
- Oportunidad de mejorar accesibilidad de chat en tiempo real (`aria-live`, foco, teclado).

---

## 2) Skills específicas recomendadas (solo chatbot)

### A. `chatbot-conversation-ux`

**Propósito**
- Definir la experiencia conversacional end-to-end: envío, espera, respuesta, error, retry.

**Cuándo usar**
- Cambios en flujo de mensajes, sugerencias, empty state, typing indicator, feedback de estado.

**Debe cubrir**
- Estados de conversación: `idle`, `sending`, `streaming|typing`, `error`, `rate_limited`.
- Patrón de errores accionables (botón “Reintentar”, copy claro, no ambiguo).
- Comportamiento de sugerencias iniciales y first-message UX.
- Regla de scroll inteligente (autoscroll solo cuando corresponde).

**No solapa con genéricas**
- No reemplaza `frontend-design`; lo aterriza al dominio “chat”.

---

### B. `chatbot-message-architecture`

**Propósito**
- Estandarizar el modelo de mensaje para evitar glitches UI y facilitar mantenimiento.

**Cuándo usar**
- Refactor de componentes de mensaje, hook `useChat`, rendering de burbujas.

**Debe cubrir**
- IDs estables por mensaje (evitar `key={index}`).
- Esquema de mensaje:
  - `id`, `role`, `content`, `createdAt`, `status`, `sources`, `errorType`.
- Reglas de deduplicación y orden temporal.
- Separación entre mensaje de sistema vs mensaje de asistente.

**No solapa con genéricas**
- Complementa `react` con reglas de dominio para chat.

---

### C. `chatbot-i18n-ux`

**Propósito**
- Manejar idioma sin romper el hilo conversacional.

**Cuándo usar**
- Cambios en toggle ES/EN, textos de sistema, prompts sugeridos y bienvenida.

**Debe cubrir**
- Regla: cambiar idioma **no** resetea historial por defecto.
- Traducción de UI (labels/botones/estados) separada de mensajes históricos.
- Estrategia para mensaje de bienvenida multilenguaje sin sobrescribir conversación.
- Fallback de i18n para errores y estados críticos.

**No solapa con genéricas**
- Es específica al comportamiento conversacional bilingüe.

---

### D. `chatbot-a11y-live-regions`

**Propósito**
- Accesibilidad específica de interfaces de chat en tiempo real.

**Cuándo usar**
- Cambios en input, lista de mensajes, typing indicator, botones de sugerencias.

**Debe cubrir**
- `aria-live` para anunciar respuestas nuevas.
- Gestión de foco tras enviar mensaje y al recibir error.
- Navegación por teclado en sugerencias y controles de idioma.
- Contraste y legibilidad de burbujas/sources.

**No solapa con genéricas**
- Extiende `a11y` al patrón particular de chat dinámico.

---

### E. `chatbot-resilience`

**Propósito**
- Robustecer UX ante latencia, timeout, 429 y fallos de red/API.

**Cuándo usar**
- Cambios en manejo de fetch, timeout, cancelación, estados de conexión.

**Debe cubrir**
- Timeout visible con acción de reintento.
- Botón “Cancelar envío” cuando request está en curso.
- Mensajes de error diferenciados por causa (`timeout`, `rate_limit`, `server`, `network`).
- Política de backoff/retry en cliente (controlada, no agresiva).

**No solapa con genéricas**
- Baja reglas de `performance/testing` al caso de chatbot interactivo.

---

## 3) Priorización sugerida (orden de implementación)

1. `chatbot-message-architecture`
2. `chatbot-conversation-ux`
3. `chatbot-i18n-ux`
4. `chatbot-resilience`
5. `chatbot-a11y-live-regions`

---

## 4) Matriz de auto-load recomendada

- **Cambios en `useChat` / modelo de mensajes** → `chatbot-message-architecture`, `chatbot-conversation-ux`
- **Cambios en toggle ES/EN o textos** → `chatbot-i18n-ux`
- **Errores 429/500/timeout/red** → `chatbot-resilience`, `chatbot-conversation-ux`
- **Input, sugerencias, foco, lectura de respuestas** → `chatbot-a11y-live-regions`
- **Refactor visual de burbujas/chat window** → `chatbot-conversation-ux` (+ genéricas ya instaladas)

---

## 5) Definition of Done (DoD) por feature de chat

Una mejora de chat se considera terminada cuando:
- No usa `key={index}` para mensajes dinámicos.
- Mantiene historial al cambiar idioma (salvo decisión explícita de producto).
- Tiene estado claro para `sending/loading/error/retry`.
- Es usable por teclado y comunica eventos con `aria-live`.
- Incluye al menos pruebas de flujo crítico (enviar mensaje, timeout, 429).

---

## 6) Conclusión

Para este repo, la mayor ganancia está en skills de **dominio conversacional**, no en repetir skills generales.
Este plan crea una capa especializada en UX/UI de chatbot y evita solapamientos con la base genérica ya instalada.
