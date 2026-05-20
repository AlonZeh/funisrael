"use client";

import { AdminPackageTable } from "@/components/admin/admin-package-table";
import { AdminPackageFormMock } from "@/components/admin/admin-package-form-mock";

export default function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="heading-2">חבילות השכרה</h1>
        <p className="text-ink-500">
          ניהול חבילות. נכון לעכשיו עריכה מתבצעת ישירות בקובץ{" "}
          <code className="rounded bg-cream-100 px-1.5 py-0.5 text-[12px]">
            src/lib/packages/data.ts
          </code>
          . בעתיד יתווסף עורך חי דרך פאנל זה.
        </p>
      </header>

      <section className="card-surface p-5 bg-gradient-to-br from-brand-50 to-cream-50">
        <h2 className="font-display font-extrabold text-ink-800">איך עורכים חבילה?</h2>
        <ol className="mt-2 space-y-1 text-sm text-ink-700 list-decimal pe-5">
          <li>פתחו את הקובץ <code>src/lib/packages/data.ts</code></li>
          <li>אתרו את הפריט הרצוי לפי <code>id</code></li>
          <li>עדכנו <code>priceFrom</code>, <code>priceLabel</code>, <code>title</code>, וכו׳</li>
          <li>שמרו והרצו <code>npm run dev</code> כדי לראות שינויים מיידיים</li>
          <li>להסתרה — שנו <code>isActive: false</code></li>
          <li>לסדר תצוגה — עדכנו <code>sortOrder</code> (קטן יותר = ראשון)</li>
        </ol>
      </section>

      <AdminPackageTable />
      <AdminPackageFormMock />
    </div>
  );
}
