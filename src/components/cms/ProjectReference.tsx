"use client";

import Image from "next/image";
import Link from "next/link";

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

type LinkField =
  | {
      cached_url?: string;
      url?: string;
    }
  | string
  | null
  | undefined;

type ProjectReferenceBlok = {
  _uid: string;
  component: string;
  title?: string;
  description?: string;
  image?: Asset;
  link?: LinkField;
  // Handle variations
  summary?: string;
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "#";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "#";
};

export function ProjectReference({ blok }: { blok: ProjectReferenceBlok }) {
  const title = blok.title || "";
  const description = blok.description || blok.summary || "";
  const image = blok.image;
  const link = blok.link;
  
  const imageUrl = resolveImageUrl(image);

  const content = (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-500">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
            Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          {title && <h3 className="text-white mb-2 font-semibold text-lg">{title}</h3>}
          {description && <p className="text-white/90 text-sm line-clamp-2">{description}</p>}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={resolveLink(link)}>{content}</Link>;
  }

  return content;
}

