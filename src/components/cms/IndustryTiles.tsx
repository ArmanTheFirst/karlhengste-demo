import { Card } from "../ui/card";
import { Factory, Car, Cpu, Building2, Zap } from "lucide-react";

// CMS renderer for IndustryTiles: for now, returns the same UI as the original
// component, ignoring CMS fields. We'll wire CMS fields later.

const defaultIndustries = [
  { icon: Car, title: "Automotive", description: "Präzisionsteile für Fahrzeugindustrie" },
  { icon: Factory, title: "Maschinenbau", description: "Komplexe Baugruppen & Komponenten" },
  { icon: Cpu, title: "Elektrotechnik", description: "Gehäuse & Schaltschränke" },
  { icon: Building2, title: "Architektur", description: "Fassadenelemente & Metallbau" },
  { icon: Zap, title: "Energie", description: "Komponenten für erneuerbare Energien" },
];

const iconMap: Record<string, any> = {
  automotive: Car,
  car: Car,
  maschinenbau: Factory,
  factory: Factory,
  elektrotechnik: Cpu,
  cpu: Cpu,
  architektur: Building2,
  building: Building2,
  energie: Zap,
  energy: Zap,
};

export function IndustryTilesCMS({ blok }: { blok?: any }) {
  const heading = blok?.headline || "Führend in allen Schlüsselindustrien";
  const subText =
    blok?.subline ||
    "Von der Automobilindustrie bis zur Energiewirtschaft – wir sind der bevorzugte Fertigungspartner für Marktführer, die keine Kompromisse eingehen.";

  const cmsItems: any[] = Array.isArray(blok?.items) ? blok!.items : [];
  const items =
    cmsItems.length > 0
      ? cmsItems.map((it) => {
          const raw = String((it.icon || it.title || it.name || "")).toLowerCase();
          const Icon = iconMap[raw] || Car;
          const title = it.title || it.name || "";
          const description = it.text || it.description || "";
          return { icon: Icon, title, description };
        })
      : defaultIndustries;

  return (
    <section className="py-20 sm:py-28 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-gray-900">
            {heading}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{subText}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {items.map((industry) => (
            <Card
              key={industry.title}
              className="h-full p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-[#00863A] hover:-translate-y-1 bg-white"
            >
              <div className="mb-4 inline-flex p-3 bg-gray-50 rounded-lg group-hover:bg-[#00863A] group-hover:text-white transition-all duration-300">
                <industry.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-gray-900">{industry.title}</h3>
              <p className="text-gray-600 text-sm">{industry.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
