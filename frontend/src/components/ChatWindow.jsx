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
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 flex flex-col h-full relative bg-zinc-950">

      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 pb-4 border-b border-white/[0.06] bg-zinc-900/80 backdrop-blur-sm shrink-0"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <BotAvatar size={36} />
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{t.assistantName}</p>
          <p className="text-xs text-gray-500 leading-tight">{t.assistantSubtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-500">{t.online}</span>
          </div>
          <button
            onClick={toggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-semibold text-gray-300 hover:text-white transition-all"
          >
            <span className={lang === "es" ? "text-white" : "text-gray-500"}>ES</span>
            <span className="text-gray-600">/</span>
            <span className={lang === "en" ? "text-white" : "text-gray-500"}>EN</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 custom-scroll">
        <div className="max-w-3xl mx-auto flex flex-col">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}

          {messages.length === 1 && !isLoading && (
            <div className="mt-4">
              <p className="text-xs text-gray-600 mb-3">{t.suggestions}</p>
              <div className="flex flex-wrap gap-2">
                {t.suggestedQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-gray-200 rounded-lg px-3 py-2 transition-all border border-white/[0.07] hover:border-white/[0.12]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div
        className="w-full pt-4 px-4 mt-auto border-t border-white/[0.06] bg-zinc-900/80 backdrop-blur-sm"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>

    </div>
  )
}
