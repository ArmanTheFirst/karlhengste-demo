import { Card } from "./ui/card";
import { Factory, Car, Cpu, Building2, Zap } from "lucide-react";

const industries = [
  {
    icon: Car,
    title: "Automotive",
    description: "Präzisionsteile für Fahrzeugindustrie",
  },
  {
    icon: Factory,
    title: "Maschinenbau",
    description: "Komplexe Baugruppen & Komponenten",
  },
  {
    icon: Cpu,
    title: "Elektrotechnik",
    description: "Gehäuse & Schaltschränke",
  },
  {
    icon: Building2,
    title: "Architektur",
    description: "Fassadenelemente & Metallbau",
  },
  {
    icon: Zap,
    title: "Energie",
    description: "Komponenten für erneuerbare Energien",
  },
];

interface IndustryTilesProps {
  visitorType: "B2B" | "B2C";
}

export function IndustryTiles({ visitorType }: IndustryTilesProps) {
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="mb-6 text-gray-900">
            {visitorType === "B2B" ? "Führend in allen Schlüsselindustrien" : "Branchen & Anwendungen"}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {visitorType === "B2B" ? (
              <>
                Von der Automobilindustrie bis zur Energiewirtschaft – wir sind der bevorzugte 
                Fertigungspartner für Marktführer, die keine Kompromisse eingehen.
              </>
            ) : (
              <>
                Unsere Metallprodukte finden in verschiedensten Bereichen Anwendung – 
                von Heim und Garten bis zu professionellen Projekten.
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((industry) => (
            <Card 
              key={industry.title}
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-gray-900 hover:-translate-y-1 bg-white"
            >
              <div className="mb-4 inline-flex p-3 bg-gray-50 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                <industry.icon className="h-6 w-6" />
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
