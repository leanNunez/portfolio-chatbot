# Mobile Responsive — Tasks

> Estado del frontend al momento de crear este documento: `App.jsx` con layout `flex` horizontal puro, `ProfilePanel` oculto en mobile (`hidden lg:flex`), área de mensajes con `p-8`, input con `max-w-3xl`, burbujas con `max-w-[70%]`.

---

## Bloque 1 — Layout y estructura base

- [x] **Layout principal mobile** (`App.jsx` línea 8): agregado `flex-col lg:flex-row`. `ChatWindow` cambiado de `h-full` a `min-h-0` para que el scroll interno funcione en flex column.
- [x] **Evitar overflow horizontal global**: `overflow-hidden` en body (CSS) y en el div raíz es correcto — ningún hijo tiene ancho mayor al viewport. Confirmado.
- [x] **`ProfilePanel` en mobile**: `hidden lg:flex` — no genera espacio en ningún breakpoint intermedio. No hay clases `sm:` o `md:` que rompan esto. Confirmado sin cambios.

---

## Bloque 2 — Header del chat

- [x] **Reducir padding del header** (`ChatWindow.jsx`): `px-3 sm:px-6`, `pb-3 sm:pb-4`, gaps responsivos `gap-2 sm:gap-3`.
- [x] **Altura del header**: `min-h-[56px]` agregado.
- [x] **`aria-label` en el botón de idioma**: `aria-label="Cambiar idioma"` + `touch-manipulation`.
- [x] **Indicador "online" oculto en < 375px**: `hidden xs:flex` — libera espacio en el header en pantallas muy chicas.

---

## Bloque 3 — Área de mensajes

- [x] **Padding del área de mensajes** (`ChatWindow.jsx`): `p-8` → `p-3 sm:p-6 lg:p-8`.
- [x] **`max-w-3xl` del contenedor interior** (`ChatWindow.jsx`): cambiado a `w-full max-w-3xl mx-auto`.
- [x] **`max-w-[70%]` en burbujas** (`MessageBubble.jsx`): `max-w-[85%] sm:max-w-[70%]` + `break-words` + `text-sm sm:text-base`.
- [x] **`key={i}` en messages.map** (`ChatWindow.jsx` + `useChat.js`): todos los mensajes tienen `id: crypto.randomUUID()`. `key={msg.id}` en el map.
- [x] **`overscroll-contain`**: `overscroll-y-contain` agregado al div scrolleable.
- [ ] **Validar scroll**: confirmar en dispositivo real que el input no tapa el área de mensajes.

---

## Bloque 4 — Input

- [x] **Padding del input en mobile** (`ChatInput.jsx`): `px-3 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base`.
- [x] **Botón de enviar en pantallas < 375px** (`ChatInput.jsx`): texto con `hidden xs:inline` — debajo de 375px solo muestra el ícono. Breakpoint `xs: 23.4375rem` agregado al `@theme` de `index.css`.
- [x] **`touch-action: manipulation`** en el botón: `touch-manipulation` de Tailwind. Elimina el delay de 300ms en iOS.
- [x] **`aria-label={t.send}`** en el botón: accesible incluso cuando el texto está oculto en mobile.

---

## Bloque 5 — Botones de sugerencias

- [x] **Sugerencias en columna en mobile** (`ChatWindow.jsx`): `flex-col xs:flex-row xs:flex-wrap` — columna en < 375px, wrap horizontal arriba.
- [x] **Tamaño de toque mínimo**: `min-h-[44px]` + `touch-manipulation` + `text-left` en cada botón de sugerencia.

---

## Bloque 6 — Safe Area y dispositivos iOS

- [x] **Validar safe-area top**: `max(0.75rem, env(safe-area-inset-top))` en el header — correcto.
- [x] **Validar safe-area bottom**: `max(0.75rem, env(safe-area-inset-bottom))` en el input wrapper — ajustado a responsive `pt-3 sm:pt-4 px-3 sm:px-4`. `mt-auto` redundante eliminado.
- [x] **`viewport-fit=cover`**: confirmado en `index.html` línea 6. Los `env()` funcionan.

