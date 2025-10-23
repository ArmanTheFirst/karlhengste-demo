type FeatureBlok = {
  _uid: string;
  component: string;
  title?: string;
  name?: string; // some spaces use `name` instead of `title`
  description?: string;
  text?: string; // alternative field name
  icon?: string;
  image?: {
    filename?: string;
    alt?: string;
  };
};

export function Feature({ blok }: { blok: FeatureBlok }) {
  const title = blok.title || blok.name || "Feature";
  const desc = blok.description || blok.text || "";
  const img = blok.image?.filename;

  return (
    <article className="rounded-lg border border-gray-200 p-6 bg-white shadow-sm h-full">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={blok.image?.alt || title}
          className="w-12 h-12 object-cover rounded mb-4"
        />
      ) : null}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {desc ? <p className="text-gray-600 text-sm">{desc}</p> : null}
    </article>
  );
}
