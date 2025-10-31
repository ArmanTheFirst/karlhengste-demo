"use client";

import { CTAButton } from "./CTAButton";

type QuoteSectionBlok = {
  _uid: string;
  component: string;
  title?: string;
  description?: any; // richtext
  cta_button?: any[];
  // Handle variations
  quote?: string;
  author?: string;
};

export function QuoteSection({ blok }: { blok: QuoteSectionBlok }) {
  const title = blok.title || "";
  const description = blok.description;
  const quote = blok.quote;
  const author = blok.author;
  const ctaButton = blok.cta_button?.[0] || blok.cta_button;

  // Helper to render richtext or plain text
  const renderContent = () => {
    if (quote) {
      return (
        <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 italic">
          {quote}
        </blockquote>
      );
    }
    if (description) {
      if (typeof description === "string") {
        return (
          <div
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        );
      }
      if (description?.content && Array.isArray(description.content)) {
        const textContent = description.content
          .map((item: any) => item.content?.map((c: any) => c.text || "").join("") || "")
          .join(" ");
        return <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{textContent}</p>;
      }
    }
    return null;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {title && (
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-8">
            {title}
          </h2>
        )}
        {renderContent()}
        {author && (
          <div className="mt-6">
            <p className="text-gray-600 font-medium">— {author}</p>
          </div>
        )}
        {ctaButton && (
          <div className="mt-10">
            <CTAButton blok={ctaButton} />
          </div>
        )}
      </div>
    </section>
  );
}