---

## Bloque 7 — Tipografía y espacios responsivos

- [ ] **Breakpoints en tamaños de fuente**: revisar `text-base` en input y burbujas — en mobile `text-sm` es más apropiado. Usar `text-sm sm:text-base`.
- [ ] **`clamp()` en títulos**: el nombre y rol en `ProfilePanel` (`text-lg`, `text-sm`) pueden usar `clamp()` para fluir sin depender de breakpoints fijos. Ver sección Sugerencias.

---

## Bloque 8 — Performance mobile

- [x] **`backdrop-blur-sm` eliminado en mobile** (`ChatWindow.jsx`): header e input usan `bg-zinc-900 sm:bg-zinc-900/80 sm:backdrop-blur-sm`. En mobile fondo sólido, en desktop efecto glass. Ahorra GPU en Android gama baja.
- [x] **`prefers-reduced-motion`** (`index.css`): `bot-float` animation desactivada si el usuario tiene reducción de movimiento habilitada.
- [x] **Sombras y `blur-3xl`** auditados: `blur-3xl` y `ProfileBotAvatar` están dentro de `hidden lg:flex` — no se renderizan en mobile. Sin impacto. `animate-bounce`/`animate-pulse` usan `transform`/`opacity` — compositor thread, sin repaints.
- [ ] **Lighthouse móvil**: correr en Chrome DevTools con throttling 4G antes del próximo deploy.

---

## Bloque 9 — Accesibilidad general

- [x] **`aria-hidden` en `SendIcon`** (`ChatInput.jsx`): el SVG es decorativo — el botón ya tiene `aria-label={t.send}`. `aria-hidden="true"` evita que el lector de pantalla duplique la información.
- [x] **`role="log"` + `aria-live="polite"`** (`ChatWindow.jsx`): el área de mensajes anuncia automáticamente mensajes nuevos a lectores de pantalla.
- [x] **Links de GitHub/LinkedIn** (`ProfilePanel.jsx`): `aria-label` con nombre completo + "(abre en nueva pestaña)" — estándar WCAG para `target="_blank"`.

---

## Bloque 10 — Testeo final

- [ ] Testear en 360px (Android gama baja) — foco en burbujas, input y header.
- [ ] Testear en 390px (iPhone 14) — foco en safe-area y botón de enviar.
- [ ] Testear en 768px (tablet) — confirmar que el layout transiciona bien antes de `lg`.
- [ ] Probar con teclado virtual abierto en iOS — el input no debe quedar tapado por el teclado.

---

## Bloque 11 — Sugerencias pro (encontradas en revisión de código)

- [x] **`ProfileBanner` compacto para mobile**: creado `ProfileBanner.jsx`. Avatar + nombre + role + badge de disponibilidad. Badge muestra solo el dot en < 375px, texto completo en ≥ 375px. `App.jsx` reestructurado con wrapper div para alojar banner + chat.
- [x] **`clamp()` en tipografía** (`index.css`): `@utility text-fluid-sm` y `@utility text-fluid-base` definidos. `text-fluid-sm` usado en el nombre del banner.
- [x] **Botón Enviar modo icono** — completado en Bloque 4.
- [x] **`role="log"` + `aria-live`** — completado en Bloque 9.
- [x] **IDs estables en mensajes** — completado en Bloque 3.
- [x] **`overscroll-contain`** — completado en Bloque 3.
- [x] **`touch-action: manipulation`** — completado en Bloques 4 y 5.

---

> **Orden recomendado**: Bloque 1 → 3 → 4 → 2 → 5 → 6 → 8 → 9 → 11 → Bloque 10.
> Los bloques 1, 3 y 4 tienen el mayor impacto visual en mobile. Los bloques 9 y 11 son los que más diferencian en una revisión de código senior.
