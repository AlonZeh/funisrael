import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking/booking-form";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "הזמנת מתנפח",
  description: "בדיקת זמינות והזמנת מתנפח ב-FUN-ISRAEL. השכרה ל-12 שעות, איסוף עצמי.",
  alternates: { canonical: "/booking" }
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="הזמנה"
        title="בדיקת זמינות והזמנה."
        description="מילוי בקשה קצרה, אישור אישי בוואטסאפ ותשלום במעמד האיסוף — בלי שאלות, בלי בלגן."
      />
      <section className="container-page pb-20">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<div className="card-surface p-12 animate-pulse h-80" />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
