import Link from "next/link";
import { ScrollText } from "lucide-react";

/**
 * Compact, reusable reminder that the FUN-ISRAEL Terms of Service must
 * be read before any inflatable is used. Placed across the customer
 * journey (catalog, product, packages, builder, reservation) to reduce
 * legal exposure and reinforce the rental safety contract.
 */
export function TermsReminder({
  variant = "inline",
  className = ""
}: {
  variant?: "inline" | "card";
  className?: string;
}) {
  if (variant === "card") {
    return (
      <div
        className={`rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-4 md:p-5 flex items-start gap-3 text-sm text-ink-700 ${className}`}
      >
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-brand-600 shrink-0 ring-1 ring-brand-100">
          <ScrollText className="h-4 w-4" />
        </span>
        <p className="leading-relaxed">
          <span className="font-bold text-ink-800">לפני השימוש בכל מתקן —</span>{" "}
          חובה לעבור על{" "}
          <Link
            href="/terms"
            className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700"
          >
            תקנון FUN-ISRAEL במלואו
          </Link>
          , כולל נספח הבטיחות, נהלי החירום והצהרת המשגיח האחראי. השימוש מותר
          בחצר פרטית בלבד ובהשגחת מבוגר אחראי.
        </p>
      </div>
    );
  }

  return (
    <p
      className={`text-xs text-ink-500 leading-relaxed inline-flex items-start gap-1.5 ${className}`}
    >
      <ScrollText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-brand-500" />
      <span>
        לפני שימוש במתקן — חובה לעבור על{" "}
        <Link
          href="/terms"
          className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700"
        >
          תקנון FUN-ISRAEL
        </Link>{" "}
        ונספח הבטיחות.
      </span>
    </p>
  );
}
