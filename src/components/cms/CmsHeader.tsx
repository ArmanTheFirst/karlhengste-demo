"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type LinkField = { cached_url?: string; url?: string } | string | null | undefined;
type NavItem = {
  _uid?: string;
  label?: string;
  url?: LinkField;
  children?: NavItem[];
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

export function CmsHeader({ nav, locale }: { nav: NavItem[]; locale: string }) {
  const items = Array.isArray(nav) ? nav : [];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/images/logo.avif" alt="Karl Hengste" width={36} height={36} className="h-9 w-auto object-contain" />
            <span className={`text-lg font-medium tracking-tight ${isScrolled ? "text-gray-900" : "text-white"}`}>Karl Hengste</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => {
              const hasChildren = Array.isArray(it.children) && it.children.length > 0;
              const href = withLocalePrefix(locale, resolveUrl(it.url || "/"));

              if (!hasChildren) {
                return (
                  <Link
                    key={it._uid || it.label}
                    href={href}
                    className={`px-3 py-2 text-sm transition-colors ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"}`}
                  >
                    <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100">
                      {it.label || "Link"}
                    </span>
                  </Link>
                );
              }

              return (
                <div key={it._uid || it.label} className="relative group">
                  <button
                    className={`px-3 py-2 text-sm inline-flex items-center gap-1 transition-colors ${
                      isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded="false"
                    type="button"
                  >
                    <span>{it.label || "Menu"}</span>
                    <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
                  </button>
                  <div className="invisible absolute left-0 top-full mt-2 min-w-56 rounded-md border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all">
                    <ul className="py-2">
                      {it.children!.map((child) => {
                        const chref = withLocalePrefix(locale, resolveUrl(child.url || "/"));
                        return (
                          <li key={child._uid || child.label}>
                            <Link href={chref} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {child.label || "Link"}
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

          {/* Mobile button */}
          <button
            className={`md:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors ${
              isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
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
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] transform bg-white shadow-xl transition-transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Menü</span>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <nav className="px-2 py-2">
          {items.map((it) => {
            const hasChildren = Array.isArray(it.children) && it.children.length > 0;
            const href = withLocalePrefix(locale, resolveUrl(it.url || "/"));
            return (
              <div key={it._uid || it.label} className="mb-1">
                <Link href={href} className="block rounded px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  {it.label || "Link"}
                </Link>
                {hasChildren && (
                  <div className="ml-3 mt-1 flex flex-col">
                    {it.children!.map((child) => {
                      const chref = withLocalePrefix(locale, resolveUrl(child.url || "/"));
                      return (
                        <Link key={child._uid || child.label} href={chref} className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {child.label || "Link"}
                        </Link>
                      );
                    })}
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
