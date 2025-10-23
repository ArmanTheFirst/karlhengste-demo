"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type LinkField = { cached_url?: string; url?: string } | string | null | undefined;

function resolveUrl(u: LinkField): string {
  if (!u) return "/";
  if (typeof u === "string") return u.startsWith("/") ? u : `/${u}`;
  const v = u.cached_url || u.url || "/";
  return v.startsWith("/") ? v : `/${v}`;
}

export function FooterCMS({ blok, locale }: { blok?: any; locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: string) {
    const p = pathname || "/";
    const seg = p.split("/").filter(Boolean);
    if (seg.length > 0 && (seg[0] === "en" || seg[0] === "de")) {
      seg[0] = target;
    } else {
      seg.unshift(target);
    }
    const next = "/" + seg.join("/");
    const y = typeof window !== "undefined" ? Math.max(0, Math.round(window.scrollY)) : 0;
    router.push(`${next}#y-${y}`, { scroll: false });
  }

  const links: any[] = Array.isArray(blok?.links) ? blok.links : [];
  const languages: any[] = Array.isArray(blok?.languages) ? blok.languages : [];

  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {links.map((l) => {
              const href = resolveUrl(l?.url || "/");
              return (
                <Link key={l?._uid || l?.label} href={href} className="text-sm text-gray-700 hover:underline">
                  {l?.label || "Link"}
                </Link>
              );
            })}
          </div>
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Karl Hengste. All rights reserved.</div>
        </div>

        {languages.length > 0 && (
          <div className="flex items-center gap-3" aria-label="Language">
            <span className="text-sm text-gray-700">Language</span>
            <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang?._uid || lang?.code}
                  type="button"
                  onClick={() => switchTo(String(lang?.code || "en"))}
                  className={`px-3 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30 ${
                    String(locale) === String(lang?.code)
                      ? "bg-[color:var(--brand)] text-white border-[color:var(--brand)]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={String(locale) === String(lang?.code) ? "page" : undefined}
                >
                  {lang?.label || lang?.code || "Language"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
