"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Droplet,
  Home,
  MessageCircle,
  Ruler,
  Truck,
  Users
} from "lucide-react";
import { useProductStore } from "@/store/product-store";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./product-gallery";
import { ProductBadge } from "./product-badge";
import { formatILS, buildWhatsAppLink, cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { getCategory } from "@/lib/categories";
import { ProductSchema } from "@/components/seo/schema";
import { AddToReservationButton } from "@/components/reservation/add-to-reservation-button";
import { TermsReminder } from "@/components/terms/terms-reminder";

interface Props {
  initialProduct: Product;
}

export function ProductDetail({ initialProduct }: Props) {
  const stored = useProductStore((s) =>
    s.products.find((p) => p.id === initialProduct.id)
  );
  const hydrated = useProductStore((s) => s.hydrated);
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    if (hydrated && stored) setProduct(stored);
  }, [hydrated, stored]);

  const category = getCategory(product.category);
  const waMessage = `היי, אני מתעניין/ת בהשכרת ${product.name} 🎈\nאשמח לבדוק זמינות`;

  return (
    <>
      <ProductSchema product={product} />
      <section className="container-page py-10 md:py-14">
        <nav className="text-sm text-ink-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-ink-700">בית</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-ink-700">קטלוג</Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-ink-700"
              >
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <ProductBadge key={b} type={b} />
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-2 text-balance"
            >
              {product.name}
            </motion.h1>
            <p className="body-lead">{product.shortDescription}</p>

            <div className="card-surface p-5 flex items-baseline gap-3">
              <span className="text-sm text-ink-500">השכרה ל-12 שעות החל מ-</span>
              <span className="font-display font-extrabold text-3xl text-ink-800">
                {formatILS(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-ink-400 line-through">
                  {formatILS(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Spec icon={<Users className="h-4 w-4" />} label="גילאי" value={product.ageRange} />
              <Spec
                icon={<Ruler className="h-4 w-4" />}
                label="שטח התקנה"
                value={`${product.setupArea.length}×${product.setupArea.width} מ׳`}
              />
              <Spec
                icon={<Clock className="h-4 w-4" />}
                label="זמן הקמה"
                value={`${product.setupTime} דק׳`}
              />
              <Spec
                icon={<Home className="h-4 w-4" />}
                label="מתאים לאינדור"
                value={product.indoorFriendly ? "כן" : "לא"}
              />
              <Spec
                icon={<Droplet className="h-4 w-4" />}
                label="חיבור מים"
                value={product.needsWater ? "נדרש" : "לא"}
              />
              <Spec
                icon={<Truck className="h-4 w-4" />}
                label="רכב לאיסוף"
                value={product.pickupVehicle}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <AddToReservationButton
                item={{
                  key: `product:${product.id}`,
                  kind: "product",
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  imageUrl: product.images[0],
                  unitPrice: product.price,
                  priceLabel: formatILS(product.price),
                  category: product.category,
                  tags: product.badges
                }}
                label="הוספה לשיריון"
                className="flex-1 sm:flex-initial"
              />
              <a
                href={buildWhatsAppLink(siteConfig.whatsapp, waMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp flex-1 sm:flex-initial"
              >
                <MessageCircle className="h-4 w-4" />
                שאלות בוואטסאפ
              </a>
            </div>

            <TermsReminder variant="card" />

            {product.perfectFor.length > 0 && (
              <div className="card-surface p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
                  מושלם עבור
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.perfectFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-mint-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Section title="על המתנפח">
              <p className="text-ink-600 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </p>
            </Section>

            <Section title="בטיחות וניקיון">
              <ul className="space-y-2 text-ink-600">
                <SafetyItem text="ניקוי וחיטוי מקיף בין כל השכרה — כולל אזורי קפיצה ואוורור." />
                <SafetyItem text="בדיקת בטיחות מלאה לפני המסירה — תפרים, מערכות אוורור, יציבות." />
                <SafetyItem text="חובה השגחת מבוגר במהלך כל השימוש." />
                <SafetyItem text="הקפדה על מספר המשתמשים המקסימלי שמצוין על המתנפח." />
              </ul>
            </Section>
          </div>

          <aside className="space-y-4">
            <div className="card-surface p-5 space-y-3">
              <p className="font-display font-bold text-ink-800">מידות וטכניקה</p>
              <ul className="text-sm text-ink-600 space-y-1.5">
                <li className="flex justify-between">
                  <span>אורך</span>
                  <span className="font-semibold text-ink-800">
                    {product.dimensions.length} ס״מ
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>רוחב</span>
                  <span className="font-semibold text-ink-800">
                    {product.dimensions.width} ס״מ
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>גובה</span>
                  <span className="font-semibold text-ink-800">
                    {product.dimensions.height} ס״מ
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-ink-800 text-cream-50 p-5">
              <p className="font-display font-bold text-white">איסוף עצמי</p>
              <p className="text-sm text-cream-200/80 mt-1">
                {siteConfig.pickupAddress} · החל מ-08:00
              </p>
              <p
                className={cn(
                  "mt-3 text-sm",
                  product.stock > 0 ? "text-mint-300" : "text-brand-300"
                )}
              >
                {product.stock > 0
                  ? `במלאי · ${product.stock} זמינים`
                  : "פנו אלינו בוואטסאפ לבדיקת זמינות"}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Spec({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-ink-100">
      <div className="flex items-center gap-1.5 text-xs text-ink-500">
        {icon}
        {label}
      </div>
      <p className="font-display font-bold text-ink-800 mt-1">{value}</p>
    </div>
  );
}

function Section({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-6">
      <h2 className="heading-3 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function SafetyItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="h-4 w-4 text-mint-500 mt-1 shrink-0" />
      <span>{text}</span>
    </li>
  );
}
