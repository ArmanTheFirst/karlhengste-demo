import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, MousePointer, MapPin, Clock, ArrowRight } from "lucide-react";

const features = [
  {
    icon: MousePointer,
    title: "3-Klick-Bestellung",
    description: "Artikel wählen, Menge eingeben, bestellen – so einfach geht's",
  },
  {
    icon: MapPin,
    title: "Adress-Autovervollständigung",
    description: "Schnellere Eingabe durch intelligente Adresserkennung",
  },
  {
    icon: Clock,
    title: "Express-Lieferung",
    description: "Standardteile innerhalb 24-48h bei Ihnen vor Ort",
  },
];

interface ShopPromoProps {
  visitorType: "B2B" | "B2C";
}

export function ShopPromo({ visitorType }: ShopPromoProps) {
  return (
    <section className="py-32 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-sm mb-6 text-gray-700">
              <ShoppingCart className="h-4 w-4" />
              <span>Neu: Online-Shop</span>
            </div>
            
            <h2 className="text-gray-900 mb-6">
              {visitorType === "B2B" ? (
                <>Industriequalität.<br />Sofort verfügbar.</>
              ) : (
                <>Einfach online<br />bestellen.</>
              )}
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {visitorType === "B2B" ? (
                <>
                  Über 2.500 Präzisionsbauteile auf Lager. Express-Versand innerhalb 24h. 
                  Unser B2B-Shop bietet professionelle Beschaffung ohne Kompromisse – 
                  inklusive Gastbestellung für maximale Effizienz.
                </>
              ) : (
                <>
                  Über 2.500 Metallprodukte direkt vom Hersteller. Schneller Versand, 
                  sichere Zahlung und einfache Bestellung – auch ohne Registrierung. 
                  Bestellen Sie hochwertige Metallwaren zu fairen Preisen.
                </>
              )}
            </p>

            <div className="grid gap-5 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                Zum Shop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 transition-all hover:scale-105">
                Als Gast bestellen
              </Button>
            </div>
          </div>

          <div>
            <Card className="p-8 bg-gray-50 border border-gray-200">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Beliebt bei B2B-Kunden:</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-900 transition-colors cursor-pointer">
                  <div>
                    <div className="text-gray-900 mb-1">Edelstahl-Bleche</div>
                    <p className="text-gray-600 text-sm">Verschiedene Stärken & Formate</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-700">
                    Ansehen
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-900 transition-colors cursor-pointer">
                  <div>
                    <div className="text-gray-900 mb-1">Aluminiumprofile</div>
                    <p className="text-gray-600 text-sm">Standard & Sondermaße</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-700">
                    Ansehen
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-900 transition-colors cursor-pointer">
                  <div>
                    <div className="text-gray-900 mb-1">Stahlprofile</div>
                    <p className="text-gray-600 text-sm">Normgerechte Qualität</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-700">
                    Ansehen
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Über 2.500 Standardteile auf Lager – sofort lieferbar
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
