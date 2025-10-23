"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type LinkField = { cached_url?: string; url?: string } | string | null | undefined;
type NavItem = {
  _uid?: string;
  label?: string;
  url?: LinkField;
  children?: NavItem[];
  icon?: string | null;
};

type HeaderCMSProps = {
  blok: {
    items?: NavItem[];
    audience_company_label: string;
    audience_private_label: string;
    [key: string]: any;
  };
  locale: string;
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
  if (seg[0] === locale) return href; // already prefixed
  return `/${locale}${href}`;
}

function Icon({ name, className }: { name?: string | null; className?: string }) {
  if (!name) return null;
  const n = name.toLowerCase();
  switch (n) {
    case "cart":
    case "shopping-cart":
      return (
        <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6" />
        </svg>
      );
    default:
      return null;
  }
}

export function HeaderCMS({ blok, locale }: HeaderCMSProps) {
  const items: NavItem[] = Array.isArray(blok?.items) ? blok.items : [];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const router = useRouter();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [audSel, setAudSel] = useState<0 | 1>(0);

  const audienceCompany = blok.audience_company_label;
  const audiencePrivate = blok.audience_private_label;

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setDesktopOpenKey(null), 180);
  };

  function switchTo(target: "en" | "de") {
    const p = pathname || "/";
    const seg = p.split("/").filter(Boolean);
    if (seg.length > 0 && (seg[0] === "en" || seg[0] === "de")) {
      seg[0] = target;
    } else {
      seg.unshift(target);
    }
    const next = "/" + seg.join("/");
    router.push(next);
    setMobileOpen(false);
  }

  // Lock scroll when mobile menu is open
  useEffect(() => {
    const body = document.body;
    if (mobileOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm" role="navigation" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/images/logo.avif" alt="Karl Hengste" width={36} height={36} className="h-9 w-auto object-contain" />
            <span className="text-lg font-medium tracking-tight text-gray-900">Karl Hengste</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => {
              const hasChildren = Array.isArray(it.children) && it.children.length > 0;
              const href = withLocalePrefix(locale, resolveUrl(it?.url || "/"));
              const key = String(it?._uid || it?.label || Math.random());
              const isOpen = desktopOpenKey === key;

              if (!hasChildren) {
                return (
                  <Link key={it?._uid || it?.label} href={href} className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-[color:var(--brand)]/10 rounded-md transition-colors">
                    <span className="flex items-center gap-2">
                      <Icon name={it?.icon} className="h-4 w-4 opacity-80" />
                      <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:scale-x-0 after:bg-[color:var(--brand)] after:transition-transform hover:after:scale-x-100">
                        {it?.label || "Link"}
                      </span>
                    </span>
                  </Link>
                );
              }

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setDesktopOpenKey(key);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className="px-3 py-2 text-sm inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    type="button"
                    onFocus={() => setDesktopOpenKey(key)}
                    onBlur={scheduleClose}
                  >
                    <span className="flex items-center gap-2">
                      <Icon name={it?.icon} className="h-4 w-4 opacity-80" />
                      <span>{it?.label || "Menu"}</span>
                    </span>
                    <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
                  </button>
                  <div
                    className={`absolute left-0 top-full mt-2 min-w-56 rounded-lg border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5 transition ease-out duration-200 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <ul className="py-2">
                      {it.children!.map((child) => {
                        const chref = withLocalePrefix(locale, resolveUrl(child?.url || "/"));
                        return (
                          <li key={child?._uid || child?.label}>
                            <Link href={chref} className="block px-3 py-2 text-sm text-gray-700 hover:bg-[color:var(--brand)]/10">
                              <span className="inline-flex items-center gap-2">
                                <Icon name={(child as any)?.icon} className="h-4 w-4 opacity-80" />
                                <span>{child?.label || "Link"}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Audience switcher (desktop, non-functional demo) */}
          <div className="hidden md:flex items-center gap-3 ml-auto mr-2">
            <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                type="button"
                onClick={() => setAudSel(0)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  audSel === 0 ? "bg-[color:var(--brand)] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-pressed={audSel === 0}
              >
                {audienceCompany}
              </button>
              <button
                type="button"
                onClick={() => setAudSel(1)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  audSel === 1 ? "bg-[color:var(--brand)] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-pressed={audSel === 1}
              >
                {audiencePrivate}
              </button>
            </div>
          </div>


          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-screen max-w-none transform bg-white shadow-2xl transition-transform border-t-4 border-[color:var(--brand)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <Image src="/images/logo.avif" alt="Karl Hengste" width={28} height={28} className="h-7 w-auto object-contain" />
            <span className="text-base font-medium text-gray-900">Karl Hengste</span>
          </Link>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Audience switcher (mobile, non-functional demo) */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden w-full">
            <button
              type="button"
              onClick={() => setAudSel(0)}
              className={`flex-1 px-4 py-2 text-sm transition-colors ${
                audSel === 0 ? "bg-[color:var(--brand)] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-pressed={audSel === 0}
            >
              {audienceCompany}
            </button>
            <button
              type="button"
              onClick={() => setAudSel(1)}
              className={`flex-1 px-4 py-2 text-sm transition-colors ${
                audSel === 1 ? "bg-[color:var(--brand)] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-pressed={audSel === 1}
            >
              {audiencePrivate}
            </button>
          </div>
        </div>
        <nav className="px-2 py-2">
          {items.map((it) => {
            const hasChildren = Array.isArray(it.children) && it.children.length > 0;
            const href = withLocalePrefix(locale, resolveUrl(it?.url || "/"));
            const key = String(it?._uid || it?.label || Math.random());
            const isExpanded = !!expanded[key];
            return (
              <div key={it?._uid || it?.label} className="mb-1">
                {hasChildren ? (
                  <button
                    type="button"
                    className="w-full text-left rounded px-4 py-3 text-base text-gray-900 hover:bg-gray-100 inline-flex items-center justify-between"
                    onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
                    aria-expanded={isExpanded}
                    aria-controls={`sect-${key}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon name={it?.icon} className="h-5 w-5 opacity-80" />
                      <span>{it?.label || "Menu"}</span>
                    </span>
                    <svg className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
                  </button>
                ) : (
                  <Link href={href} className="block rounded px-4 py-3 text-base text-gray-800 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                    <span className="inline-flex items-center gap-2">
                      <Icon name={it?.icon} className="h-5 w-5 opacity-80" />
                      <span>{it?.label || "Link"}</span>
                    </span>
                  </Link>
                )}
                {hasChildren && (
                  <div
                    id={`sect-${key}`}
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-2 mt-1 flex flex-col">
                      {it.children!.map((child) => {
                        const chref = withLocalePrefix(locale, resolveUrl(child?.url || "/"));
                        return (
                          <Link key={child?._uid || child?.label} href={chref} className="block rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                            <span className="inline-flex items-center gap-2">
                              <Icon name={(child as any)?.icon} className="h-4 w-4 opacity-80" />
                              <span>{child?.label || "Link"}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </header>
  );
}
