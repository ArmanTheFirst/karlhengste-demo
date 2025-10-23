type TeaserBlok = {
  _uid: string;
  component: string;
  headline?: string;
  subline?: string;
};

export function Teaser({ blok }: { blok: TeaserBlok }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-center">
      {blok.headline && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-gray-900">
          {blok.headline}
        </h2>
      )}
      {blok.subline && (
        <p className="text-gray-600 max-w-3xl mx-auto">{blok.subline}</p>
      )}
    </section>
  );
}
