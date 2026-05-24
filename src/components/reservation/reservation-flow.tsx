"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Send, ShoppingBag } from "lucide-react";
import { useReservationStore } from "@/store/reservation-store";
import { buildReservationWhatsAppLink } from "@/lib/reservation/whatsapp";
import { PageHeader } from "@/components/layout/page-header";
import { TermsReminder } from "@/components/terms/terms-reminder";
import { ReservationStepper, type StepDef } from "./reservation-stepper";
import { ReceivingMethodStep } from "./step-receiving-method";
import { DateSelectionStep } from "./step-date";
import { AddOnsStep } from "./step-addons";
import { ContactDetailsStep, type ContactErrors } from "./step-contact";
import { ReservationSummary } from "./reservation-summary";
import { ReservationSuccess } from "./reservation-success";
import { ReservationFAQ } from "./reservation-faq";

const STEPS: StepDef[] = [
  { id: "receiving", label: "איסוף או הובלה" },
  { id: "date", label: "בחירת תאריך" },
  { id: "addons", label: "מוצרים נלווים" },
  { id: "contact", label: "פרטים ושליחה" }
];

function isValidPhone(p: string) {
  return /^[0-9\-+\s]{8,}$/.test(p.trim());
}

export function ReservationFlow() {
  const items = useReservationStore((s) => s.items);
  const hydrated = useReservationStore((s) => s.hydrated);
  const submitted = useReservationStore((s) => s.submitted);
  const date = useReservationStore((s) => s.date);
  const receivingMethod = useReservationStore((s) => s.receivingMethod);
  const deliveryType = useReservationStore((s) => s.deliveryType);
  const customer = useReservationStore((s) => s.customer);
  const markSubmitted = useReservationStore((s) => s.markSubmitted);
  const resetAfterSubmit = useReservationStore((s) => s.resetAfterSubmit);

  const [stepIdx, setStepIdx] = useState(0);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hydrated) setReady(true);
  }, [hydrated]);

  // Auto-advance to step 0 if user came in with state already filled
  useEffect(() => {
    if (!ready) return;
    if (submitted) return;
    // Best-effort: jump user past completed steps if they refresh
    if (receivingMethod && date && stepIdx === 0) {
      setStepIdx(2);
    }
  }, [ready, receivingMethod, date, submitted, stepIdx]);

  // Block on empty cart — render redirect-style CTA
  if (ready && items.length === 0 && !submitted) {
    return (
      <>
        <PageHeader
          eyebrow="שיריון ציוד"
          title="עדיין אין ציוד בעגלת השיריון"
          description="לפני שמשרינים תאריך — נוסיף לעגלה לפחות מוצר או חבילה אחת."
        />
        <section className="container-page pb-20">
          <div className="card-surface p-8 max-w-2xl mx-auto text-center space-y-5">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-cream-100 text-ink-500">
              <ShoppingBag className="h-6 w-6" />
            </span>
            <p className="text-ink-600">
              בחרו מתנפח או חבילה והוסיפו לעגלת השיריון, ואז תוכלו להמשיך
              לבדיקת זמינות.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/catalog" className="btn-brand">
                לקטלוג המתנפחים <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/packages" className="btn-ghost">
                לחבילות
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!ready) {
    return (
      <>
        <PageHeader eyebrow="שיריון ציוד" title="שיריון ציוד" />
        <section className="container-page pb-20">
          <div className="card-surface p-12 animate-pulse h-80" />
        </section>
      </>
    );
  }

  if (submitted) {
    const link = buildReservationWhatsAppLink(useReservationStore.getState());
    return (
      <>
        <ReservationSuccess
          whatsappHref={link}
          onStartOver={() => {
            resetAfterSubmit();
            setStepIdx(0);
          }}
        />
        <section className="container-page pb-20">
          <ReservationFAQ />
        </section>
      </>
    );
  }

  function canAdvance(): boolean {
    setContactErrors({});
    setSubmitError(null);
    switch (stepIdx) {
      case 0:
        if (!receivingMethod) {
          setSubmitError("יש לבחור איסוף עצמי או הובלה.");
          return false;
        }
        if (receivingMethod === "delivery" && !deliveryType) {
          setSubmitError("יש לבחור סוג הובלה.");
          return false;
        }
        return true;
      case 1:
        if (!date) {
          setSubmitError("יש לבחור תאריך.");
          return false;
        }
        return true;
      case 2:
        return true; // optional
      case 3: {
        const errs: ContactErrors = {};
        if (!customer.fullName.trim()) errs.fullName = "יש להזין שם מלא.";
        if (!isValidPhone(customer.phone))
          errs.phone = "מספר טלפון לא תקין.";
        if (!customer.city.trim()) errs.city = "יש להזין עיר.";
        if (receivingMethod === "delivery" && !(customer.address ?? "").trim())
          errs.address = "יש להזין כתובת או אזור להובלה.";
        if (!customer.termsAccepted)
          errs.termsAccepted =
            "יש לקרוא את תקנון FUN-ISRAEL ולסמן את תיבת האישור לפני שליחת הבקשה.";
        if (Object.keys(errs).length) {
          setContactErrors(errs);
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  }

  function handleNext() {
    if (!canAdvance()) return;
    setStepIdx((i) => Math.min(STEPS.length - 1, i + 1));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setStepIdx((i) => Math.max(0, i - 1));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSubmit() {
    if (!canAdvance()) return;
    // Mark submitted immediately so the user sees the success screen + WhatsApp
    // handoff without waiting on the network. The email notification is a
    // fire-and-forget side effect; if it fails, the form still works because
    // the user has the WhatsApp link to send the request themselves.
    const stateSnapshot = useReservationStore.getState();
    markSubmitted();
    void fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stateSnapshot),
      // Use keepalive so the request survives page unload (user closes tab)
      keepalive: true
    }).catch((err) => {
      // Non-fatal — WhatsApp is the source of truth
      console.warn("[reservation] email notify failed:", err);
    });
  }

  const completed = new Set<number>(
    [
      receivingMethod ? 0 : null,
      date ? 1 : null,
      // addons step is always "complete-able"
      stepIdx > 2 ? 2 : null
    ].filter((x): x is number => x !== null)
  );

  return (
    <>
      <PageHeader
        eyebrow="שיריון ציוד"
        title="בקשת שיריון — בלי לחץ, בלי תשלום באתר"
        description="ארבעה שלבים קצרים: איסוף או הובלה, תאריך, מוצרים נלווים, ושליחה ל-FUN-ISRAEL. נחזור אליכם בוואטסאפ לאישור זמינות."
      />

      <section className="container-page pb-4">
        <TermsReminder variant="card" />
      </section>

      <section className="container-page pb-6">
        <ReservationStepper
          steps={STEPS}
          current={stepIdx}
          completed={completed}
          onSelect={(idx) => setStepIdx(idx)}
        />
      </section>

      <section className="container-page pb-20 grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
        <div className="space-y-6">
          {stepIdx === 0 && <ReceivingMethodStep />}
          {stepIdx === 1 && <DateSelectionStep />}
          {stepIdx === 2 && <AddOnsStep />}
          {stepIdx === 3 && <ContactDetailsStep errors={contactErrors} />}

          {submitError && (
            <div className="rounded-2xl bg-brand-50 ring-1 ring-brand-100 p-4 text-sm text-brand-700">
              {submitError}
            </div>
          )}

          <nav className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIdx === 0}
              className="btn-ghost text-sm disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
              שלב קודם
            </button>

            {stepIdx === 2 && (
              <button
                type="button"
                onClick={handleNext}
                className="text-sm font-semibold text-ink-500 hover:text-ink-800"
              >
                דלגו לשלב הבא
              </button>
            )}

            {stepIdx < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-brand"
              >
                המשך
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!customer.termsAccepted}
                className="btn-brand disabled:opacity-50 disabled:cursor-not-allowed"
                title={!customer.termsAccepted ? "יש לסמן את אישור התקנון לפני שליחה" : undefined}
              >
                <Send className="h-4 w-4" />
                שליחת בקשת שיריון
              </button>
            )}
          </nav>
        </div>

        <ReservationSummary />
      </section>

      <section className="container-page pb-20">
        <ReservationFAQ />
      </section>

      {/* Mobile sticky bottom action */}
      <MobileStickyAction
        primaryLabel={stepIdx === STEPS.length - 1 ? "שליחת בקשת שיריון" : "המשך"}
        onPrimary={stepIdx === STEPS.length - 1 ? handleSubmit : handleNext}
        primaryDisabled={
          stepIdx === STEPS.length - 1 && !customer.termsAccepted
        }
        canGoBack={stepIdx > 0}
        onBack={handleBack}
      />
    </>
  );
}

function MobileStickyAction({
  primaryLabel,
  onPrimary,
  primaryDisabled,
  canGoBack,
  onBack
}: {
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  canGoBack: boolean;
  onBack: () => void;
}) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 px-3 pb-3 pt-2 pointer-events-none">
      <div className="pointer-events-auto rounded-3xl bg-white shadow-card ring-1 ring-ink-100 grid grid-cols-[auto_1fr] gap-2 p-2">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className="btn-ghost w-full disabled:opacity-40"
          aria-label="שלב קודם"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className="btn-brand w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {primaryLabel}
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
