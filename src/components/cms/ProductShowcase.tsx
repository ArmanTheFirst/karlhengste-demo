"use client";

import { ProductTeaser } from "./ProductTeaser";

type ProductShowcaseBlok = {
  _uid: string;
  component: string;
  title?: string;
  products?: any[];
  // Handle variations
  items?: any[];
};

export function ProductShowcase({ blok }: { blok: ProductShowcaseBlok }) {
  const title = blok.title || "";
  const products = blok.products || blok.items || [];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              {title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any, idx: number) => {
            // Handle both product-teaser blocks and raw product objects
            if (product.component === "product-teaser") {
              return <ProductTeaser key={product._uid || `product-${idx}`} blok={product} />;
            }
            // If it's a raw object without component, wrap it
            return (
              <ProductTeaser
                key={product._uid || `product-${idx}`}
                blok={{ ...product, component: "product-teaser" }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

