import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MessageBubble } from "./MessageBubble"
import { TypingIndicator } from "./TypingIndicator"
import { ChatInput } from "./ChatInput"
import { RobotMascot } from "./RobotMascot"
import { StatusBadge } from "./StatusBadge"
import { LanguageToggle } from "./LanguageToggle"
import { ProfileDrawer } from "./ProfileDrawer"
import { useChatState } from "../context/chat"
import { useLang } from "../context/language"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { withRun } from "../lib/robotMood"
import { cn } from "../lib/cn"

// Gutter robot: full-body height range in px. Below the minimum (or on a short
// chat area) the robot goes to the header instead.
const GUTTER_ROBOT_MAX = 160
const GUTTER_ROBOT_MIN = 140
const GUTTER_MARGIN = 32 // free space the gutter needs beyond the robot's width
const GUTTER_MIN_HEIGHT = 320
const ROBOT_ASPECT = 120 / 152 // full viewBox width / height (see RobotMascot)
const RUN_MS = 800
const RUN_STEPS = 16

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Robot height that fits a left gutter of `gutter` px, or null if none does. */
function gutterRobotSize(gutter, height) {
  if (height < GUTTER_MIN_HEIGHT) return null
  const size = Math.min(GUTTER_ROBOT_MAX, Math.floor((gutter - GUTTER_MARGIN) / ROBOT_ASPECT))
  return size >= GUTTER_ROBOT_MIN ? size : null
}

const easeInOut = t => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

/**
 * FLIP keyframes for the slot: from the hero rect `from` back to its own
 * layout (identity), scaling around the robot's top-center with a small arc.
 */
function runKeyframes(from, to) {
  const dx = from.left + from.width / 2 - (to.left + to.width / 2)
  const dy = from.top - to.top
  const scale = from.height / to.height
  return Array.from({ length: RUN_STEPS + 1 }, (_, i) => {
    const p = easeInOut(i / RUN_STEPS)
    const arc = Math.sin(p * Math.PI) * 24
    const s = scale + (1 - scale) * p
    return { transform: `translate(${dx * (1 - p)}px, ${dy * (1 - p) - arc}px) scale(${s})` }
  })
}

/**
 * The robot is the assistant, so it lives in the chat.
 * - hero: before the first user message it is centered above the welcome.
 * - gutter: afterwards, when the chat area has a wide enough free gutter left of
 *   the message column, it stands at the bottom of that gutter (running there
 *   on the first message).
 * - header: otherwise it shrinks into the header.
 *
 * Hero and gutter are the same element in the same tree position: the slot is
 * in flow inside the message column for the hero, and absolutely positioned
 * against the (non-scrolling) stage for the gutter. Neither the scroller nor
 * the column is positioned, so in gutter mode the slot neither scrolls nor is
 * clipped by the log. Exactly one RobotMascot is mounted at a time.
 */
