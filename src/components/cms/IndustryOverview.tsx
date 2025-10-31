"use client";

import React from "react";
import { StoryblokRichText } from "@storyblok/react";

// Define richtext type based on Storyblok's structure
type ISbRichtext = {
  type?: string;
  content?: any[];
  [key: string]: any;
};

type IndustryOverviewBlok = {
  _uid: string;
  component: string;
  title?: string;
  content?: ISbRichtext | any; // richtext
  // Handle variations from the Python script
  description?: string;
  features?: string[];
};

export function IndustryOverview({ blok }: { blok: IndustryOverviewBlok }) {
  const title = blok.title || "";
  const content = blok.content;
  const description = blok.description;
  const features = blok.features;

  // Helper to parse text with bullet points and convert to proper list structure
  const parseBulletText = (text: string): React.ReactNode => {
    const parts = text.split(/\n\n+/);
    
    return (
      <div className="text-gray-700 leading-7">
        {parts.map((part, partIdx) => {
          // Check if this part has bullet points
          const bulletMatches = part.match(/^[•\-\*]\s*.+$/gm);
          if (bulletMatches && bulletMatches.length > 0) {
            // This is a bullet list
            const lines = part.split(/\n/);
            const intro = lines.find((line) => !line.trim().match(/^[•\-\*]/));
            const bulletItems = lines
              .filter((line) => line.trim().match(/^[•\-\*]/))
              .map((line) => line.replace(/^[•\-\*]\s*/, "").trim());
            
            return (
              <div key={partIdx}>
                {intro && (
                  <p className="mb-4">{intro.trim()}</p>
                )}
                <ul className="list-disc list-inside space-y-2 my-4">
                  {bulletItems.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-700 leading-7">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else if (part.trim()) {
            // Regular paragraph
            return (
              <p key={partIdx} className="mb-4">
                {part.trim()}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  };

  // Helper to render richtext content
  const renderContent = () => {
    if (description) {
      return <p className="text-gray-700 leading-7">{description}</p>;
    }
    if (content) {
      // Handle Storyblok richtext format using official renderer
      if (typeof content === "string") {
        return parseBulletText(content);
      }
      
      // Use Storyblok's official richtext renderer but with post-processing
      if (content && (content.content || content.type === "doc")) {
        try {
          // Try to extract all text first to see if we need to parse bullets
          const allText = extractAllText(content);
          if (allText.includes("•") && allText.includes("\n")) {
            // Has bullet characters in text, parse it manually
            return parseBulletText(allText);
          }
          
          // Otherwise use StoryblokRichText
          return (
            <div className="text-gray-700 leading-7 richtext-content">
              <StoryblokRichText
                doc={content as any}
                resolvers={{}}
              />
            </div>
          );
        } catch (error) {
          console.error("Error rendering StoryblokRichText:", error);
          // Fallback: extract text and parse
          const allText = extractAllText(content);
          return parseBulletText(allText);
        }
      }
      
      // Try manual rendering
      const allText = extractAllText(content);
      if (allText) {
        return parseBulletText(allText);
      }
    }
    return null;
  };

  // Extract all text from richtext structure, preserving structure
  const extractAllText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (node.text) return node.text;
    
    // Handle different node types
    if (node.type === "hard_break" || node.type === "hardBreak") {
      return "\n";
    }
    
    if (node.type === "paragraph" && node.content) {
      // Paragraph content - join without spaces to preserve structure
      const paraText = node.content.map((n: any) => extractAllText(n)).join("");
      return paraText + "\n\n";
    }
    
    if (node.content && Array.isArray(node.content)) {
      // For other nodes, preserve newlines
      return node.content.map(extractAllText).join("\n");
    }
    
    return "";
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
            {title}
          </h2>
        )}
        {renderContent()}
        {features && Array.isArray(features) && features.length > 0 && (
          <ul className="mt-8 space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

