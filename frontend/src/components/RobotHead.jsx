import { cn } from "../lib/cn"

const BODY = "fill-raised stroke-line-strong"

// Static head of the mascot: the assistant's avatar in bot message bubbles.
// Decorative: the assistant is always named in nearby text.
export function RobotHead({ className }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="20 1 80 80"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      className={cn("shrink-0", className)}
    >
      <path d="M60 28 V16" className="stroke-line-strong" />
      <circle cx={60} cy={11} r={5} className="fill-accent" />
      <rect x={23} y={43} width={9} height={18} rx={3.5} className={BODY} />
      <rect x={88} y={43} width={9} height={18} rx={3.5} className={BODY} />
      <rect x={30} y={28} width={60} height={48} rx={14} className={BODY} />
      <circle cx={46} cy={50} r={8} className="fill-bg" strokeWidth={0} />
      <circle cx={74} cy={50} r={8} className="fill-bg" strokeWidth={0} />
      <circle cx={46} cy={50} r={4.5} className="fill-accent" strokeWidth={0} />
      <circle cx={74} cy={50} r={4.5} className="fill-accent" strokeWidth={0} />
      <path d="M51 63 Q60 70 69 63" className="fill-none stroke-text-2" />
    </svg>
  )
}
