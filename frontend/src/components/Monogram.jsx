import { cn } from "../lib/cn"

const SIZES = {
  sm: "size-8 rounded-md text-xs",
  md: "size-10 rounded-md text-base",
  lg: "size-16 rounded-lg text-xl",
}

// Static "LN" mark. Decorative: the name is always present as text nearby.
export function Monogram({ size = "sm", className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center border border-line-strong bg-raised font-mono font-semibold text-text",
        SIZES[size],
        className
      )}
    >
      LN
    </span>
  )
}
