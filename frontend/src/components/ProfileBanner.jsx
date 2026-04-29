import { BotAvatar } from "./BotAvatar"
import { useLang } from "../context/LanguageContext"

export function ProfileBanner() {
  const { t } = useLang()

  return (
    <div className="lg:hidden flex items-center gap-3 px-3 py-2.5 min-h-[52px] bg-zinc-900 border-b border-white/[0.06] shrink-0">
      <BotAvatar size={30} />
      <div className="flex-1 min-w-0">
        <p className="text-fluid-sm font-semibold text-white leading-tight truncate">Leandro Nuñez</p>
        <p className="text-[11px] text-blue-400 leading-tight truncate">{t.role}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-medium shrink-0">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden xs:inline whitespace-nowrap">{t.available}</span>
      </span>
    </div>
  )
}
