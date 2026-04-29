import { useState } from "react"
import { useLang } from "../context/LanguageContext"

function SendIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  )
}

export function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("")
  const { t } = useLang()

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onSend(value)
    setValue("")
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="max-w-3xl mx-auto flex gap-3 items-center">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={t.inputPlaceholder}
          className="flex-1 bg-white/[0.05] placeholder-gray-600 rounded-xl px-3 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base outline-none
            border border-white/[0.07]
            focus:border-blue-500/40 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/30
            disabled:opacity-50
            transition-all duration-200"
          style={{ color: "white" }}
        />
        <button
          type="submit"
          aria-label={t.send}
          disabled={disabled || !value.trim()}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600
            hover:from-blue-500 hover:to-violet-500
            disabled:from-blue-600 disabled:to-violet-600 disabled:opacity-30 disabled:cursor-not-allowed
            rounded-xl px-3 sm:px-5 py-3 sm:py-3.5 text-sm font-medium
            shadow-lg shadow-blue-900/30 hover:shadow-blue-800/50
            hover:scale-[1.02] active:scale-[0.98]
            touch-manipulation transition-all duration-150 shrink-0"
          style={{ color: "white" }}
        >
          <span className="hidden xs:inline">{t.send}</span>
          <SendIcon />
        </button>
      </div>
    </form>
  )
}
