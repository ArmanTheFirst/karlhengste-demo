"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type LinkField =
  | { cached_url?: string; url?: string }
  | string
  | null
  | undefined;
type NavItem = {
  _uid?: string;
  label?: string;
  url?: LinkField;
  children?: NavItem[];
  icon?: string | null;
};

type LanguageItem = {
  _uid: string;
  name: string;
  slug: string;
  equivalent?: LinkField;
};

type HeaderCMSProps = {
  blok: {
    items?: NavItem[];
    languages?: LanguageItem[];
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

function normalizeLanguageCode(code: string): string {
  if (!code) return '';
  return code.toLowerCase().split('-')[0].trim();
}

function Icon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  if (!name) return null;
  const n = name.toLowerCase();
  switch (n) {
    case "cart":
    case "shopping-cart":
      return (
        <svg
          className={className || "h-4 w-4"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
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
  
  // Only show mobile menu if there are navigation items
  const showMobileMenu = items.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('language-dropdown');
      const button = document.querySelector('[aria-haspopup="true"]');
      
      if (dropdown && button && 
          !dropdown.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        dropdown.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get languages from blok or use default if not provided
  const languages: LanguageItem[] = Array.isArray(blok.languages) && blok.languages.length > 0
    ? blok.languages
    : [
        { _uid: "en", name: "EN", slug: "en" },
        { _uid: "de", name: "DE", slug: "de" },
      ];

  // Debug log to check the received props
  console.log('HeaderCMS - Received props:', { 
    locale, 
    languages: languages.map(lang => ({
      name: lang.name,
      slug: lang.slug,
      normalized: normalizeLanguageCode(lang.slug),
      isCurrent: normalizeLanguageCode(lang.slug) === normalizeLanguageCode(locale || 'en')
    }))
  });

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
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/images/logo.avif"
              alt="Karl Hengste"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <span className="text-lg font-medium tracking-tight text-gray-900">
              Karl Hengste
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => {
              const hasChildren =
                Array.isArray(it.children) && it.children.length > 0;
              const href = withLocalePrefix(locale, resolveUrl(it?.url || "/"));
              const key = String(it?._uid || it?.label || Math.random());
              const isOpen = desktopOpenKey === key;

              if (!hasChildren) {
                return (
                  <Link
                    key={it?._uid || it?.label}
                    href={href}
                    className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-[color:var(--brand)]/10 rounded-md transition-colors"
                  >
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
                    <svg
                      className="h-3.5 w-3.5 opacity-70"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </button>
                  <div
                    className={`absolute left-0 top-full mt-2 min-w-56 rounded-lg border border-gray-200 bg-white shadow-2xl ring-1 ring-black/5 transition ease-out duration-200 ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <ul className="py-2">
                      {it.children!.map((child) => {
                        const chref = withLocalePrefix(
                          locale,
                          resolveUrl(child?.url || "/")
                        );
                        return (
                          <li key={child?._uid || child?.label}>
                            <Link
                              href={chref}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-[color:var(--brand)]/10"
                            >
                              <span className="inline-flex items-center gap-2">
                                <Icon
                                  name={(child as any)?.icon}
                                  className="h-4 w-4 opacity-80"
                                />
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

          {/* Desktop language dropdown */}
          <div className="flex items-center ml-auto">
            {languages.length > 0 && (
              <div className="hidden md:block relative group">
                <button 
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)]/30 rounded-md hover:bg-gray-100 transition-colors"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => {
                    e.stopPropagation();
                    const menu = document.getElementById('language-dropdown');
                    if (menu) menu.classList.toggle('hidden');
                  }}
                >
                  <span>{languages.find(lang => {
                    const cleanSlug = lang.slug ? lang.slug.replace(/^\//, '') : '';
                    return cleanSlug === locale || 
                          normalizeLanguageCode(cleanSlug) === normalizeLanguageCode(locale || 'en');
                  })?.name || locale.toUpperCase()}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  id="language-dropdown" 
                  className="hidden absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1"
                  onMouseLeave={() => {
                    const menu = document.getElementById('language-dropdown');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  {languages.map((lang) => {
                    const cleanSlug = lang.slug ? lang.slug.replace(/^\//, '') : '';
                    const isCurrent = cleanSlug === locale || 
                                    normalizeLanguageCode(cleanSlug) === normalizeLanguageCode(locale || 'en');
                    const href = resolveUrl(lang.equivalent) || `/${lang.slug}`;

                    return (
                      <Link
                        key={lang._uid}
                        href={href}
                        className={`block px-4 py-2 text-sm ${isCurrent 
                          ? 'bg-gray-100 text-[color:var(--brand)] font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => {
                          const menu = document.getElementById('language-dropdown');
                          if (menu) menu.classList.add('hidden');
                        }}
                      >
                        {lang.name || lang.slug.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {showMobileMenu && (
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--brand)] md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/images/logo.avif"
                  alt="Karl Hengste"
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-medium tracking-tight text-gray-900">
                  Karl Hengste
                </span>
              </Link>
              <button
                type="button"
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--brand)]"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            {items.map((it) => {
              const hasChildren =
                Array.isArray(it.children) && it.children.length > 0;
              const href = withLocalePrefix(locale, resolveUrl(it?.url || "/"));
              const key = String(it?._uid || it?.label || Math.random());
              const isExpanded = !!expanded[key];
              return (
                <div key={it?._uid || it?.label} className="mb-1">
                  {hasChildren ? (
                    <button
                      type="button"
                      className="w-full text-left rounded px-4 py-3 text-base text-gray-900 hover:bg-gray-100 inline-flex items-center justify-between"
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`sect-${key}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon name={it?.icon} className="h-5 w-5 opacity-80" />
                        <span>{it?.label || "Menu"}</span>
                      </span>
                      <svg
                        className={`h-5 w-5 transition-transform ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={href}
                      className="block rounded px-4 py-3 text-base text-gray-800 hover:bg-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
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
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-2 mt-1 flex flex-col">
                        {it.children!.map((child) => {
                          const chref = withLocalePrefix(
                            locale,
                            resolveUrl(child?.url || "/")
                          );
                          return (
                            <Link
                              key={child?._uid || child?.label}
                              href={chref}
                              className="block rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="inline-flex items-center gap-2">
                                <Icon
                                  name={(child as any)?.icon}
                                  className="h-4 w-4 opacity-80"
                                />
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
          
          {/* Language Switcher - Fixed at bottom */}
          {languages.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:border-[color:var(--brand)] sm:text-sm rounded-md bg-white"
                  value={locale}
                  onChange={(e) => {
                    const selectedLang = languages.find(lang => {
                      const cleanSlug = lang.slug ? lang.slug.replace(/^\//, '') : '';
                      return cleanSlug === e.target.value;
                    });
                    if (selectedLang) {
                      const href = resolveUrl(selectedLang.equivalent) || `/${selectedLang.slug}`;
                      window.location.href = href;
                    }
                    setMobileOpen(false);
                  }}
                >
                  {languages.map((lang) => {
                    const cleanSlug = lang.slug ? lang.slug.replace(/^\//, '') : '';
                    return (
                      <option 
                        key={`mobile-${lang._uid}`} 
                        value={cleanSlug}
                      >
                        {lang.name || lang.slug.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
