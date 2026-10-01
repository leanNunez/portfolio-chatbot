import { cn } from "../lib/cn"
import { RobotHead } from "./RobotHead"

// Shared shell for every assistant-side bubble (answers, errors, typing).
export function BotBubble({ tone = "default", children }) {
  return (
    <div className="flex items-start gap-3">
      <RobotHead className="mt-1 hidden size-8 xs:block" />
      <div
        className={cn(
          "min-w-0 max-w-full rounded-lg border bg-surface px-4 py-3 text-text sm:max-w-[80%]",
          tone === "error" ? "border-error" : "border-line"
        )}
      >
        {children}
      </div>
    </div>
  )
}
