import { cn } from "../lib/cn"
import { useLang } from "../context/language"
import { CheckCircleIcon, OfflineIcon, PendingIcon } from "./icons"

const VARIANTS = {
  checking: { Icon: PendingIcon, labelKey: "statusChecking", tone: "text-muted" },
  online: { Icon: CheckCircleIcon, labelKey: "statusOnline", tone: "text-accent" },
  offline: { Icon: OfflineIcon, labelKey: "statusOffline", tone: "text-error" },
}

export function StatusBadge({ status }) {
  const { t } = useLang()
  const { Icon, labelKey, tone } = VARIANTS[status]

  return (
    <p role="status" className={cn("flex items-center gap-2 font-mono text-xs", tone)}>
      <Icon className="size-4 shrink-0" />
      <span className="sr-only sm:not-sr-only">
        <span className="sr-only">{t.statusLabel}: </span>
        {t[labelKey]}
      </span>
    </p>
  )
}
