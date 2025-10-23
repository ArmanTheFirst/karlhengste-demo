"use client";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { CheckCircle } from "lucide-react";

type FactItem = {
  _uid: string;
  value: string;
  label: string;
};

type CTAItem = {
  _uid: string;
  text: string;
  link: string | {
    url?: string;
    cached_url?: string;
    linktype?: string;
    [key: string]: any;
  };
};

type CheckmarkItem = {
  _uid: string;
  component: string;
  _editable?: string;
  text: string;
};

type B2BCredibilityCMSProps = {
  blok: {
    _uid: string;
    component: string;
    _editable?: string;
    badge: string;
    title: string;
    description: string;
    checkmarks: CheckmarkItem[];
    ctas: CTAItem[];
    facts: FactItem[];
  };
  locale: string;
};

export function B2BCredibilityCMS({ blok }: B2BCredibilityCMSProps) {
  const { badge, title, description, checkmarks = [], ctas = [], facts = [] } = blok;

  const resolveLink = (link: CTAItem['link']): string => {
    if (typeof link === 'string') return link;
    if (link?.cached_url) return `/${link.cached_url}`;
    if (link?.url) return link.url;
    return '#';
  };

  return (
    <section className="py-32 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {badge && (
              <div className="inline-block px-4 py-1.5 bg-[color:var(--brand)]/10 text-[color:var(--brand)] rounded-full text-sm mb-6">
                {badge}
              </div>
            )}
            
            {title && <h2 className="mb-6 text-3xl font-semibold text-gray-900">{title}</h2>}
            
            {description && (
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {description}
              </p>
            )}

            {checkmarks && checkmarks.length > 0 && (
              <div className="grid gap-3 mb-8">
                {checkmarks.map((item) => (
                  <div key={item._uid} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-[color:var(--brand)] flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            )}

            {ctas.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {ctas.map((cta, index) => (
                  <Button 
                    key={cta._uid || index}
                    asChild
                    variant={index === 0 ? 'default' : 'outline'}
                    className={index === 0 ? 'bg-[color:var(--brand)] hover:bg-[color:var(--brand)]/90' : ''}
                  >
                    <a href={resolveLink(cta.link)}>
                      {cta.text}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {facts.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {facts.map((fact) => (
                <Card key={fact._uid} className="p-6 bg-white border border-gray-200">
                  <div className="text-4xl font-bold text-[color:var(--brand)] mb-2">
                    {fact.value}
                  </div>
                  <div className="text-gray-600">
                    {fact.label}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
