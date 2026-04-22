import { cn } from "../lib/cn"

export function BotAvatar({ size = 32, className }) {
  const inner = Math.round(size * 0.58)

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/30",
        className
      )}
    >
      <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
        <path d="M12 1v3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
        <circle cx="12" cy="1" r="1.3" fill="white" opacity="0.85"/>
        <rect x="2.5" y="4.5" width="19" height="15" rx="4.5" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="1.2" strokeOpacity="0.65"/>
        <circle cx="8.8" cy="12" r="2.4" fill="white" opacity="0.95"/>
        <circle cx="15.2" cy="12" r="2.4" fill="white" opacity="0.95"/>
        <circle cx="9.5" cy="12.6" r="1.1" fill="white" fillOpacity="0.25"/>
        <circle cx="15.9" cy="12.6" r="1.1" fill="white" fillOpacity="0.25"/>
        <path d="M8.5 17 Q12 19.2 15.5 17" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8"/>
        <rect x="0.5" y="10" width="2" height="5" rx="1" fill="white" opacity="0.4"/>
        <rect x="21.5" y="10" width="2" height="5" rx="1" fill="white" opacity="0.4"/>
      </svg>
    </div>
  )
}
