import { Card } from "../ui/card";
import { Button } from "../ui/button";
import * as LucideIcons from "lucide-react";

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

type AdvantageItem = {
  _uid: string;
  component: string;
  icon: keyof typeof LucideIcons;
  title: string;
  description: string;
  _editable?: string;
};

type ProductItem = {
  _uid: string;
  component: string;
  title: string;
  description: string;
  cta?: CTA[];
  _editable?: string;
};

type ProductsBlock = {
  _uid: string;
  component: string;
  title: string;
  footer: string;
  products: ProductItem[];
  _editable?: string;
};

type ShopPromoBlok = {
  _uid: string;
  component: string;
  bubble?: string;
  title: string;
  description: string;
  advantages: AdvantageItem[];
  first_cta?: CTA[];
  second_cta?: CTA[];
  products_section: ProductsBlock[];
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "#";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "#";
};

const ProductCard = ({ product }: { product: ProductItem }) => {
  const hasCta = product.cta?.[0]?.text;

  return (
    <div className="group relative p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h4 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-[color:var(--brand)] transition-colors">
            {product.title}
          </h4>
          <p className="mt-1 sm:mt-1.5 text-gray-600 text-xs sm:text-sm leading-relaxed">{product.description}</p>
        </div>
        {hasCta && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-50">
            <a
              href={resolveLink(product.cta?.[0].link)}
              className="inline-flex items-center text-xs sm:text-sm font-medium text-[color:var(--brand)] hover:text-[color:var(--brand-dark)] group/cta"
            >
              {product.cta?.[0].text}
              <LucideIcons.ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1 flex-shrink-0" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export function ShopPromoCMS({
  blok,
  locale,
}: {
  blok: ShopPromoBlok;
  locale: string;
}) {
  const IconComponent = ({ name }: { name: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.ShoppingCart;
    return (
      <div className="p-1.5 bg-gray-50 rounded-md text-[color:var(--brand)]">
        <Icon className="h-4 w-4" />
      </div>
    );
  };

  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-start">
          <div className="relative">
            {blok.bubble && (
              <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium mb-4 sm:mb-5 text-gray-700 border border-gray-100">
                <LucideIcons.ShoppingCart className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                <span>{blok.bubble}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-2.5xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
              {blok.title}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              {blok.description}
            </p>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-6 sm:mb-8">
              {blok.advantages?.map((advantage) => (
                <div
                  key={advantage._uid}
                  className="group relative p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <IconComponent name={advantage.icon} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-[0.9375rem] font-medium text-gray-900 group-hover:text-[color:var(--brand)] transition-colors">
                        {advantage.title}
                      </h3>
                      <p className="mt-1 text-gray-500 text-xs sm:text-sm leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {blok.first_cta?.[0]?.text && (
                <a
                  href={resolveLink(blok.first_cta[0].link)}
                  className="inline-flex items-center justify-center px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[color:var(--brand)] rounded-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand)] whitespace-nowrap"
                >
                  {blok.first_cta[0].text}
                  <LucideIcons.ArrowRight className="ml-1.5 h-3.5 w-3.5 text-white flex-shrink-0" />
                </a>
              )}
              {blok.second_cta?.[0]?.text && (
                <a
                  href={resolveLink(blok.second_cta[0].link)}
                  className="inline-flex items-center justify-center px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 whitespace-nowrap"
                >
                  {blok.second_cta[0].text}
                </a>
              )}
            </div>
          </div>

          {blok.products_section?.[0] && (
            <div className="relative mt-8 sm:mt-0">
              <div className="lg:sticky lg:top-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      {blok.products_section[0].title}
                    </h3>

                    <div className="space-y-2.5 sm:space-y-3">
                      {blok.products_section[0].products?.map((product) => (
                        <ProductCard key={product._uid} product={product} />
                      ))}
                    </div>

                    {blok.products_section[0].footer && (
                      <p className="mt-3 sm:mt-4 text-xs text-gray-500 text-center">
                        {blok.products_section[0].footer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
