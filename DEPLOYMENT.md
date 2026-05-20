# מדריך פריסה — FUN-ISRAEL

מדריך מלא להעלאת האתר לאוויר, חיבור דומיין משלכם, וקבלת בקשות שיריון
ישירות למייל הפרטי. עדכון אחרון: 2026-05-20.

## תוכן עניינים

1. [סקירה — מה תקבלו בסוף](#1-סקירה)
2. [שלב 1 — דחיפת הקוד ל-GitHub](#2-שלב-1--דחיפת-הקוד-ל-github)
3. [שלב 2 — פריסה ל-Vercel (חינם)](#3-שלב-2--פריסה-ל-vercel-חינם)
4. [שלב 3 — קניית דומיין: מה לבחור](#4-שלב-3--קניית-דומיין-מה-לבחור)
5. [שלב 4 — חיבור הדומיין ל-Vercel](#5-שלב-4--חיבור-הדומיין-ל-vercel)
6. [שלב 5 — חיבור טופס השיריון למייל הפרטי](#6-שלב-5--חיבור-טופס-השיריון-למייל-הפרטי)
7. [שלב 6 — מעבר ל-from address משלכם](#7-שלב-6--מעבר-ל-from-address-משלכם)
8. [שלב 7 — בדיקות שוטפות אחרי הפריסה](#8-שלב-7--בדיקות-שוטפות-אחרי-הפריסה)
9. [פתרונות חלופיים](#9-פתרונות-חלופיים)
10. [תקלות נפוצות](#10-תקלות-נפוצות)

---

## 1. סקירה

מה הולך לקרות בסוף התהליך הזה:

- האתר חי בכתובת `https://<הדומיין-שלכם>` (לדוגמה `https://fun-israel.com`).
- כל אישור SSL (HTTPS) אוטומטי וחינם.
- כל פעם שלקוח לוחץ "שליחת בקשת שיריון", אתם מקבלים מייל מסודר ל-
  `zehavialon4@gmail.com` עם כל הפרטים — תאריך, מוצרים, פרטי קשר,
  הסכמות, כפתורי WhatsApp/חיוג ישיר ללקוח.
- בנוסף, נשלחת הודעה מוכנה בוואטסאפ של הלקוח לעצמכם (הגיבוי הקיים).
- האתר תומך ב-RTL, נגישות, פופאפ קהילה, מערכת SEO, ניהול אדמין —
  הכל ישאר עובד כפי שעובד היום.

**עלויות חזויות (לשנה):**

| פריט | ספק מומלץ | עלות שנתית משוערת |
|------|-----------|-----|
| דומיין `.co.il` | LiveDNS / domainthe.net | ₪40-100 |
| דומיין `.com` | Cloudflare Registrar | ~$10 |
| אחסון Next.js | Vercel (Hobby plan) | חינם |
| שליחת מיילים | Resend (Free tier) | חינם עד 3,000 מיילים/חודש |
| **סה"כ שנה ראשונה** | | **~₪40-130** |

---

## 2. שלב 1 — דחיפת הקוד ל-GitHub

1. צרו חשבון GitHub חינם ב-https://github.com/signup אם אין לכם.
2. צרו repository חדש ופרטי (private): `funisraelcoil` או שם דומה.
3. בתיקיית הפרויקט המקומית פתחו Git Bash / Terminal והריצו:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git push -u origin main
   ```

4. בכל פעם שתעשו שינוי בקוד, פשוט:

   ```bash
   git add .
   git commit -m "תיאור השינוי"
   git push
   ```

   Vercel יזהה את הדחיפה ויבנה את האתר אוטומטית.

---

## 3. שלב 2 — פריסה ל-Vercel (חינם)

Vercel נוצרה על ידי הצוות שיצר את Next.js, ומכוונת בדיוק לאתרים כאלה.

1. היכנסו ל-https://vercel.com/signup → התחברו עם **GitHub**.
2. לחצו **"Add New… → Project"**.
3. בחרו את ה-repository שיצרתם בשלב הקודם → **Import**.
4. Vercel תזהה את הפרויקט כ-Next.js אוטומטית. אין צורך לשנות הגדרות.
5. **Environment Variables**: בשלב זה הוסיפו (ניתן גם בהמשך):

   | שם משתנה | ערך |
   |----------|-----|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (זמני, נחליף בשלב 4) |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `972509331313` |
   | `NEXT_PUBLIC_PHONE_NUMBER` | `050-933-1313` |
   | `NEXT_PUBLIC_PICKUP_ADDRESS` | `דרך יבנה 52` |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | סיסמת אדמין חזקה (שנו מברירת המחדל!) |
   | `RESEND_API_KEY` | (נמלא בשלב 5) |
   | `RESERVATION_NOTIFICATION_EMAIL` | `zehavialon4@gmail.com` |
   | `RESERVATION_FROM_EMAIL` | `FUN-ISRAEL <onboarding@resend.dev>` |

6. לחצו **Deploy**.
7. תוך ~60 שניות תקבלו URL זמני, לדוגמה `funisrael.vercel.app` — בדקו
   שהאתר עולה.

---

## 4. שלב 3 — קניית דומיין: מה לבחור

### אופציה A — `.co.il` (מומלץ לעסק ישראלי)

הדומיין הישראלי הסטנדרטי. צריך רשם מורשה של ISOC IL.

**רשמים מומלצים בארץ:**

| רשם | יתרונות | אתר |
|-----|--------|-----|
| **LiveDNS** | ממשק עברית, תמיכה מקומית, ניהול DNS פשוט | https://livedns.co.il |
| **DomainTheNet** | ותיק, אמין | https://domainthenet.com |
| **GoDaddy IL** | בינלאומי + תמיכה ב-`.co.il` | https://godaddy.com |

> שימו לב: רישום `.co.il` הוא ל-2 או 4 שנים (אין רישום שנתי).
> עלות סבירה: ₪40-100 לשנה ממוצעת.
> אם השם תפוס, בדקו וריאציות: `funisrael.com`, `funisrael-rentals.com`, או חזרה ל-`.co.il`.

### אופציה B — `.com` (לקהל בינלאומי או אם `.co.il` תפוס)

**רשמים מומלצים:**

| רשם | יתרונות | אתר |
|-----|--------|-----|
| **Cloudflare Registrar** | במחיר עלות (~$10/שנה), DNS מצוין כלול | https://cloudflare.com/products/registrar |
| **Namecheap** | ממשק נוח, מחירים סבירים | https://namecheap.com |
| **Porkbun** | מחירים נמוכים, ממשק נקי | https://porkbun.com |

### מה לא לעשות

- **לא** לקנות דומיין בתחילת התהליך עם תוספות מיותרות כמו "domain
  privacy premium" (היום הרבה רשמים נותנים את זה חינם), "site builder"
  או "professional email — $5/month" — אנחנו לא צריכים אותם.
- **לא** לקנות דרך GoDaddy עם renewal price יקר; קראו את התנאים
  לפני אישור.

---

## 5. שלב 4 — חיבור הדומיין ל-Vercel

כשהדומיין שלכם (לדוגמה `fun-israel.com`):

1. ב-Vercel: היכנסו לפרויקט → **Settings → Domains → Add**.
2. הזינו את הדומיין (לדוגמה `fun-israel.com`) → **Add**.
3. Vercel יבקש מכם להוסיף רשומות DNS. שתי אופציות:

### אופציה 1: DNS אצל הרשם (פשוט יותר)

ברשם הדומיין (LiveDNS / Cloudflare / וכו'), עברו לניהול DNS של הדומיין
והוסיפו את הרשומות הבאות:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` (או ריק) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> אם הרשם תומך ב-`ALIAS` או `ANAME` ב-root, השתמשו בהם ל-`@` עם הערך
> `cname.vercel-dns.com` — זה אפילו טוב יותר מ-A record.

### אופציה 2: העברת DNS ל-Cloudflare (חינם, ממליץ)

יתרון: שליטה גבוהה יותר, הגנת DDoS חינם, ביצועים טובים יותר.

1. ב-Cloudflare → Add Site → הזינו את הדומיין → Free Plan.
2. Cloudflare יתן לכם 2 nameservers (לדוגמה `kara.ns.cloudflare.com`).
3. אצל הרשם המקורי, החליפו את ה-nameservers לאלו של Cloudflare.
4. ב-Cloudflare → DNS → הוסיפו את הרשומות מאופציה 1 לעיל (זכרו לכבות
   את ה-Proxy או להפוך ל-DNS Only ל-A record של Vercel).

### לאחר הוספת הרשומות

- חיכיון התפשטות (DNS propagation): בין כמה דקות לכמה שעות.
- Vercel מזהה את הרשומה אוטומטית ומנפיק תעודת SSL חינמית (Let's Encrypt).
- במסך Vercel תראו אינדיקציה ירוקה ✓.

### אחרי שהדומיין חי

חזרו ל-Vercel → Settings → Environment Variables ועדכנו:

```
NEXT_PUBLIC_SITE_URL = https://fun-israel.com
```

ולחצו **Redeploy** כדי שהאתר יבנה מחדש עם ה-URL החדש בכל המטא-תגיות,
ה-sitemap וה-OG.

---

## 6. שלב 5 — חיבור טופס השיריון למייל הפרטי

יש 3 קומפוננטות שכבר בנויות בקוד:

- `src/app/api/reservation/route.ts` — endpoint שמקבל בקשות שיריון.
- `src/lib/reservation/email.ts` — תבנית המייל (HTML + טקסט).
- חיווט אוטומטי בכפתור "שליחת בקשת שיריון" ב-reservation-flow.

מה שצריך לעשות:

### 6.1 פתיחת חשבון Resend (חינם)

1. כנסו ל-https://resend.com/signup וצרו חשבון (כניסה עם Google = פשוט).
2. אישור מייל ב-Resend.
3. **API Keys → Create API Key**:
   - Name: `FUN-ISRAEL Production`
   - Permission: `Sending access`
   - העתיקו את המפתח (מתחיל ב-`re_…`). **רק עכשיו תוכלו לראות אותו — שמרו במקום בטוח.**

### 6.2 הוספת המפתח ל-Vercel

1. Vercel → פרויקט → **Settings → Environment Variables**.
2. הוסיפו:

   | שם משתנה | ערך | Environment |
   |----------|-----|-------------|
   | `RESEND_API_KEY` | `re_…` (המפתח שהעתקתם) | Production + Preview |
   | `RESERVATION_NOTIFICATION_EMAIL` | `zehavialon4@gmail.com` | Production |
   | `RESERVATION_FROM_EMAIL` | `FUN-ISRAEL <onboarding@resend.dev>` | Production |

3. לחצו **Save** → Vercel ייגרם redeploy אוטומטי.

> 💡 ה-`onboarding@resend.dev` הוא שולח sandbox של Resend. הוא עובד מיד
> בלי להגדיר דומיין. החיסרון: יופיע ל-Gmail כ"מ-onboarding@resend.dev"
> ולא מהדומיין שלכם. נחליף את זה בשלב 7.

### 6.3 בדיקה

1. כנסו לאתר החי.
2. הוסיפו מתנפח לעגלת השיריון → "המשך לשיריון".
3. עברו את 4 השלבים → "שליחת בקשת שיריון".
4. תוך 5-15 שניות, **תקבלו מייל ל-zehavialon4@gmail.com** עם:
   - נושא: 🎈 בקשת שיריון חדשה — [שם] — [תאריך]
   - גוף HTML מעוצב עם כל הפרטים
   - כפתורי "פתח וואטסאפ עם הלקוח" / "חיוג ישיר"
   - ה-`reply-to` הוא המייל של הלקוח (אם מילא) — כך תוכלו לענות לו
     ישירות מ-Gmail.

> אם המייל לא הגיע — בדקו תיקיית ספאם, ובדקו **Vercel → Project → Logs**
> לראות אם יש שגיאה מה-API route. דרך מהירה לדבג: השוו את ה-Resend API
> key שהדבקתם — אסור שיהיו רווחים מסביב.

---

## 7. שלב 6 — מעבר ל-from address משלכם

כדי שהמייל יראה לפונה כאילו הוא מ-`hello@fun-israel.com` ולא מ-
`onboarding@resend.dev`:

1. ב-Resend → **Domains → Add Domain** → הזינו `fun-israel.com`.
2. Resend יציג 3-4 רשומות DNS שיש להוסיף (TXT, MX, CNAME).
3. הוסיפו אותן ב-DNS של הדומיין (LiveDNS/Cloudflare/וכו').
4. חזרו ל-Resend → Verify Domain. תוך כמה דקות-שעות תקבלו אישור.
5. ב-Vercel → Environment Variables → עדכנו:

   ```
   RESERVATION_FROM_EMAIL = "FUN-ISRAEL <hello@fun-israel.com>"
   ```

6. Redeploy.

עכשיו כל מייל שיוצא נראה רשמי ומקצועי.

> 📥 גם הקופסה `hello@fun-israel.com` אצלכם — תצטרכו להגדיר
> forwarding אליה. ב-LiveDNS/Cloudflare/וכו' יש "Email Forwarding"
> חינם — הגדירו `hello@fun-israel.com` → `zehavialon4@gmail.com`.
> כך גם תקבלו מיילים אם מישהו ישלח ידנית לכתובת המקצועית.

---

## 8. שלב 7 — בדיקות שוטפות אחרי הפריסה

לאחר שכל זה רץ, בצעו את הצ׳קליסט הבא לוודא שהכל תקין:

### בדיקות בסיסיות

- [ ] `https://fun-israel.com` עולה עם תעודת SSL חוקית (מנעול בכרום).
- [ ] `https://www.fun-israel.com` מפנה ל-`https://fun-israel.com`.
- [ ] הקטלוג, החבילות, המדריכים, הבלוג נטענים.
- [ ] הלוגו, ה-OG image, ה-favicon מוצגים.
- [ ] המובייל נראה נקי.

### בדיקת SEO

- [ ] `https://fun-israel.com/sitemap.xml` עובד.
- [ ] `https://fun-israel.com/robots.txt` עובד.
- [ ] בכלי Google Rich Results Test ([https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)),
      בודקים `/`, `/products/atlantis-water-park`, `/blog/<אחד>`,
      `/packages` ומוודאים שה-schemas נטענים.
- [ ] רישום הדומיין ב-[Google Search Console](https://search.google.com/search-console)
      → Add Property → URL prefix → אימות דרך HTML tag (להוסיף ב-
      `src/app/layout.tsx`) או DNS TXT record.

### בדיקת טופס שיריון

- [ ] הוסיפו מוצר → /reserve → מילוי טופס → שליחה.
- [ ] **קיבלתם מייל ב-zehavialon4@gmail.com תוך 30 שניות?**
- [ ] במייל יש את כל הפרטים? הסכמות? כפתור WhatsApp עובד?
- [ ] לחיצה על "דברו איתנו בוואטסאפ" במסך ההצלחה פותחת WhatsApp עם
      הודעה מלאה?

### בדיקת אבטחה ופרטיות

- [ ] `https://fun-israel.com/admin` דורש סיסמה.
- [ ] שינוי הסיסמה ב-`NEXT_PUBLIC_ADMIN_PASSWORD` תפס אחרי redeploy.
- [ ] עמודי `/cart` ו-`/reserve` לא מופיעים ב-`/sitemap.xml` (אישית
      בדקתי — disallow ב-robots).
- [ ] טופס השיריון לא מבקש פרטי אשראי.

---

## 9. פתרונות חלופיים

אם משהו מהנ"ל לא מתאים לכם:

### חלופה לאחסון: Netlify / Cloudflare Pages

- **Netlify**: דומה ל-Vercel, פשוט יותר במקרים מסוימים. צריך לעדכן
  את `next.config.mjs` עם adapter (Netlify יציע אוטומטית).
- **Cloudflare Pages**: צריך wrangler/adapter. Function calls
  עוברים דרך Cloudflare Workers.

ל-Next.js עם API routes כמו שיש לנו (`/api/reservation`), Vercel הוא
הכי טבעי. אם תעברו לאחר, השאירו את ה-API route כפי שהוא — שני
הספקים תומכים ב-route handlers של Next.js App Router.

### חלופה לשליחת מייל: Formspree / Web3Forms

אם לא רוצים לעבוד עם Resend בכלל:

- **Formspree** ([formspree.io](https://formspree.io)): יוצרים טופס, מקבלים endpoint
  כמו `https://formspree.io/f/abc123`. שולחים אליו POST מהאתר, הם
  שולחים מייל. חינם עד 50 טפסים/חודש.
- **Web3Forms** ([web3forms.com](https://web3forms.com)): דומה, בלי הגבלת חודש בחינם.

אם תרצו לעבור, החליפו את הקריאה ב-`reservation-flow.tsx`:

```tsx
void fetch("https://formspree.io/f/<YOUR_ID>", { ... })
```

במקום `"/api/reservation"`. החיסרון: התבנית של המייל פחות יפה, ה-
`reply-to` יותר מסובך לשליטה.

### חלופה ללא backend: שליחה ידנית בלבד

אם אתם רוצים לוותר על אוטומציה לחלוטין: פשוט לא להגדיר
`RESEND_API_KEY`. הטופס עדיין עובד — הוא פותח לכם WhatsApp עם הפרטים
ואתם מעתיקים ידנית. זה הברירת המחדל הנוכחית עד שתגדירו Resend.

---

## 10. תקלות נפוצות

### "404 not found" אחרי חיבור הדומיין

- חיכיון של DNS — חכו עד שעה. בדקו [https://dnschecker.org](https://dnschecker.org).
- ודאו שהוספתם A record ב-`@` (לא רק `www`).

### המייל לא מגיע

- בדקו ספאם ב-Gmail (במיוחד אם השולח הוא `onboarding@resend.dev`).
- בדקו Vercel logs (Project → Logs → סננו לפי `/api/reservation`).
- ודאו ש-`RESEND_API_KEY` הוגדר ב-Vercel ויש redeploy אחריו.
- ב-Resend → Logs תראו אם המייל נשלח אך נדחה.

### "Domain not verified" ב-Resend

- מחכים לרשומות DNS שעדיין לא התפשטו. חכו 30 דקות ונסו לוודא שוב.
- ודאו שהעתקתם את הרשומות מילה במילה — כולל סלאשים, נקודות וכל הטקסט
  אחרי `.`.

### "Build failed" ב-Vercel

- בדקו את ה-build log. אם זה שגיאת TypeScript, היא תופיע בבירור.
- ודאו שלא מחקתם משתני סביבה חיוניים.

### מישהו פוגע באתר / השכרות פיקטיביות

- ה-admin password צריך להיות חזק (לא `funisrael2026`).
- שקלו להוסיף [rate limiting](https://vercel.com/docs/concepts/edge-network/rate-limiting)
  ל-`/api/reservation` (פיצ׳ר עתידי).
- ה-API route דוחה payload לא תקין (חסר שם/טלפון/אישור תנאים).

---

## נספח: סיכום משתני סביבה

```bash
# קריטיים — בלעדיהם האתר לא עולה
NEXT_PUBLIC_SITE_URL=https://fun-israel.com
NEXT_PUBLIC_WHATSAPP_NUMBER=972509331313
NEXT_PUBLIC_PHONE_NUMBER=050-933-1313
NEXT_PUBLIC_PICKUP_ADDRESS=דרך יבנה 52

# אבטחת אדמין — שנו לפני production
NEXT_PUBLIC_ADMIN_PASSWORD=<סיסמה-חזקה-משלכם>

# מייל — אופציונלי, אם לא מוגדר הטופס עדיין עובד דרך WhatsApp
RESEND_API_KEY=re_...
RESERVATION_NOTIFICATION_EMAIL=zehavialon4@gmail.com
RESERVATION_FROM_EMAIL=FUN-ISRAEL <onboarding@resend.dev>
```

---

## מה אחרי שהדומיין חי

אחרי שהדומיין עולה, הצעדים הבאים הם:

1. **רישום Google Business Profile** — סוף כל סוף יש לכם domain אמיתי
   שאפשר לקשר לעסק.
2. **Search Console + Analytics** — מעקב אחר תנועה, מילות חיפוש,
   ביצועים.
3. **הזמנת תמונות אמיתיות** של הקולקציה, החלפת Unsplash בכל
   `seed-products.ts` / `packages/data.ts` / `articles/seed.ts`.
4. **חיבור הקטלוג ל-CMS** (אם תרצו לעבוד מול backend אמיתי במקום
   localStorage) — Supabase או Sanity מומלצים.
5. **תכנון קמפיין השקה** — מסלול בקהילה, פוסט בקבוצות הורים מקומיות
   ברחובות, פרסום ממומן.

---

> שאלה שלא נענתה כאן? כתבו בוואטסאפ או שלחו מייל ונשמח לעדכן את המדריך.
