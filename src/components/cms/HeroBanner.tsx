"use client";

import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

type CTABlock = {
  _uid: string;
  component: string;
  text?: string;
  link?: LinkField;
  _editable?: string;
};

type HeroBannerBlok = {
  _uid: string;
  component: string;
  title?: string;
  description?: string;
  first_cta?: CTABlock[];
  second_cta?: CTABlock[];
  bubble?: string;
  customers?: string;
  customers_number?: string;
  years?: string;
  years_number?: string;
  satisfaction?: string;
  satisfaction_number?: string;
};

const resolveLink = (link: LinkField): string => {
  if (!link) return "#";
  if (typeof link === "string") return link.startsWith("/") ? link : `/${link}`;
  if (link.cached_url) return `/${link.cached_url}`;
  if (link.url) return link.url;
  return "#";
};

export function HeroBanner({ blok }: { blok: HeroBannerBlok }) {
  const headline = blok.title || "Untitled Hero";
  const description = blok.description || "Untitled description";
  const bubble = blok.bubble || "";
  const customers = blok.customers || "";
  const customers_number = blok.customers_number || "";
  const years = blok.years || "";
  const years_number = blok.years_number || "";
  const satisfaction = blok.satisfaction || "";
  const satisfaction_number = blok.satisfaction_number || "";

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 } as const,
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } as const,
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[color:var(--ink)] font-[family-name:var(--font-manrope)]">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source
              src="https://videos.pexels.com/video-files/17912075/17912075-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.unsplash.com/photo-1656466444029-472b105b1c4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2MDUzMTA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Industrial manufacturing"
              className="w-full h-full object-cover"
            />
          </video>
        </motion.div>
        
        {/* Modern Gradient Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-modern)]/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Badge / Bubble */}
          {bubble && (
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <Badge
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg"
              >
                {bubble}
              </Badge>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-white mb-8 font-extrabold tracking-tighter text-5xl sm:text-6xl md:text-7xl leading-[0.9]"
          >
            {headline}
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-1.5 w-24 bg-[color:var(--brand-modern)] rounded-full mx-auto mb-10"
          />

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            {blok.first_cta?.[0]?.text && (
              <a
                href={resolveLink(blok.first_cta[0].link)}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-[color:var(--brand-contrast)] bg-[color:var(--brand-modern)] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {blok.first_cta[0].text}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            )}
            {blok.second_cta?.[0]?.text && (
              <a
                href={resolveLink(blok.second_cta[0].link)}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white border-2 border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  {blok.second_cta[0].text}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-white/10 max-w-5xl mx-auto"
          >
            {[
              { label: customers, value: customers_number },
              { label: years, value: years_number },
              { label: satisfaction, value: satisfaction_number },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={statVariants}
                className="text-center group cursor-default"
              >
                <div className="text-white font-black text-5xl md:text-6xl lg:text-7xl mb-2 tracking-tight group-hover:text-[color:var(--brand-modern)] transition-colors duration-300">
                  {stat.label}
                </div>
                <p className="text-white/60 text-sm md:text-base font-bold uppercase tracking-widest">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-50" />
      </motion.div>
    </div>
  );
}
