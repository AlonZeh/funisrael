import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** light = on dark backgrounds, dark = on light backgrounds */
  variant?: "dark" | "light";
  showWordmark?: boolean;
}

/**
 * FUN-ISRAEL logo concept.
 *
 * Mark: a soft, slightly tilted balloon-bubble forming the negative-space
 * letter "F" — symbolizing inflatables + happiness. Wordmark uses Rubik 900
 * with a coral accent dot for the "I".
 */
export function Logo({
  className,
  variant = "dark",
  showWordmark = true
}: LogoProps) {
  const wordmarkColor = variant === "dark" ? "text-ink-800" : "text-white";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 drop-shadow-sm"
          aria-hidden
        >
          <defs>
            <linearGradient id="fi-grad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#FF7A55" />
              <stop offset="50%" stopColor="#FF5E33" />
              <stop offset="100%" stopColor="#E64419" />
            </linearGradient>
          </defs>
          <path
            d="M24 4c11 0 20 8.5 20 19.5C44 35 36 44 24 44S4 35 4 23.5 13 4 24 4Z"
            fill="url(#fi-grad)"
          />
          <path
            d="M19 14h13a2 2 0 0 1 0 4H21v6h9a2 2 0 0 1 0 4h-9v8a2 2 0 1 1-4 0V16a2 2 0 0 1 2-2Z"
            fill="#FFF8F0"
          />
          <circle cx="35" cy="36" r="3" fill="#FFD24E" />
        </svg>
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display font-black tracking-tight text-xl leading-none",
            wordmarkColor
          )}
        >
          FUN<span className="text-brand-500">·</span>ISRAEL
        </span>
      )}
    </div>
  );
}
