"use client";

import Image from "next/image";
import Link from "next/link";

type LinkField = { cached_url?: string; url?: string } | string | null | undefined;

type Asset = {
  filename?: string;
  alt?: string;
};

function resolveUrl(u: LinkField): string {
  if (!u) return "/";
  if (typeof u === "string") return u.startsWith("/") ? u : `/${u}`;
  const v = u.cached_url || u.url || "/";
  return v.startsWith("/") ? v : `/${v}`;
}

function withLocalePrefix(locale: string, href: string): string {
  if (!href.startsWith("/")) href = `/${href}`;
  const seg = href.split("/").filter(Boolean);
  if (seg[0] === locale) return href;
  return `/${locale}${href}`;
}

export function IndustryShowcaseCMS({ blok, locale }: { blok: any; locale: string }) {
  const title: string = blok?.title || "";
  const description: string = blok?.description || "";
  const ctaText: string = blok?.cta_text || "Learn more";
  const ctaUrl: string = withLocalePrefix(locale, resolveUrl(blok?.cta_url || "/"));

  // Accept either an array `images` or individual image fields
  const images: Asset[] = Array.isArray(blok?.images)
    ? blok.images
    : [blok?.image1, blok?.image2, blok?.image3, blok?.image4].filter(Boolean);

  const safeImages = images.slice(0, 4);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Text side */}
        <div>
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-base sm:text-lg leading-7 text-gray-700 whitespace-pre-line">
              {description}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={ctaUrl}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white bg-[color:var(--brand)] hover:brightness-95 active:brightness-90 transition"
            >
              {ctaText}
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"/></svg>
            </Link>
          </div>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
          {safeImages.map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              {img?.filename ? (
                <Image
                  src={img.filename}
                  alt={img.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">Image</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
