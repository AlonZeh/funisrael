import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-20 md:py-32 text-center">
      <p className="text-7xl mb-6">🎈</p>
      <h1 className="heading-1">העמוד התעופף</h1>
      <p className="body-lead mt-3 max-w-md mx-auto">
        העמוד שחיפשתם לא נמצא או הוסר. אבל יש לנו המון מתנפחים מחכים לכם בקטלוג.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-ghost">דף הבית</Link>
        <Link href="/catalog" className="btn-brand">לקטלוג</Link>
      </div>
    </section>
  );
}
