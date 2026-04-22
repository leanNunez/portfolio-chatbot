import { useState, useEffect } from "react"
import { cn } from "../lib/cn"

const SEQUENCE = [
  { gesture: "look-left",  ms: 500  },
  { gesture: "idle",       ms: 600  },
  { gesture: "blink",      ms: 200  },
  { gesture: "idle",       ms: 500  },
  { gesture: "look-right", ms: 500  },
  { gesture: "idle",       ms: 600  },
  { gesture: "blink",      ms: 200  },
  { gesture: "idle",       ms: 700  },
  { gesture: "happy",      ms: 400  },
  { gesture: "idle",       ms: 300  },
  { gesture: "happy",      ms: 300  },
  { gesture: "idle",       ms: 1200 },
]

export function ProfileBotAvatar({ size = 84 }) {
  const [gesture, setGesture] = useState("idle")

  useEffect(() => {
    let step = 0
    let timer

    const tick = () => {
      const current = SEQUENCE[step % SEQUENCE.length]
      setGesture(current.gesture)
      step++
      timer = setTimeout(tick, current.ms)
    }

    timer = setTimeout(tick, 1200)
    return () => clearTimeout(timer)
  }, [])

  const isBlinking = gesture === "blink"
  const inner = Math.round(size * 0.58)

  const eyeGroupStyle = {
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: "transform 0.12s ease-in-out",
    transform: isBlinking ? "scaleY(0.08)" : "scaleY(1)",
  }

  return (
    /* Outer wrapper: float animation (CSS keyframe on translateY) */
    <div className="bot-float inline-flex shrink-0 relative">
      {/* Inner div: gesture transforms (Tailwind transition on rotate/scale) */}
      <div
        style={{ width: size, height: size }}
        className={cn(
          "rounded-full bg-gradient-to-br from-blue-500 to-violet-600",
          "flex items-center justify-center",
          "shadow-xl shadow-blue-900/40",
          "transition-all duration-300 ease-in-out",
          gesture === "look-left"  && "-rotate-12",
          gesture === "look-right" && "rotate-12",
          gesture === "happy"      && "scale-110",
        )}
      >
        <svg width={inner} height={inner} viewBox="0 0 24 24" fill="none">
          {/* Antenna */}
          <path d="M12 1v3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
          <circle cx="12" cy="1" r="1.3" fill="white" opacity="0.85"/>
          {/* Head */}
          <rect x="2.5" y="4.5" width="19" height="15" rx="4.5"
            fill="white" fillOpacity="0.12"
            stroke="white" strokeWidth="1.2" strokeOpacity="0.65"
          />
          {/* Left eye (white + pupil as group for blink) */}
          <g style={eyeGroupStyle}>
            <circle cx="8.8" cy="12" r="2.4" fill="white" opacity="0.95"/>
            <circle cx="9.5" cy="12.6" r="1.1" fill="white" fillOpacity="0.25"/>
          </g>
          {/* Right eye */}
          <g style={eyeGroupStyle}>
            <circle cx="15.2" cy="12" r="2.4" fill="white" opacity="0.95"/>
            <circle cx="15.9" cy="12.6" r="1.1" fill="white" fillOpacity="0.25"/>
          </g>
          {/* Smile */}
          <path d="M8.5 17 Q12 19.2 15.5 17"
            stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8"
          />
          {/* Side panels */}
          <rect x="0.5" y="10" width="2" height="5" rx="1" fill="white" opacity="0.4"/>
          <rect x="21.5" y="10" width="2" height="5" rx="1" fill="white" opacity="0.4"/>
        </svg>
      </div>
      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
    </div>
  )
}
