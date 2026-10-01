import { useLang } from "../context/language"

// Signature move: every answer ends with a database-style log line.
export function QueryLog({ sources, latency }) {
  const { t, lang } = useLang()
  const visual = [...sources, `${latency.toFixed(1)}s`].join(" · ")
  const spokenSeconds = latency.toLocaleString(lang, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  return (
    <p className="mt-3 border-t border-line pt-2 font-mono text-xs text-muted">
      <span aria-hidden="true">
        <span className="text-accent">↳</span> {visual}
      </span>
      <span className="sr-only">{t.logLabel(sources, spokenSeconds)}</span>
    </p>
  )
}
