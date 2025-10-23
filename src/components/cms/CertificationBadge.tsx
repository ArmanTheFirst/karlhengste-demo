type BadgeItem = {
  _uid: string;
  component: string;
  image?: {
    filename?: string;
    alt?: string;
  };
  title?: string;
};

type CertificationBadgeBlok = {
  _uid: string;
  component: string;
  items?: BadgeItem[]; // array of logos/badges
  headline?: string;
  subline?: string;
};

export function CertificationBadge({ blok }: { blok: CertificationBadgeBlok }) {
  const items: BadgeItem[] = Array.isArray(blok.items) ? blok.items : [];
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {blok.headline ? (
          <h2 className="text-center text-sm font-medium text-gray-500 mb-6">
            {blok.headline}
          </h2>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-80">
          {items.map((it) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={it._uid}
              src={it.image?.filename || "/images/logo.avif"}
              alt={it.image?.alt || it.title || "Badge"}
              className="h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
