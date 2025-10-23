import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

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

type CTA = {
  _uid: string;
  component: string;
  text: string;
  link: LinkField;
  _editable?: string;
};

type NotFoundBlok = {
  _uid: string;
  component: string;
  headline: string;
  description: string;
  cta: CTA[];
  _editable?: string;
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "/";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "/";
};

export function NotFoundCMS({ blok }: { blok: NotFoundBlok }) {
  const cta = blok.cta?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="relative inline-flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-dark)] rounded-full opacity-20 blur-3xl" />
          <div className="relative flex items-center justify-center">
            <svg
              className="w-36 h-36 text-[color:var(--brand)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {blok.headline}
        </h1>

        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          {blok.description}
        </p>

        {cta && (
          <div className="mt-8">
            <Link
              href={resolveLink(cta.link)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[color:var(--brand)] hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {cta.text}
            </Link>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">Prototype</p>
        </div>
      </div>
    </div>
  );
}
