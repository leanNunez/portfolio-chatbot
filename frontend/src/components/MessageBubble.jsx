import { cn } from "../lib/cn"
import { BotAvatar } from "./BotAvatar"

export function MessageBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex mb-6", isUser ? "justify-end" : "justify-start")}>
      {!isUser && <BotAvatar size={30} className="mr-3 mt-1" />}
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-5 py-4 text-base leading-relaxed",
          isUser
            ? "bg-blue-600 text-white rounded-br-md shadow-lg shadow-blue-900/25"
            : "bg-white/[0.06] text-gray-100 rounded-bl-md border border-white/[0.07]"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.sources?.length > 0 && (
          <p className="text-xs mt-3 opacity-40 border-t border-white/10 pt-2.5">
            Fuente: {message.sources.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}
