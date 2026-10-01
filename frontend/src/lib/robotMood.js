/** How long a dance lasts, both after an answer lands and after a click. */
export const DANCE_MS = 2500

/**
 * Derives the mascot's mood from chat state. Pure: same input, same mood.
 * Precedence: offline > loading > dance window > last message error > idle.
 *
 * danceUntil is an epoch-ms deadline, or null when no dance is pending.
 * `now` is injectable so the function stays testable.
 */
export function getRobotMood({ status, isLoading, lastMessage, danceUntil, now = Date.now() }) {
  if (status === "offline") return "sleeping"
  if (isLoading) return "thinking"
  if (danceUntil != null && now < danceUntil) return "dancing"
  if (lastMessage?.kind === "error") return "worried"
  return "idle"
}

/**
 * The run to the chat gutter is transient positioning state owned by
 * ChatWindow, not chat state, so it is layered on top of getRobotMood's
 * result. While running it wins over every mood (even sleeping): the robot
 * finishes the run, then resolves to whatever the chat state says.
 */
export function withRun(mood, running) {
  return running ? "running" : mood
}
