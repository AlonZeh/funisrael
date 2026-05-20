"use client";

import { useState } from "react";
import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
  subMonths
} from "date-fns";
import { he } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Selected date in ISO yyyy-MM-dd (or null) */
  value: string | null;
  onChange: (iso: string) => void;
}

const HEBREW_WEEKDAYS = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

/**
 * Lightweight RTL calendar.
 * - Past dates disabled.
 * - One date selectable.
 * - Month navigation with Hebrew labels.
 * - Mobile-friendly tap targets.
 */
export function ReservationCalendar({ value, onChange }: Props) {
  const today = startOfDay(new Date());
  const initialView = value ? new Date(value) : today;
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialView));

  const selectedDate = value ? startOfDay(new Date(value)) : null;
  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const firstWeekday = getDay(monthStart); // 0 = Sunday in JS

  const cells: ({ date: Date } | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    cells.push({ date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d) });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  function canSelect(date: Date) {
    return !isBefore(date, today);
  }

  function handleSelect(date: Date) {
    if (!canSelect(date)) return;
    onChange(format(date, "yyyy-MM-dd"));
  }

  return (
    <div className="card-surface p-5 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="h-9 w-9 grid place-items-center rounded-full hover:bg-cream-100 text-ink-600"
          aria-label="חודש קודם"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <p className="font-display font-extrabold text-ink-800 text-lg capitalize">
          {format(viewMonth, "MMMM yyyy", { locale: he })}
        </p>
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="h-9 w-9 grid place-items-center rounded-full hover:bg-cream-100 text-ink-600"
          aria-label="חודש הבא"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </header>

      <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
        {HEBREW_WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-xs font-bold text-ink-400 py-1.5"
            aria-hidden
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) => {
          if (!cell) {
            return <div key={`pad-${i}`} className="h-11" aria-hidden />;
          }
          const { date } = cell;
          const isToday = isSameDay(date, today);
          const isSelected =
            selectedDate && isSameDay(date, selectedDate);
          const disabled = !canSelect(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(date)}
              aria-pressed={!!isSelected}
              aria-label={format(date, "EEEE, d בMMMM yyyy", { locale: he })}
              className={cn(
                "relative h-11 rounded-2xl text-sm font-medium transition",
                disabled
                  ? "text-ink-200 cursor-not-allowed"
                  : isSelected
                    ? "bg-ink-800 text-white shadow-soft"
                    : isToday
                      ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200 hover:bg-brand-100"
                      : "text-ink-700 hover:bg-cream-100"
              )}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
