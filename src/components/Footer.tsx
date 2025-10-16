import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useState } from "react";

interface FooterProps {
  visitorType: "B2B" | "B2C";
}

export function Footer({ visitorType }: FooterProps) {
  const [language, setLanguage] = useState<"DE" | "EN">("DE");

  const toggleLanguage = () => {
    setLanguage(language === "DE" ? "EN" : "DE");
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <span className="text-gray-900">Karl Hengste</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              {language === "DE" 
                ? "Präzisionsblechbearbeitung seit 1915. Ihr Partner für höchste Ansprüche."
                : "Precision sheet metal processing since 1915. Your partner for highest demands."}
            </p>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleLanguage}
                className="text-gray-700 hover:bg-gray-100 -ml-2"
              >
                {language} / {language === "DE" ? "EN" : "DE"}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 mb-4 text-sm">
              {language === "DE" ? "Schnellzugriff" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Über uns" : "About Us"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Leistungen" : "Services"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Branchen" : "Industries"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Karriere" : "Careers"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Kontakt" : "Contact"}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 mb-4 text-sm">
              {language === "DE" ? "Services" : "Services"}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Online-Shop" : "Online Shop"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Wissensbereich" : "Knowledge Base"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Downloads" : "Downloads"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Qualitätszertifikate" : "Quality Certificates"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  {language === "DE" ? "Angebot anfragen" : "Request Quote"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 mb-4 text-sm">
              {language === "DE" ? "Kontakt" : "Contact"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Industriestraße 42<br />
                  45219 Essen, Deutschland
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a href="tel:+4920112345678" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  +49 201 123 456 78
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a href="mailto:info@karl-hengste.de" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  info@karl-hengste.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-200 mb-8" />

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>
            © 2025 Karl Hengste GmbH. {language === "DE" ? "Alle Rechte vorbehalten." : "All rights reserved."}
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">
              {language === "DE" ? "Impressum" : "Imprint"}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {language === "DE" ? "Datenschutz" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {language === "DE" ? "AGB" : "Terms & Conditions"}
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              {language === "DE" ? "Cookie-Einstellungen" : "Cookie Settings"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
