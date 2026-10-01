import { useState } from "react"
import { useLang } from "../context/language"
import { SendIcon } from "./icons"

export function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("")
  const { t } = useLang()
  const canSend = !disabled && value.trim().length > 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSend) return
    onSend(value)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-3xl items-center gap-3">
      <label htmlFor="chat-input" className="sr-only">
        {t.inputLabel}
      </label>
      <input
        id="chat-input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={t.inputPlaceholder}
        autoComplete="off"
        className="min-h-12 min-w-0 flex-1 rounded-lg border border-line-strong bg-raised px-4 text-base text-text placeholder:text-muted transition-colors hover:border-text-2 focus-visible:border-accent"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label={t.send}
        className="inline-flex min-h-12 shrink-0 touch-manipulation items-center gap-2 rounded-lg bg-accent px-4 font-mono text-xs font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:bg-accent disabled:cursor-not-allowed disabled:bg-raised disabled:text-muted"
      >
        <span className="hidden xs:inline">{t.send}</span>
        <SendIcon className="size-4" />
      </button>
    </form>
  )
}
