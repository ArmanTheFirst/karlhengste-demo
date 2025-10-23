import { Feature } from "./Feature";
import { Teaser } from "./Teaser";
import { HeroBanner } from "./HeroBanner";

// Very lightweight recursive renderer for known child blocks used inside Grid
function renderChild(blok: any) {
  switch (blok?.component) {
    case "feature":
      return <Feature key={blok._uid} blok={blok} />;
    case "teaser":
      return <Teaser key={blok._uid} blok={blok} />;
    case "hero_banner":
      return <HeroBanner key={blok._uid} blok={blok} />;
    default:
      return (
        <section key={blok?._uid || Math.random()} className="max-w-3xl mx-auto px-6 py-8">
          <div className="text-sm text-gray-500 mb-2">Unknown block in grid: <code>{blok?.component}</code></div>
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">{JSON.stringify(blok, null, 2)}</pre>
        </section>
      );
  }
}

export function Grid({ blok }: { blok: any }) {
  const items: any[] = Array.isArray(blok?.columns)
    ? blok.columns
    : Array.isArray(blok?.items)
    ? blok.items
    : [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((child) => (
          <div key={child._uid} className="h-full">
            {renderChild(child)}
          </div>
        ))}
      </div>
    </section>
  );
}
