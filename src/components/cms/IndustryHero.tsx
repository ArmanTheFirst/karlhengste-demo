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

type IndustryHeroBlok = {
  _uid: string;
  component: string;
  headline?: string;
  subheadline?: string;
  background_image?: Asset;
  cta_button?: any[];
  // Handle variations from the Python script
  title?: string;
  subtitle?: string;
  image?: Asset;
};

export function IndustryHero({ blok }: { blok: IndustryHeroBlok }) {
  const headline = blok.headline || blok.title || "";
  const subheadline = blok.subheadline || blok.subtitle || "";
  const backgroundImage = blok.background_image || blok.image;
  const ctaButton = blok.cta_button?.[0] || blok.cta_button;
  
  const imageUrl = resolveImageUrl(backgroundImage);

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={backgroundImage?.alt || headline}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white mb-6 tracking-tight text-4xl md:text-5xl lg:text-6xl font-semibold">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          )}

          {ctaButton && (
            <div className="mt-8">
              <CTAButton blok={ctaButton} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

