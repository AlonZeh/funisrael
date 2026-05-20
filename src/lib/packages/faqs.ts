import type { LocalizedString } from "@/lib/i18n/config";

export interface PackageFAQ {
  q: LocalizedString;
  a: LocalizedString;
}

export const packageFaqs: PackageFAQ[] = [
  {
    q: {
      he: "לכמה זמן ההשכרה?",
      en: "How long is the rental?",
      ru: "Какой срок аренды?"
    },
    a: {
      he: "כל ההשכרות הן ל-12 שעות.",
      en: "All rentals are 12 hours.",
      ru: "Все аренды — 12 часов."
    }
  },
  {
    q: {
      he: "האם יש משלוח?",
      en: "Do you deliver?",
      ru: "Есть ли доставка?"
    },
    a: {
      he: "בשלב זה המודל הוא איסוף עצמי מדרך יבנה 52.",
      en: "Currently we operate on a self-pickup model from Derech Yavne 52.",
      ru: "Сейчас работаем по модели самовывоза с Дерех Явне 52."
    }
  },
  {
    q: {
      he: "איך בודקים זמינות?",
      en: "How do I check availability?",
      ru: "Как проверить доступность?"
    },
    a: {
      he: "לוחצים על 'בדיקת זמינות בוואטסאפ' ושולחים תאריך ושעת איסוף רצויה.",
      en: "Tap 'Check availability on WhatsApp' and send us your preferred date and pickup time.",
      ru: "Нажмите «Проверить в WhatsApp» и отправьте желаемую дату и время самовывоза."
    }
  },
  {
    q: {
      he: "האם אפשר להתאים חבילה לפי גיל הילדים?",
      en: "Can you tailor a package to my kids' age?",
      ru: "Можно ли подобрать пакет по возрасту?"
    },
    a: {
      he: "כן — אפשר לשלוח לנו גילאים, כמות ילדים וגודל המקום ונמליץ על החבילה המתאימה.",
      en: "Yes — share the ages, the number of kids and the space size, and we'll recommend the right package.",
      ru: "Да — пришлите возраст, количество детей и размер площадки, мы порекомендуем подходящий пакет."
    }
  },
  {
    q: {
      he: "האם יש חבילות לבית או לחלל סגור?",
      en: "Do you have packages for indoor / home events?",
      ru: "Есть ли пакеты для дома или закрытых помещений?"
    },
    a: {
      he: "כן — קיימות חבילות Indoor ופעוטות שמתאימות לחללים סגורים, בכפוף לגודל המקום.",
      en: "Yes — we offer Indoor and Toddler packages designed for enclosed spaces, subject to room size.",
      ru: "Да — есть пакеты Indoor и для малышей, подходящие для закрытых помещений (по размеру)."
    }
  }
];
