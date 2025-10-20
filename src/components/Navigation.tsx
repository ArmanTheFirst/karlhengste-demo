import { Button } from "./ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { title } from "process";

interface NavigationProps {
  visitorType: "B2B" | "B2C";
  setVisitorType: (type: "B2B" | "B2C") => void;
}

export function Navigation({ visitorType, setVisitorType }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const languages = [
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];
  type LanguageCode = "de" | "en" | "fr" | "es" | "it" | "nl" | "pl" | "tr";
  const [language, setLanguage] = useState<LanguageCode>("de");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const companyLinks = [
    {
      title: "Zertifizierungen",
      href: "/unternehmen/zertifizierungen",
      description: "Unsere Zertifizierungen",
    },
    {
      title: "Team",
      href: "/unternehmen/team",
      description: "Unser Team",
    },
    {
      title: "Vision Mission",
      href: "/unternehmen/vision-mission",
      description: "Unsere Vision und Mission",
    },
    {
      title: "Karriere",
      href: "/unternehmen/karriere",
      description: "Unsere Karrieremöglichkeiten",
    },
    {
      title: "Geschichte",
      href: "/unternehmen/geschichte",
      description: "Unsere Geschichte",
    },
  ];

  const industryLinks = [
    {
      title: "Verteidigung",
      href: "/industrie/verteidigung",
      description: "Präzisionsteile für die Verteidigung",
    },
    {
      title: "Medizinindustrie",
      href: "/industrie/medizinindustrie",
      description: "Präzisionsteile für die Medizinindustrie",
    },
    {
      title: "Bauindustrie",
      href: "/industrie/bauindustrie",
      description: "Präzisionsteile für die Bauindustrie",
    },
    {
      title: "Automobilindustrie",
      href: "/industrie/automobilindustrie",
      description: "Präzisionsteile für die Automobilindustrie",
    },
    {
      title: "Allgemeine Industrie",
      href: "/industrie/allgemeine-industrie",
      description: "Präzisionsteile für die Allgemeine Industrie",
    },
  ];

  const productLinks = [
    {
      title: "Sounderloesungen",
      href: "/produkte/sonderloesungen",
      description: "Sonderloesungen",
    },
    {
      title: "Fensterbaenke",
      href: "/produkte/fensterbaenke",
      description: "Fensterbaenke",
    },
    {
      title: "Blech Konfigurator",
      href: "/produkte/blech-konfigurator",
      description: "Blech Konfigurator",
    },
    {
      title: "Balkonverkleidungen",
      href: "/produkte/balkonverkleidungen",
      description: "Balkonverkleidungen",
    },
    {
      title: "Attiken",
      href: "/produkte/attiken",
      description: "Attiken",
    },
  ];

  const knowledgeLinks = [
    {
      title: "Technische Dokumentation",
      href: "#",
      description: "Umfassende Anleitungen & Datenblätter",
    },
    {
      title: "Video-Tutorials",
      href: "#",
      description: "Einblicke in unsere Prozesse",
    },
    {
      title: "Fachartikel",
      href: "#",
      description: "Expertenwissen & Best Practices",
    },
    {
      title: "Downloads",
      href: "#",
      description: "Kataloge & Zertifikate",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/images/logo.avif"
                alt="Karl Hengste Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <span
                className={`text-lg font-medium tracking-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Karl Hengste
              </span>
            </Link>

            {/* Visitor Type Switcher */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setVisitorType("B2B")}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  visitorType === "B2B"
                    ? isScrolled
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900"
                    : isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Für Unternehmen
              </button>
              <span className={isScrolled ? "text-gray-400" : "text-white/50"}>
                /
              </span>
              <button
                onClick={() => setVisitorType("B2C")}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  visitorType === "B2C"
                    ? isScrolled
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900"
                    : isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Privatkunde
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Unternehmen */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${
                      isScrolled ? "text-gray-700" : "text-white"
                    } bg-white/10 hover:bg-white/20`}
                  >
                    Unternehmen
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[400px] gap-3 p-4">
                      {companyLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            >
                              <div className="text-sm leading-none text-gray-900">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Branchen */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${
                      isScrolled ? "text-gray-700" : "text-white"
                    } bg-white/10 hover:bg-white/20`}
                  >
                    Branchen
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {industryLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            >
                              <div className="text-sm leading-none text-gray-900">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Lösungen */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${
                      isScrolled ? "text-gray-700" : "text-white"
                    } bg-white/10 hover:bg-white/20`}
                  >
                    Produkte
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[400px] gap-3 p-4">
                      {productLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            >
                              <div className="text-sm leading-none text-gray-900">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Wissensbereich */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${
                      isScrolled ? "text-gray-700" : "text-white"
                    } bg-white/10 hover:bg-white/20`}
                  >
                    Wissensbereich
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[400px] gap-3 p-4">
                      {knowledgeLinks.map((link) => (
                        <li key={link.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                            >
                              <div className="text-sm leading-none text-gray-900">
                                {link.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                {link.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Shopping Cart Button */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  isScrolled
                    ? "text-gray-900 hover:bg-gray-100"
                    : "text-white bg-white/10 hover:bg-white/20"
                }`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop
              </Button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 focus:outline-none">
                  <span>
                    {languages.find((lang) => lang.code === language)?.flag ||
                      "🌐"}
                    <span className="ml-1">{language.toUpperCase()}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[160px] max-h-60 overflow-y-auto bg-white/95 backdrop-blur-sm border border-gray-200/50 text-gray-800"
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as LanguageCode)}
                      className={`cursor-pointer text-gray-800 hover:bg-gray-100 ${
                        language === lang.code ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
