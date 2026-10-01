import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/cn"
import { useLang } from "../context/language"
import { useMediaQuery } from "../hooks/useMediaQuery"

// Drawing space. "compact" crops to head + torso for small sizes.
const VIEWBOX = {
  full: { x: 0, y: 0, w: 120, h: 152 },
  compact: { x: 6, y: 0, w: 108, h: 124 },
}

const EYES = [46, 74] // cx of each eye; both sit on y = EYE_Y
const EYE_Y = 50
const GAZE_MAX = 3 // pupil travel inside the socket, in SVG units
const GAZE_REACH = 240 // px of cursor distance that maps to full travel
const CENTER = { x: 0, y: 0 }
const MOOD_GAZE = {
  thinking: { x: 2.5, y: -2.5 },
  worried: { x: 0, y: 1.5 },
  running: { x: 3, y: 0 }, // drawn facing right; mirrored when running left
}

const MOUTHS = {
  idle: { d: "M51 63 Q60 70 69 63" },
  waving: { d: "M50 62 Q60 72 70 62 Z", open: true },
  dancing: { d: "M50 61 Q60 74 70 61 Z", open: true },
  thinking: { d: "M54 66 L66 63" },
  sleeping: { d: "M56 66 Q60 68 64 66" },
  worried: { d: "M51 68 Q60 62 69 68" },
  running: { d: "M52 62 Q60 70 68 62 Z", open: true },
}

const CAN_WAVE = new Set(["idle", "worried"])
const TRACKS_CURSOR = new Set(["idle", "waving"])

const BODY = "fill-raised stroke-line-strong"
const STROKE = 2.5

function Arm({ side, cx }) {
  // Hangs from the shoulder at (cx, 90); CSS rotates it around that point.
  return (
    <g className={cn("robot-part robot-arm", `robot-arm-${side}`)}>
      <rect x={cx - 4.5} y={86} width={9} height={28} rx={4.5} className={BODY} strokeWidth={STROKE} />
      <circle cx={cx} cy={116} r={6} className={BODY} strokeWidth={STROKE} />
    </g>
  )
}

function Leg({ side, x }) {
  return (
    <g className={cn("robot-part robot-leg", `robot-leg-${side}`)}>
      <rect x={x} y={116} width={10} height={24} rx={4} className={BODY} strokeWidth={STROKE} />
      <rect x={x - 4} y={138} width={18} height={8} rx={4} className={BODY} strokeWidth={STROKE} />
    </g>
  )
}

function useBlink(enabled) {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let wait
    let close
    const schedule = () => {
      wait = setTimeout(() => {
        setBlinking(true)
        close = setTimeout(() => {
          setBlinking(false)
          schedule()
        }, 140)
      }, 3000 + Math.random() * 2000)
    }
    schedule()
    return () => {
      clearTimeout(wait)
      clearTimeout(close)
    }
  }, [enabled])

  return enabled && blinking
}

// Pupils follow the mouse. rAF-throttled; mouse pointers only.
function useCursorGaze(svgRef, enabled) {
  const [gaze, setGaze] = useState(CENTER)

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    let pointer = null

    const update = () => {
      frame = 0
      const svg = svgRef.current
      const ctm = svg?.getScreenCTM()
      if (!ctm || !pointer || svg.getBoundingClientRect().width === 0) return
      const eyes = new DOMPoint((EYES[0] + EYES[1]) / 2, EYE_Y).matrixTransform(ctm)
      const dx = pointer.x - eyes.x
      const dy = pointer.y - eyes.y
      const distance = Math.hypot(dx, dy)
      if (distance === 0) return setGaze(CENTER)
      const travel = GAZE_MAX * Math.min(1, distance / GAZE_REACH)
      setGaze({ x: (dx / distance) * travel, y: (dy / distance) * travel })
    }

    const onMove = e => {
      if (e.pointerType !== "mouse") return
      pointer = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [svgRef, enabled])

  return enabled ? gaze : null
}

/**
 * The assistant's mascot. `mood` comes from chat state (see lib/robotMood);
 * hover or keyboard focus layers a wave on top while it is idle or worried.
 * Clicking (or Enter/Space) calls onDance. `size` is the rendered height in px.
 */
