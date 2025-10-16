import { Button } from "./ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const benefits = [
  "Individuelle Beratung durch Fertigungsexperten",
  "Persönlicher Ansprechpartner für Ihr Projekt",
  "Schnelle Angebotserstellung innerhalb 24h",
  "Flexible Zahlungskonditionen für B2B-Kunden",
  "Langfristige Partnerschaft auf Augenhöhe",
  "Dokumentierte Qualitätssicherung nach DIN EN ISO 9001",
];

interface B2BCredibilityProps {
  visitorType: "B2B" | "B2C";
}

export function B2BCredibility({ visitorType }: B2BCredibilityProps) {
  return (
    <section className="py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm mb-6 text-gray-700">
              {visitorType === "B2B" ? "B2B Excellence" : "Privatkunden"}
            </div>
            <h2 className="mb-6 text-gray-900">
              {visitorType === "B2B" 
                ? "Der bevorzugte Partner der Fortune 500" 
                : "Industriequalität für Privatkunden"}
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {visitorType === "B2B" ? (
                <>
                  Die weltweit führenden Unternehmen vertrauen auf unsere Fertigungsexzellenz. 
                  Mit über 110 Jahren nachgewiesener Zuverlässigkeit, Zero-Defect-Qualität und 
                  strategischer Lieferpartnerschaft setzen wir Maßstäbe in der Industrie.
                </>
              ) : (
                <>
                  Profitieren Sie von der gleichen Qualität, mit der wir führende Industrieunternehmen 
                  beliefern. Faire Preise, schnelle Lieferung und persönliche Beratung – 
                  Metallprodukte direkt vom Hersteller.
                </>
              )}
            </p>

            <div className="grid gap-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                {visitorType === "B2B" ? "Beratungstermin vereinbaren" : "Persönliche Beratung"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-100 transition-all hover:scale-105">
                {visitorType === "B2B" ? "Referenzen ansehen" : "Kundenbewertungen"}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-8 rounded-xl">
                <div className="text-4xl mb-2 text-gray-900">500+</div>
                <p className="text-gray-600 text-sm">Zufriedene B2B-Kunden</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 rounded-xl mt-12">
                <div className="text-4xl mb-2 text-gray-900">98%</div>
                <p className="text-gray-600 text-sm">Kundenzufriedenheit</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 rounded-xl -mt-6">
                <div className="text-4xl mb-2 text-gray-900">24h</div>
                <p className="text-gray-600 text-sm">Angebotserstellung</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 rounded-xl mt-6">
                <div className="text-4xl mb-2 text-gray-900">110</div>
                <p className="text-gray-600 text-sm">Jahre Expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
