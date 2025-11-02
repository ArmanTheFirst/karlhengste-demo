"use client";

import Link from "next/link";

type LinkField = { cached_url?: string; url?: string } | string | null | undefined;

function resolveUrl(u: LinkField): string {
  if (!u) return "/";
  if (typeof u === "string") return u.startsWith("/") ? u : `/${u}`;
  const v = u.cached_url || u.url || "/";
  return v.startsWith("/") ? v : `/${v}`;
}

type FooterCMSProps = {
  blok?: any;
  locale?: string; // Accept but don't use the locale prop to avoid breaking changes
};

export function FooterCMS({ blok }: FooterCMSProps) {
  const links: any[] = Array.isArray(blok?.links) ? blok.links : [];

  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {links.map((l) => {
              const href = resolveUrl(l?.url || "/");
              return (
                <Link 
                  key={l?._uid || l?.label} 
                  href={href} 
                  className="text-sm text-gray-700 hover:underline"
                >
                  {l?.label || "Link"}
                </Link>
              );
            })}
          </div>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Karl Hengste. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
