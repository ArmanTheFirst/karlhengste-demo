import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  visitorType: "B2B" | "B2C";
}

export function Hero({ visitorType }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/17912075/17912075-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1656466444029-472b105b1c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2MDUzMTA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Industrial manufacturing"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 pt-40">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-8 bg-white/10 backdrop-blur-sm border-white/30 text-white px-5 py-2"
          >
            110 Jahre Industrieführerschaft
          </Badge>

          <h1 className="text-white mb-8 tracking-tight text-4xl md:text-6xl lg:text-7xl">
            BLECHLÖSUNGEN FÜR
            <br />
            INDUSTRIE & ARCHITEKTUR
          </h1>

          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            {visitorType === "B2B" ? (
              <>
                Seit 1915 vertrauen internationale Partner auf unsere Kompetenz
                in der Blechbearbeitung – präzise gefertigt, individuell
                konfigurierbar, termingerecht geliefert.
              </>
            ) : (
              <>
                Seit 1915 vertrauen internationale Partner auf unsere Kompetenz
                in der Blechbearbeitung – präzise gefertigt, individuell
                konfigurierbar, termingerecht geliefert.
              </>
            )}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 transition-all hover:scale-105 shadow-xl text-base px-8 py-6"
            >
              {visitorType === "B2B" ? "Unsere Lösungen" : "Zum Shop"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white bg-white/10 backdrop-blur-sm transition-all hover:scale-105 text-base px-8 py-6"
            >
              {visitorType === "B2B" ? "Beratung anfordern" : "Katalog ansehen"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto pt-12 border-t border-white/20">
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">500+</div>
              <p className="text-white/80 text-sm md:text-base">
                Industriekunden weltweit
              </p>
            </div>
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">110</div>
              <p className="text-white/80 text-sm md:text-base">
                Jahre Innovation
              </p>
            </div>
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">98%</div>
              <p className="text-white/80 text-sm md:text-base">
                Kundenzufriedenheit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
