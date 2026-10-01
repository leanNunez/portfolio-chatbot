import { useLang } from "../context/language"
import { BotBubble } from "./BotBubble"

export function TypingIndicator() {
  const { t } = useLang()

  return (
    <BotBubble>
      <span aria-hidden="true" className="flex h-6 items-center gap-1">
        <span className="size-1.5 animate-typing rounded-full bg-text-2" />
        <span className="size-1.5 animate-typing rounded-full bg-text-2 [animation-delay:160ms]" />
        <span className="size-1.5 animate-typing rounded-full bg-text-2 [animation-delay:320ms]" />
      </span>
      <span className="sr-only">{t.typing}</span>
    </BotBubble>
  )
}
