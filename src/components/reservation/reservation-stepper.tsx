"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDef {
  id: string;
  label: string;
}

interface Props {
  steps: StepDef[];
  current: number;
  /** Step indices that may be jumped back to */
  completed: Set<number>;
  onSelect?: (idx: number) => void;
}

export function ReservationStepper({
  steps,
  current,
  completed,
  onSelect
}: Props) {
  return (
    <nav aria-label="שלבי השיריון" className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <ol className="flex items-center gap-1 sm:gap-2 min-w-max sm:min-w-0">
        {steps.map((step, idx) => {
          const isActive = idx === current;
          const isDone = completed.has(idx);
          const isClickable = !!onSelect && (isDone || idx < current);
          const StepEl = isClickable ? "button" : "div";

          return (
            <li key={step.id} className="flex items-center">
              <StepEl
                {...(isClickable && {
                  type: "button" as const,
                  onClick: () => onSelect?.(idx)
                })}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-ink-800 text-white shadow-soft"
                    : isDone
                      ? "bg-mint-100 text-mint-700"
                      : "bg-cream-100 text-ink-500",
                  isClickable && "hover:opacity-80 cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-xs font-bold",
                    isActive
                      ? "bg-white text-ink-800"
                      : isDone
                        ? "bg-mint-500 text-white"
                        : "bg-white text-ink-500"
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                </span>
                <span className="font-medium whitespace-nowrap">
                  {step.label}
                </span>
              </StepEl>
              {idx < steps.length - 1 && (
                <span
                  className={cn(
                    "mx-1 sm:mx-2 h-px w-4 sm:w-6 shrink-0",
                    idx < current ? "bg-mint-300" : "bg-ink-100"
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
