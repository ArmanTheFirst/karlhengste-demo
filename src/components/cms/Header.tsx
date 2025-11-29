"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Storyblok-compatible types (must match previous shapes)
type LinkField =
  | { cached_url?: string; url?: string }
  | string
  | null
  | undefined;

export type NavItem = {
  _uid?: string;
  label?: string;
  url?: LinkField;
  children?: NavItem[];
  icon?: string | null;
  isMegaMenu?: boolean;
};

export type LanguageItem = {
  _uid: string;
  name: string;
  slug: string;
  equivalent?: LinkField;
};

export type HeaderCMSProps = {
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
  if (!code) return "";
  return code.toLowerCase().split("-")[0].trim();
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

  // Desktop hover/click open tracking
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
  const hoveredItem = useRef<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile/Menu State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStack, setMobileStack] = useState<
    { title?: string; items: NavItem[] }[]
  >([]);
  // Desktop panel stack (for the right side of the full screen menu)
  const [selectedCategory, setSelectedCategory] = useState<NavItem | null>(
    items[0] || null
  );

  // Misc
  const pathname = usePathname();
  const router = useRouter();

  // Languages
  const languages: LanguageItem[] =
    Array.isArray(blok?.languages) && blok.languages.length > 0
      ? blok.languages
      : [
          { _uid: "en", name: "EN", slug: "en" },
          { _uid: "de", name: "DE", slug: "de" },
        ];

  // Close desktop menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll(
        ".dropdown-menu, #language-dropdown"
      );
      const buttons = document.querySelectorAll('[aria-haspopup="true"]');
      let shouldClose = true;
      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target as Node)) shouldClose = false;
      });
      buttons.forEach((button) => {
        if (button.contains(event.target as Node)) shouldClose = false;
      });
      if (shouldClose) setDesktopOpenKey(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll when mobile menu is open and reset stack
  useEffect(() => {
    const body = document.body;
    if (mobileOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      setMobileStack([]);
      // Reset desktop selection when opening menu
      if (items.length > 0) setSelectedCategory(items[0]);
      
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [mobileOpen, items]);

  const showMobileMenu = items.length > 0;

  // Optimized Animation Variants (Spring Physics)
  const menuVariants = {
    closed: {
      clipPath: "inset(0 0 100% 0)",
      transition: { type: "spring", stiffness: 300, damping: 30 } as const,
    },
    open: {
      clipPath: "inset(0 0 0% 0)",
      transition: { type: "spring", stiffness: 200, damping: 25 } as const,
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } as const },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-[family-name:var(--font-manrope)] ${
        mobileOpen
          ? "bg-[color:var(--brand-modern)] text-[color:var(--brand-contrast)]"
          : "bg-white/90 backdrop-blur-xl text-[color:var(--brand-modern)] border-b border-black/5 shadow-sm"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8">
        <div className="flex items-center h-24 gap-8">
          {/* Logo */}
          <Link
            href={withLocalePrefix(locale, "/")}
            className="flex items-center gap-4 group z-50 relative"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative overflow-hidden rounded-sm shadow-sm transition-transform duration-300 group-hover:scale-105 bg-white">
              <Image
                src="/images/logo.avif"
                alt="Logo"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-colors ${
                mobileOpen
                  ? "text-[color:var(--brand-contrast)]"
                  : "text-[color:var(--brand-modern)]"
              }`}
            >
              Karl Hengste
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right controls: menu toggle */}
          <div className="flex items-center gap-6 z-50 relative">
             {/* Language Switcher (Visible on Desktop Header when menu is closed) */}
             {!mobileOpen && (
              <div className="hidden md:flex items-center gap-4 mr-4">
                 <select
                    className="bg-transparent text-sm font-bold text-[color:var(--brand-modern)] focus:outline-none cursor-pointer uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity"
                    value={(
                      languages.find(
                        (l) => l.slug.replace(/^\//, "") === locale
                      )?.slug || locale
                    ).replace(/^\//, "")}
                    onChange={(e) => {
                      const target = e.target.value;
                      const href = resolveUrl({ cached_url: target });
                      window.location.href = href.startsWith("/")
                        ? href
                        : `/${target}`;
                    }}
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang._uid}
                        value={(lang.slug || "").replace(/^\//, "")}
                        className="text-black"
                      >
                        {lang.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
              </div>
             )}

            {showMobileMenu && (
              <button
                type="button"
                className={`group relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 focus:outline-none ${
                  mobileOpen
                    ? "text-white hover:bg-white/10"
                    : "text-[color:var(--brand-modern)] hover:bg-[color:var(--brand-modern)]/5"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation"
              >
                <span className={`text-sm font-bold mr-3 uppercase tracking-widest ${mobileOpen ? "text-white" : "text-[color:var(--brand-modern)]"}`}>
                  {mobileOpen ? "Close" : "Menu"}
                </span>
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    mobileOpen ? "border-white/30 bg-white/10" : "border-[color:var(--brand-modern)]/20"
                }`}>
                    <AnimatePresence mode="wait">
                    {mobileOpen ? (
                        <motion.svg
                        key="close"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                        </motion.svg>
                    ) : (
                        <motion.svg
                        key="menu"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8h16M4 16h16"
                        />
                        </motion.svg>
                    )}
                    </AnimatePresence>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Menu Container */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-0 z-40 bg-[color:var(--brand-modern)] text-white pt-24 will-change-transform"
          >
            {/* Desktop Layout (Full Screen) */}
            <div className="hidden md:flex h-full w-full max-w-[1920px] mx-auto">
                {/* Left Sidebar: Top Level Navigation */}
                <div className="w-1/3 lg:w-1/4 h-full border-r border-white/10 flex flex-col p-8 lg:p-12 overflow-y-auto">
                    <nav className="space-y-1">
                        {items.map((item, index) => {
                            const isActive = selectedCategory?._uid === item._uid || selectedCategory?.label === item.label;
                            return (
                                <button
                                    key={(item._uid || item.label || "") + index}
                                    onClick={() => setSelectedCategory(item)}
                                    className={`w-full text-left text-3xl lg:text-4xl font-bold py-4 transition-all duration-200 tracking-tight ${
                                        isActive 
                                          ? "text-white opacity-100 pl-4 border-l-4 border-white" 
                                          : "text-white opacity-60 hover:opacity-100 pl-0 border-l-0 border-transparent"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Right Panel: Content */}
                <div className="flex-1 h-full bg-black/10 p-12 lg:p-20 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {selectedCategory && (
                            <motion.div
                                key={selectedCategory.label}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={contentVariants}
                                className="max-w-4xl"
                            >
                                <div className="flex items-center gap-4 mb-12 opacity-50">
                                    <Icon name={selectedCategory.icon} className="h-8 w-8" />
                                    <span className="text-sm font-bold uppercase tracking-widest">
                                        {selectedCategory.label}
                                    </span>
                                </div>

                                {selectedCategory.children && selectedCategory.children.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                        {selectedCategory.children.map((child, idx) => (
                                            <Link
                                                key={idx}
                                                href={withLocalePrefix(locale, resolveUrl(child.url || "/"))}
                                                className="group block"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-[color:var(--brand-contrast)] transition-colors flex items-center gap-2 tracking-tight">
                                                    {child.label}
                                                    <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </h3>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-start gap-6">
                                        <h2 className="text-5xl font-extrabold leading-tight tracking-tighter">
                                            {selectedCategory.label}
                                        </h2>
                                        <Link
                                            href={withLocalePrefix(locale, resolveUrl(selectedCategory.url || "/"))}
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[color:var(--brand-modern)] rounded-full font-bold hover:bg-white/90 transition-colors"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden h-full flex flex-col">
                 <div className="flex-1 overflow-y-auto px-6 pb-24">
                    <AnimatePresence mode="popLayout">
                        {mobileStack.length > 0 ? (
                             <motion.div
                                key="submenu"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                             >
                                <button
                                    onClick={() => setMobileStack(s => s.slice(0, -1))}
                                    className="flex items-center gap-2 text-white/60 hover:text-white mb-8 pt-4"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h2 className="text-3xl font-bold mb-8 tracking-tight">{mobileStack[mobileStack.length - 1].title}</h2>
                                <div className="space-y-4">
                                    {mobileStack[mobileStack.length - 1].items.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={withLocalePrefix(locale, resolveUrl(item.url || "/"))}
                                            className="block p-4 rounded-xl bg-white/5 border border-white/5"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <span className="text-lg font-bold tracking-tight">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                             </motion.div>
                        ) : (
                            <motion.div
                                key="root"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-2 pt-4"
                            >
                                {items.map((item, idx) => {
                                    const hasChildren = item.children && item.children.length > 0;
                                    return (
                                        <div key={idx}>
                                            {hasChildren ? (
                                                <button
                                                    onClick={() => setMobileStack(s => [...s, { title: item.label, items: item.children || [] }])}
                                                    className="w-full flex items-center justify-between py-4 border-b border-white/10 text-2xl font-bold tracking-tight"
                                                >
                                                    {item.label}
                                                    <svg className="w-6 h-6 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <Link
                                                    href={withLocalePrefix(locale, resolveUrl(item.url || "/"))}
                                                    className="block py-4 border-b border-white/10 text-2xl font-bold tracking-tight"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </div>

                 {/* Mobile Footer with Language Switcher */}
                 <div className="p-6 border-t border-white/10 bg-black/20">
                    <div className="flex items-center justify-between">
                         <div className="flex gap-4">
                            {languages.map((lang) => (
                                <button
                                    key={lang._uid}
                                    onClick={() => {
                                        const href = resolveUrl({ cached_url: lang.slug });
                                        window.location.href = href.startsWith("/") ? href : `/${lang.slug}`;
                                    }}
                                    className={`text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${
                                        (lang.slug.replace(/^\//, "") === locale) 
                                        ? "bg-white text-[color:var(--brand-modern)] border-white" 
                                        : "text-white border-white/30"
                                    }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                         </div>
                    </div>
                 </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
