"use client";

import Image from "next/image";
import { CTAButton } from "./CTAButton";

type Asset = {
  filename?: string;
  url?: string;
  id?: string | number;
  alt?: string;
  [key: string]: any;
};

// Helper to resolve image URL from Storyblok asset
const resolveImageUrl = (asset: Asset | string | null | undefined): string | null => {
  if (!asset) return null;
  
  if (typeof asset === "string") {
    if (asset.startsWith("http://") || asset.startsWith("https://")) {
      return asset;
    }
    if (asset.includes("/")) {
      return `https://a.storyblok.com/f/${asset}`;
    }
    return null;
  }
  
  if (typeof asset === "object") {
    if (asset.url && (asset.url.startsWith("http://") || asset.url.startsWith("https://"))) {
      return asset.url;
    }
    
    if (asset.filename) {
      if (asset.filename.startsWith("http://") || asset.filename.startsWith("https://")) {
        return asset.filename;
      }
      if (asset.filename.includes("/") || asset.filename.length > 20) {
        return `https://a.storyblok.com/f/${asset.filename}`;
      }
    }
    
    if (asset.id) {
      return `https://a.storyblok.com/f/${asset.id}`;
    }
  }
  
  return null;
};

type ConfiguratorPromoBlok = {
  _uid: string;
  component: string;
  headline?: string;
  description?: any; // richtext
  image?: Asset;
  cta_button?: any[];
  // Handle variations
  title?: string;
  text?: string;
};

export function ConfiguratorPromo({ blok }: { blok: ConfiguratorPromoBlok }) {
  const headline = blok.headline || blok.title || "";
  const description = blok.description;
  const text = blok.text;
  const image = blok.image;
  const ctaButton = blok.cta_button?.[0] || blok.cta_button;
  
  const imageUrl = resolveImageUrl(image);

  // Helper to render richtext or plain text
  const renderDescription = () => {
    if (text) {
      return <p className="text-gray-700 leading-7">{text}</p>;
    }
    if (description) {
      if (typeof description === "string") {
        return <div className="text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: description }} />;
      }
      if (description?.content && Array.isArray(description.content)) {
        const textContent = description.content
          .map((item: any) => item.content?.map((c: any) => c.text || "").join("") || "")
          .join(" ");
        return <p className="text-gray-700 leading-7">{textContent}</p>;
      }
    }
    return null;
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            {headline && (
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
                {headline}
              </h2>
            )}
            {renderDescription()}
            {ctaButton && (
              <div className="mt-8">
                <CTAButton blok={ctaButton} />
              </div>
            )}
          </div>
          {imageUrl && (
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={image?.alt || headline}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

