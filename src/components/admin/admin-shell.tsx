"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  PackageOpen,
  Settings
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useAdminStore } from "@/store/admin-store";
import { AdminLogin } from "./admin-login";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "סקירה", icon: LayoutDashboard },
  { href: "/admin/products", label: "מוצרים", icon: Package },
  { href: "/admin/packages", label: "חבילות", icon: PackageOpen },
  { href: "/admin/articles", label: "מאמרים", icon: FileText },
  { href: "/admin/bookings", label: "הזמנות", icon: CalendarCheck },
  { href: "/admin/settings", label: "הגדרות", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const logout = useAdminStore((s) => s.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!isAuthenticated) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-0 lg:h-screen bg-white border-l border-ink-100 p-5 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-2 pb-3 border-b border-ink-100">
            <Logo showWordmark />
          </Link>
          <p className="text-xs uppercase tracking-wider text-ink-400 pt-3 mb-1">
            ניהול
          </p>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-ink-800 text-white"
                    : "text-ink-600 hover:bg-cream-100 hover:text-ink-800"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-auto pt-4 border-t border-ink-100 space-y-2">
            <Link href="/" className="btn-ghost w-full text-sm">
              לאתר הראשי
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 w-full rounded-2xl px-3 py-2.5 text-sm font-medium text-ink-500 hover:text-brand-600 hover:bg-brand-50 transition"
            >
              <LogOut className="h-4 w-4" />
              התנתקות
            </button>
          </div>
        </aside>

        <main className="p-5 md:p-8 lg:p-10 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
