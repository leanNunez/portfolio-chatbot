import { ProfileBotAvatar } from "./ProfileBotAvatar"
import { useLang } from "../context/LanguageContext"

const SKILLS = [
  "React", "FastAPI", "Python", "TypeScript",
  "PostgreSQL", "Node.js", "Docker", "TailwindCSS",
]

export function ProfilePanel() {
  const { t } = useLang()
  return (
    <aside className="hidden lg:flex flex-col w-[30%] h-full p-4 overflow-hidden bg-zinc-900 border-r border-white/[0.06] relative">
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-56 h-56 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 gap-3">

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3">
          <ProfileBotAvatar size={76} />

          <div className="text-center flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-white tracking-tight">Leandro Nuñez</h1>
            <p className="text-sm text-blue-400 font-medium">{t.role}</p>
            <p className="text-xs text-gray-500">{t.location}</p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.available}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Bio */}
        <div className="flex flex-col gap-1 text-sm text-gray-400">
          <p className="leading-6">{t.bio1}</p>
          <p className="leading-6">{t.bio2}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{t.stack}</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(skill => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-xs text-gray-300 hover:bg-white/[0.08] hover:text-white transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Thank you */}
        <p className="text-sm text-gray-400 text-center leading-relaxed italic">
          {t.thankYou} ✦{" "}
          <span className="inline-block animate-bounce text-xl">🥹</span>
        </p>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Footer */}
        <div className="flex flex-col gap-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {t.profileSubtitle}
          </p>
          <div className="flex gap-2">
            <a
              href="https://github.com/leanNunez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white text-xs font-medium transition-all border border-white/[0.07]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lean-nunez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white text-xs font-medium transition-all border border-white/[0.07]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
