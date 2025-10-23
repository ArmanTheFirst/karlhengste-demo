"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";

const iconMap: Record<string, LucideIcon> = {
  "file-text": require("lucide-react").FileText,
  "video": require("lucide-react").Video,
  "book-open": require("lucide-react").BookOpen,
};

type BannerItem = {
  _uid: string;
  icon: string;
  title: string;
  description: string;
  resources: string;
};

type KnowledgeBaseTeaserCMSProps = {
  blok: {
    Title?: string; // Note the capital T to match Storyblok's field name
    description?: string;
    cta_text?: string;
    cta_link?: {
      url?: string;
      cached_url?: string;
      linktype?: string;
      [key: string]: any;
    } | string;
    banners?: BannerItem[];
    component: string;
    _uid: string;
    _editable?: string;
  };
  locale: string;
};

export function KnowledgeBaseTeaserCMS({ blok }: KnowledgeBaseTeaserCMSProps) {
  const { Title: title, description, cta_text, cta_link, banners = [] } = blok;

  if (banners.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {title && (
              <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {description}
              </p>
            )}
            {cta_text && cta_link && (
              <Button 
                asChild
                size="lg" 
                className="bg-[color:var(--brand)] hover:bg-[color:var(--brand)]/90 transition-all hover:scale-105 shadow-lg"
              >
                <a href={typeof cta_link === 'object' ? `/${cta_link.cached_url || ''}` : cta_link}>
                  {cta_text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <div className="grid gap-4">
            {banners.map((banner) => {
              const Icon = iconMap[banner.icon] || iconMap["file-text"];
              return (
                <Card 
                  key={banner._uid}
                  className="p-6 hover:shadow-sm transition-all cursor-pointer group border border-gray-200 hover:border-[color:var(--brand)]/50 hover:ring-1 hover:ring-[color:var(--brand)]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[color:var(--brand)] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-gray-900">{banner.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{banner.description}</p>
                      <p className="text-sm text-gray-900">{banner.resources}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
