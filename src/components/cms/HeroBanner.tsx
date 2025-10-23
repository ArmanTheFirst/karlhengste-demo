import { Badge } from "../ui/badge";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type LinkField =
  | {
      id?: string;
      url?: string;
      linktype?: string;
      fieldtype?: string;
      cached_url?: string;
      [key: string]: any;
    }
  | string
  | null
  | undefined;

type CTA = {
  _uid: string;
  component: string;
  text: string;
  link: LinkField;
  _editable?: string;
};

type CTABlock = {
  _uid: string;
  component: string;
  text?: string;
  link?: LinkField;
  _editable?: string;
};

type HeroBannerBlok = {
  _uid: string;
  component: string;
  title?: string;
  description?: string;
  first_cta?: CTABlock[];
  second_cta?: CTABlock[];
  bubble?: string;
  customers?: string;
  customers_number?: string;
  years?: string;
  years_number?: string;
  satisfaction?: string;
  satisfaction_number?: string;
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "#";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "#";
};

export function HeroBanner({ blok }: { blok: HeroBannerBlok }) {
  const headline = blok.title || "Untitled Hero";
  const description = blok.description || "Untitled description";
  const bubble = blok.bubble || "";
  const customers = blok.customers || "";
  const customers_number = blok.customers_number || "";
  const years = blok.years || "";
  const years_number = blok.years_number || "";
  const satisfaction = blok.satisfaction || "";
  const satisfaction_number = blok.satisfaction_number || "";

  return (
    <div className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/17912075/17912075-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <img
            src="https://images.unsplash.com/photo-1656466444029-472b105b1c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2MDUzMTA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Industrial manufacturing"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 pt-32 sm:pt-36 md:pt-40">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-8 bg-white/10 backdrop-blur-sm border-white/30 text-white px-5 py-2"
          >
            {bubble}
          </Badge>

          <h1 className="text-white mb-8 tracking-tight text-4xl md:text-6xl lg:text-7xl">
            {headline}
          </h1>

          <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="w-full max-w-2xl mx-auto mb-12 sm:mb-16 mt-8">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {blok.first_cta?.[0]?.text && (
                <a
                  href={resolveLink(blok.first_cta[0].link)}
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 text-sm sm:text-base font-medium text-gray-900 bg-white rounded-md shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
                >
                  <span className="relative z-10 flex items-center">
                    {blok.first_cta[0].text}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </a>
              )}
              {blok.second_cta?.[0]?.text && (
                <a
                  href={resolveLink(blok.second_cta[0].link)}
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 text-sm sm:text-base font-medium text-white border border-white/50 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white/30"
                >
                  <span className="relative z-10 flex items-center">
                    {blok.second_cta[0].text}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto pt-10 sm:pt-12 border-t border-white/20">
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">
                {customers}
              </div>
              <p className="text-white/80 text-sm md:text-base">
                {customers_number}
              </p>
            </div>
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">
                {years}
              </div>
              <p className="text-white/80 text-sm md:text-base">
                {years_number}
              </p>
            </div>
            <div>
              <div className="text-white text-5xl md:text-6xl mb-2">
                {satisfaction}
              </div>
              <p className="text-white/80 text-sm md:text-base">
                {satisfaction_number}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
