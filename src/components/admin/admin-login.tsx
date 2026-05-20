"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useAdminStore } from "@/store/admin-store";

export function AdminLogin() {
  const login = useAdminStore((s) => s.login);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(password);
    if (!ok) setError("סיסמה שגויה — נסו שוב");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-cream-50 p-4">
      <div className="card-surface p-8 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center gap-3">
          <Logo />
          <h1 className="heading-3">כניסה לניהול</h1>
          <p className="text-sm text-ink-500">
            פאנל ניהול מוצרים, הזמנות והגדרות. כניסה למנהלים בלבד.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="label">סיסמה</span>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="input pr-9"
                placeholder="••••••••"
                autoFocus
              />
            </div>
          </label>
          {error && <p className="text-sm text-brand-600">{error}</p>}
          <button type="submit" className="btn-brand w-full">
            כניסה
          </button>
        </form>

        <Link
          href="/"
          className="block text-center text-sm text-ink-500 hover:text-ink-800"
        >
          חזרה לאתר
        </Link>
      </div>
    </div>
  );
}
