import { ImageWithFallback } from "./figma/ImageWithFallback";

const capabilities = [
  {
    title: "CNC-Bearbeitung",
    description: "Modernste 5-Achs-Bearbeitung",
    image: "https://images.unsplash.com/photo-1759621165667-da064b86fdd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBtZXRhbHdvcmt8ZW58MXx8fHwxNzYwNTMzOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Lasertechnologie",
    description: "Präzises Schneiden bis 25mm",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjA1MDg0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Blechbearbeitung",
    description: "Abkanten, Stanzen, Tiefziehen",
    image: "https://images.unsplash.com/photo-1758269445774-61a540a290a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYWN0b3J5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjA0NzI5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Montage & Logistik",
    description: "Just-in-Time Lieferung",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NjA1MjgxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

interface ProductBreadthProps {
  visitorType: "B2B" | "B2C";
}

export function ProductBreadth({ visitorType }: ProductBreadthProps) {
  return (
    <section className="py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="mb-6 text-gray-900">
            {visitorType === "B2B" ? "Vollumfängliche Fertigungskompetenz" : "Unsere Leistungen"}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {visitorType === "B2B" ? (
              <>
                Von der Einzelteilfertigung bis zur automatisierten Serienfertigung mit 
                Millionen Bauteilen jährlich – wir meistern jede Herausforderung mit 
                modernster Technologie und kompromissloser Qualität.
              </>
            ) : (
              <>
                Modernste Fertigungstechnologie für Ihre individuellen Anforderungen. 
                Von der Beratung über die Fertigung bis zur Lieferung – alles aus einer Hand.
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability) => (
            <div key={capability.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-square border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <ImageWithFallback
                  src={capability.image}
                  alt={capability.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 transform group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white mb-2">{capability.title}</h3>
                  <p className="text-white/90 text-sm">{capability.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
