// src/components/cms/CertificationsStripCMS.tsx
"use client";

import {
  ShieldCheck,
  Award,
  Leaf,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../ui/utils";

const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  award: Award,
  leaf: Leaf,
  "file-check": FileCheck,
  // Add more icons as needed
};

type CertificationItem = {
  _uid: string;
  id: string; // Add this line
  name: string;
  description: string;
  icon: string;
  color?: string;
};

type CertificationsStripCMSProps = {
  blok: {
    title?: string;
    certifications?: CertificationItem[];
  };
  locale: string;
};

export function CertificationsStripCMS({ blok }: CertificationsStripCMSProps) {
  const { title, certifications = [] } = blok;

  if (certifications.length === 0) return null;

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <h2 className="text-2xl font-semibold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert) => {
            const Icon = iconMap[cert.icon] || ShieldCheck; // Fallback to ShieldCheck
            return (
              <div key={cert._uid} className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                    cert.color || "bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-gray-500">
                    {cert.id && (
                      <span className="text-xs text-gray-400 mr-2">
                        {cert.id}
                      </span>
                    )}
                    {cert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
