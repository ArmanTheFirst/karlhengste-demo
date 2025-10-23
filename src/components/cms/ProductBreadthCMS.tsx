"use client";

import Image from "next/image";

type LinkField =
  | { cached_url?: string; url?: string }
  | string
  | null
  | undefined;

type ProductBreadthItem = {
  _uid: string;
  title: string;
  description: string;
  image: {
    filename: string;
    alt?: string;
  };
};

type ProductBreadthCMSProps = {
  blok: {
    title?: string;
    description?: string;
    items?: ProductBreadthItem[];
  };
  locale: string;
};

export function ProductBreadthCMS({ blok, locale }: ProductBreadthCMSProps) {
  const { title, description, items = [] } = blok;
  const safeItems = items.slice(0, 4); // Ensure max 4 items

  return (
    <section className="py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          {title && (
            <h2 className="mb-6 text-gray-900 text-3xl md:text-4xl font-semibold">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeItems.map((item) => (
            <div key={item._uid} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-square border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {item.image?.filename ? (
                  <Image
                    src={item.image.filename}
                    alt={item.image.alt || item.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 transform group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
