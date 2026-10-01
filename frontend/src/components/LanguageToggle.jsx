import { cn } from "../lib/cn"
import { useLang } from "../context/language"

export function LanguageToggle() {
  const { lang, t, toggle } = useLang()
  const option = code =>
    cn(
      "underline-offset-4",
      lang === code ? "text-text underline decoration-accent decoration-2" : "text-muted"
    )

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchLanguage}
      className="inline-flex h-9 touch-manipulation items-center gap-1 rounded-md border border-line-strong px-2 font-mono sm:px-3 text-xs font-semibold transition-colors hover:bg-raised active:bg-bg"
    >
      <span className={option("es")}>ES</span>
      <span aria-hidden="true" className="text-muted">/</span>
      <span className={option("en")}>EN</span>
    </button>
  )
}