export function ChatWindow() {
  const { messages, isLoading, status, mood, sendMessage, retry, dance } = useChatState()
  const { t } = useLang()
  const stageRef = useRef(null)
  const messagesRef = useRef(null)
  const columnRef = useRef(null)
  const slotRef = useRef(null)
  const robotRef = useRef(null)
  const roomy = useMediaQuery("(min-width: 40rem) and (min-height: 40rem)")
  const [gutter, setGutter] = useState({ width: 0, size: null })
  // Hero rect captured just before the first message; non-null while running.
  const [runFrom, setRunFrom] = useState(null)

  const hasUserMessage = messages.some(m => m.role === "user")
  const lastId = messages.at(-1)?.id
  const placement = !hasUserMessage ? "hero" : gutter.size ? "gutter" : "header"
  const running = placement === "gutter" && runFrom != null
  const robotMood = withRun(mood, running)
  const caption =
    robotMood === "idle" && status === "checking" ? t.robotMood.connecting : t.robotMood[robotMood]

  useEffect(() => {
    const el = messagesRef.current
    // The empty state is centered and starts at its top; only follow the
    // conversation once there is one.
    if (!el || !hasUserMessage) return
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }, [messages, isLoading, hasUserMessage])

  // Free space between the chat area's left edge and the message column.
  useEffect(() => {
    const stage = stageRef.current
    const column = columnRef.current
    if (!stage || !column) return
    const observer = new ResizeObserver(() => {
      const stageRect = stage.getBoundingClientRect()
      const width = Math.floor(column.getBoundingClientRect().left - stageRect.left)
      const size = gutterRobotSize(width, stageRect.height)
      setGutter(prev => (prev.width === width && prev.size === size ? prev : { width, size }))
      // Losing the gutter mid-run ends the run: the robot just switches places.
      if (!size) setRunFrom(null)
    })
    observer.observe(stage)
    observer.observe(column)
    return () => observer.disconnect()
  }, [])

  // The run: FLIP from the captured hero rect to the gutter layout.
  useLayoutEffect(() => {
    const slot = slotRef.current
    const robot = robotRef.current
    if (!running || !slot || !robot) return
    const to = robot.getBoundingClientRect()
    const slotRect = slot.getBoundingClientRect()
    slot.style.transformOrigin = `${to.left + to.width / 2 - slotRect.left}px ${to.top - slotRect.top}px`
    // Drawn facing right; mirror while running left.
    const movingLeft = to.left + to.width / 2 < runFrom.left + runFrom.width / 2
    robot.style.transform = movingLeft ? "scaleX(-1)" : ""

    const animation = slot.animate(runKeyframes(runFrom, to), { duration: RUN_MS, easing: "linear" })
    animation.onfinish = () => setRunFrom(null)
    return () => {
      animation.onfinish = null
      animation.cancel()
      robot.style.transform = ""
    }
  }, [running, runFrom])

  function send(text) {
    const robot = robotRef.current
    if (!hasUserMessage && gutter.size && robot && !prefersReducedMotion()) {
      const { left, top, width, height } = robot.getBoundingClientRect()
      setRunFrom({ left, top, width, height })
    }
    sendMessage(text)
  }

  const robotLabel = `${t.robotName} · ${caption}`

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-bg">
      {/* Phones: this is the only top bar, so it owns the top safe area. Tablets:
          the ProfileBanner above owns it. */}
      <header className="flex shrink-0 items-center gap-2 border-b border-line bg-surface px-4 pb-3 pt-safe sm:gap-3 sm:px-6 md:pt-3 lg:pt-safe">
        {/* Phones hide the banner (and its h1); keep a page heading for screen readers. */}
        <h1 className="sr-only md:hidden">Leandro Nuñez</h1>
        <ProfileDrawer />
        {placement === "header" && (
          <span className="inline-flex shrink-0 animate-robot-enter">
            <RobotMascot mood={robotMood} size={44} variant="compact" onDance={dance} />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-balance font-mono text-xs leading-tight font-semibold text-text sm:text-base">{t.chatTitle}</h2>
          <p className="text-xs text-muted">{placement === "header" ? caption : t.chatSubtitle}</p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* On phones the robot's pose and caption already show the backend state;
              the badge stays for screen readers (it's the live status region). */}
          <div className="max-md:sr-only">
            <StatusBadge status={status} />
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div ref={stageRef} className="relative flex min-h-0 flex-1 flex-col overflow-clip">
        <div
          ref={messagesRef}
          className="log-scroll flex flex-1 flex-col overflow-y-auto overscroll-y-contain px-4 py-6 sm:px-6 lg:px-8"
        >
          {/* my-auto centers the empty state but collapses to 0 when it overflows,
              so short screens still scroll from the top. */}
          <div
            ref={columnRef}
            className={cn("mx-auto flex w-full max-w-3xl shrink-0 flex-col gap-6", !hasUserMessage && "my-auto")}
          >
            {placement !== "header" && (
              <div
                ref={slotRef}
                className={cn(
                  "flex flex-col items-center gap-3",
                  placement === "gutter" && "pointer-events-none absolute bottom-3 left-0 gap-2 px-2"
                )}
                style={placement === "gutter" ? { width: gutter.width } : undefined}
              >
                <span ref={robotRef} className="pointer-events-auto inline-flex">
                  <RobotMascot
                    mood={robotMood}
                    size={placement === "gutter" ? gutter.size : roomy ? 200 : 150}
                    onDance={dance}
                    showHint={placement === "hero"}
                  />
                </span>
                <p className="max-w-full text-balance text-center font-mono text-xs text-muted">{robotLabel}</p>
              </div>
            )}

            <div role="log" aria-label={t.conversationLabel} className="flex flex-col gap-6">
              {messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  canRetry={msg.kind === "error" && msg.id === lastId}
                  retryDisabled={isLoading}
                  onRetry={retry}
                />
              ))}
              {isLoading && <TypingIndicator />}
            </div>

            {!hasUserMessage && (
              <section aria-labelledby="suggestions-title" className="flex flex-col gap-3">
                <h3 id="suggestions-title" className="font-mono text-xs text-muted sm:text-center">
                  {t.suggestions}
                </h3>
                <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                  {t.suggestedQuestions.map(q => (
                    <li key={q}>
                      <button
                        type="button"
                        onClick={() => send(q)}
                        disabled={isLoading}
                        className="min-h-11 w-full touch-manipulation rounded-md border border-line-strong bg-surface px-3 py-2 text-left font-mono text-xs text-text-2 transition-colors hover:bg-raised hover:text-text active:bg-bg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface disabled:hover:text-text-2 sm:w-auto"
                      >
                        {q}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      <div className="w-full shrink-0 border-t border-line bg-surface px-4 pb-safe pt-3 sm:px-6">
        <ChatInput onSend={send} disabled={isLoading} />
      </div>
    </div>
  )
}
