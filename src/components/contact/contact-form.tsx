"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("בדיקת זמינות");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const ok = name.trim() && /^[0-9\-+\s]{8,}$/.test(phone) && message.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ok) return;
    setSent(true);
  }

  const waMessage = `היי FUN-ISRAEL,
נושא: ${topic}
שם: ${name}
טלפון: ${phone}

${message}`;

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface p-8 text-center space-y-4"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-mint-100 grid place-items-center">
          <CheckCircle2 className="h-7 w-7 text-mint-600" />
        </div>
        <h2 className="heading-3">תודה! ההודעה התקבלה.</h2>
        <p className="text-ink-500 max-w-md mx-auto">
          לקבלת מענה מהיר במיוחד — שלחו את ההודעה גם בוואטסאפ:
        </p>
        <a
          href={buildWhatsAppLink(siteConfig.whatsapp, waMessage)}
          target="_blank"
          rel="noreferrer"
          className="btn-whatsapp"
        >
          <MessageCircle className="h-4 w-4" />
          שליחה בוואטסאפ
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="label">שם מלא</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="דנה לוי"
            required
          />
        </div>
        <div>
          <p className="label">טלפון</p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            placeholder="050-1234567"
            required
          />
        </div>
      </div>
      <div>
        <p className="label">נושא</p>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input"
        >
          <option>בדיקת זמינות</option>
          <option>שאלות לפני הזמנה</option>
          <option>חבילות אירוע</option>
          <option>שיתופי פעולה</option>
          <option>אחר</option>
        </select>
      </div>
      <div>
        <p className="label">הודעה</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input min-h-[140px] resize-none"
          placeholder="ספרו לנו על האירוע, גילאי הילדים, סגנון..."
          required
        />
      </div>
      <button
        type="submit"
        disabled={!ok}
        className="btn-brand w-full py-3.5"
      >
        <Send className="h-4 w-4" /> שליחה
      </button>
    </form>
  );
}
