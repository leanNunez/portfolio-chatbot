import { useLang } from "../context/language"
import { BotBubble } from "./BotBubble"
import { MarkdownMessage } from "./MarkdownMessage"
import { QueryLog } from "./QueryLog"
import { AlertIcon, RetryIcon } from "./icons"

const ERROR_COPY = {
  rateLimit: "errorRateLimit",
  timeout: "errorTimeout",
  server: "errorServer",
}

export function MessageBubble({ message, onRetry, canRetry, retryDisabled }) {
  const { t } = useLang()

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-lg border-r-2 border-accent bg-raised px-4 py-3 text-text sm:max-w-[70%]">
          <span className="sr-only">{t.you} </span>
          {message.content}
        </p>
      </div>
    )
  }

  if (message.kind === "error") {
    return (
      <BotBubble tone="error">
        <p className="flex items-start gap-2">
          <AlertIcon className="mt-1 size-4 shrink-0 text-error" />
          <span>
            <span className="sr-only">{t.errorTitle}: </span>
            {t[ERROR_COPY[message.errorType]]}
          </span>
        </p>
        {canRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={retryDisabled}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md border border-line-strong bg-surface px-3 font-mono text-xs text-text transition-colors hover:bg-raised active:bg-bg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface"
          >
            <RetryIcon className="size-4" />
            {t.retry}
          </button>
        )}
      </BotBubble>
    )
  }

  const content = message.kind === "welcome" ? (message.content ?? t.welcomeMessage) : message.content

  return (
    <BotBubble>
      <span className="sr-only">{t.assistant} </span>
      <MarkdownMessage content={content} />
      {message.latency != null && <QueryLog sources={message.sources} latency={message.latency} />}
    </BotBubble>
  )
}
