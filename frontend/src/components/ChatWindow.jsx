import { useEffect, useRef } from "react"
import { MessageBubble } from "./MessageBubble"
import { TypingIndicator } from "./TypingIndicator"
import { ChatInput } from "./ChatInput"
import { BotAvatar } from "./BotAvatar"
import { useChat } from "../hooks/useChat"
import { useLang } from "../context/LanguageContext"

export function ChatWindow() {
  const { messages, isLoading, sendMessage } = useChat()
  const { t, lang, toggle } = useLang()
  const messagesRef = useRef(null)

  useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-zinc-950">

      {/* Header */}
      <div
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 pb-3 sm:pb-4 min-h-[56px] border-b border-white/[0.06] bg-zinc-900 sm:bg-zinc-900/80 sm:backdrop-blur-sm shrink-0"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <BotAvatar size={36} />
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{t.assistantName}</p>
          <p className="text-xs text-gray-500 leading-tight">{t.assistantSubtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden xs:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-500">{t.online}</span>
          </div>
          <button
            onClick={toggle}
            aria-label="Cambiar idioma"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-semibold text-gray-300 hover:text-white transition-all touch-manipulation"
          >
            <span className={lang === "es" ? "text-white" : "text-gray-500"}>ES</span>
            <span className="text-gray-600">/</span>
            <span className={lang === "en" ? "text-white" : "text-gray-500"}>EN</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        role="log"
        aria-live="polite"
        aria-label="Conversación con el asistente"
        className="flex-1 overflow-y-auto overscroll-y-contain p-3 sm:p-6 lg:p-8 custom-scroll"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}

          {messages.length === 1 && !isLoading && (
            <div className="mt-4">
              <p className="text-xs text-gray-600 mb-3">{t.suggestions}</p>
              <div className="flex flex-col xs:flex-row xs:flex-wrap gap-2">
                {t.suggestedQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="min-h-[44px] text-xs bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 rounded-lg px-3 py-2 transition-all border border-white/[0.07] hover:border-white/[0.12] touch-manipulation text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Input */}
      <div
        className="w-full pt-3 sm:pt-4 px-3 sm:px-4 border-t border-white/[0.06] bg-zinc-900 sm:bg-zinc-900/80 sm:backdrop-blur-sm shrink-0"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>

    </div>
  )
}
