"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { IndustryTiles } from "@/components/IndustryTiles";
import { IndustryShowcase } from "@/components/IndustryShowcase";
import { ProductBreadth } from "@/components/ProductBreadth";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { KnowledgeBaseTeaser } from "@/components/KnowledgeBaseTeaser";
import { B2BCredibility } from "@/components/B2BCredibility";
import { ShopPromo } from "@/components/ShopPromo";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [visitorType, setVisitorType] = useState<"B2B" | "B2C">("B2B");

  return (
    <div className="min-h-screen">
      <Navigation visitorType={visitorType} setVisitorType={setVisitorType} />
      <Hero visitorType={visitorType} />
      <IndustryTiles visitorType={visitorType} />
      <IndustryShowcase visitorType={visitorType} />
      <ProductBreadth visitorType={visitorType} />
      <CertificationsStrip />
      <KnowledgeBaseTeaser visitorType={visitorType} />
      <B2BCredibility visitorType={visitorType} />
      <ShopPromo visitorType={visitorType} />
      <Footer visitorType={visitorType} />
    </div>
  );
}
