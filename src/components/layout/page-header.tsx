interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-blob opacity-60" />
      <div className="container-page py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="heading-1 text-balance">{title}</h1>
          {description && <p className="body-lead">{description}</p>}
        </div>
      </div>
    </section>
  );
}
