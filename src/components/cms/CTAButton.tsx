"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

type CTAButtonBlok = {
  _uid?: string;
  component?: string;
  label?: string;
  text?: string;
  link?: LinkField;
  _editable?: string;
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "#";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "#";
};

export function CTAButton({ blok }: { blok: CTAButtonBlok }) {
  const label = blok.label || blok.text || "";
  const link = resolveLink(blok.link);

  if (!label) return null;

  return (
    <Link
      href={link}
      className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white rounded-md shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
    >
      <span className="relative z-10 flex items-center">
        {label}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

