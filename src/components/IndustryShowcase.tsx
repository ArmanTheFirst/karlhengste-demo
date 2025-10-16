import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface IndustryShowcaseProps {
  visitorType: "B2B" | "B2C";
}

export function IndustryShowcase({ visitorType }: IndustryShowcaseProps) {
  return (
    <section className="py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-white mb-6">
              {visitorType === "B2B" ? "Vertrauen der weltgrößten Konzerne" : "Qualität seit über einem Jahrhundert"}
            </h2>
            {visitorType === "B2B" ? (
              <>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Unsere Bauteile bewegen sich in Fahrzeugen führender Automobilhersteller, 
                  sichern kritische Infrastruktur in Energieanlagen und ermöglichen 
                  Innovationen in der Luft- und Raumfahrtindustrie.
                </p>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Mit über 110 Jahren Erfahrung und kontinuierlicher Innovation haben wir 
                  uns als unverzichtbarer Partner für Unternehmen etabliert, die auf 
                  absolute Präzision und termingerechte Lieferung angewiesen sind.
                </p>
              </>
            ) : (
              <>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Die gleiche Präzision und Qualität, mit der wir führende Industrieunternehmen 
                  beliefern, steckt auch in unseren Produkten für Privatkunden. Jedes Teil wird 
                  mit der gleichen Sorgfalt gefertigt.
                </p>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Von Metallzäunen über Geländer bis zu individuellen Metallarbeiten – 
                  profitieren Sie von über 110 Jahren Fertigungsexpertise und bestellen Sie 
                  direkt ab Werk zu fairen Preisen.
                </p>
              </>
            )}
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 transition-all hover:scale-105"
            >
              {visitorType === "B2B" ? "Referenzprojekte ansehen" : "Produktkatalog ansehen"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759847552281-60e45956124d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbHdvcmtpbmclMjBwcmVjaXNpb258ZW58MXx8fHwxNzYwNTM1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Precision metalworking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1707330266686-109c087163eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRlYW0lMjBmYWN0b3J5fGVufDF8fHx8MTc2MDUzNTEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Engineering team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759579483398-552ea6dd4b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NjA1MDIzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Industrial facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjA1MDg0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Manufacturing process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