export function RobotMascot({ mood = "idle", size = 152, variant = "full", onDance, showHint = false, className }) {
  const { t } = useLang()
  const svgRef = useRef(null)
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const [engaged, setEngaged] = useState(false)
  const [played, setPlayed] = useState(false)

  const pose = engaged && CAN_WAVE.has(mood) ? "waving" : mood
  const animated = !reducedMotion
  const blinking = useBlink(animated && TRACKS_CURSOR.has(pose))
  const cursorGaze = useCursorGaze(svgRef, animated && finePointer && TRACKS_CURSOR.has(pose))
  const gaze = cursorGaze ?? MOOD_GAZE[pose] ?? CENTER

  const box = VIEWBOX[variant]
  const width = Math.round((size * box.w) / box.h)
  const asleep = pose === "sleeping"
  const light = asleep ? "fill-line-strong" : "fill-accent"
  const mouth = MOUTHS[pose]

  function handleClick() {
    setPlayed(true)
    onDance?.()
  }

  function handleFocus(e) {
    if (e.currentTarget.matches(":focus-visible")) setEngaged(true)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerEnter={e => e.pointerType === "mouse" && setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocus={handleFocus}
      onBlur={() => setEngaged(false)}
      aria-label={t.robotLabel}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer touch-manipulation rounded-lg transition-transform active:translate-y-px",
        className
      )}
      style={{ width, height: size }}
    >
      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        width={width}
        height={size}
        viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
        style={{ overflow: variant === "compact" ? "hidden" : "visible" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("robot", `robot--${pose}`)}
      >
        <g className="robot-rig">
          <Leg side="l" x={45} />
          <Leg side="r" x={65} />

          <g className="robot-part robot-upper">
            <rect x={36} y={82} width={48} height={40} rx={10} className={BODY} strokeWidth={STROKE} />
            <rect x={48} y={92} width={24} height={16} rx={3} className="fill-bg stroke-line-strong" strokeWidth={1.5} />
            <circle cx={60} cy={100} r={3.5} className={cn("robot-light", light)} />
            <rect x={53} y={72} width={14} height={12} rx={3} className={BODY} strokeWidth={STROKE} />

            <g className="robot-part robot-head">
              <path d="M60 28 V16" className="stroke-line-strong" strokeWidth={STROKE} />
              <circle cx={60} cy={11} r={5} className={cn("robot-light", light)} />
              <rect x={23} y={43} width={9} height={18} rx={3.5} className={BODY} strokeWidth={STROKE} />
              <rect x={88} y={43} width={9} height={18} rx={3.5} className={BODY} strokeWidth={STROKE} />
              <rect x={30} y={28} width={60} height={48} rx={14} className={BODY} strokeWidth={STROKE} />

              {pose === "worried" && (
                <path d="M39 40 L52 36 M68 36 L81 40" className="stroke-text-2" strokeWidth={STROKE} />
              )}

              {asleep
                ? EYES.map(cx => (
                    <path
                      key={cx}
                      d={`M${cx - 6} ${EYE_Y} Q${cx} ${EYE_Y + 5} ${cx + 6} ${EYE_Y}`}
                      className="fill-none stroke-text-2"
                      strokeWidth={STROKE}
                    />
                  ))
                : EYES.map(cx => (
                    <g key={cx} className={cn("robot-part robot-eye", blinking && "is-blinking")}>
                      <circle cx={cx} cy={EYE_Y} r={8} className="fill-bg" />
                      <g className="robot-pupil" style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)` }}>
                        <circle cx={cx} cy={EYE_Y} r={4.5} className="fill-accent" />
                        <circle cx={cx - 1.5} cy={EYE_Y - 1.5} r={1.2} className="fill-text" />
                      </g>
                    </g>
                  ))}

              <path
                d={mouth.d}
                className={cn("stroke-text-2", mouth.open ? "fill-bg" : "fill-none")}
                strokeWidth={STROKE}
              />

              {pose === "worried" && (
                <path
                  d="M86 52 C86 52 82.5 57 82.5 59.5 A3.5 3.5 0 0 0 89.5 59.5 C89.5 57 86 52 86 52 Z"
                  className="robot-sweat fill-text-2"
                />
              )}
            </g>

            <Arm side="l" cx={30.5} />
            <Arm side="r" cx={89.5} />
          </g>
        </g>

        {asleep && (
          <g className="fill-muted font-mono">
            <text x={94} y={26} fontSize={11} className="robot-z">z</text>
            <text x={102} y={14} fontSize={14} className="robot-z robot-z-2">z</text>
          </g>
        )}
      </svg>

      {showHint && engaged && !played && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-full top-4 ml-2 whitespace-nowrap rounded-md border border-line-strong bg-raised px-2 py-1 font-mono text-xs text-text-2"
        >
          {t.robotHint}
        </span>
      )}
    </button>
  )
}
