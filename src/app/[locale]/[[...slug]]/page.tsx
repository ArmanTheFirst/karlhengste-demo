import { fetchStory, Locale } from "@/lib/storyblok";
import type { Metadata } from "next";
import { HeroBanner } from "@/components/cms/HeroBanner";
import { Grid } from "@/components/cms/Grid";
import { Feature } from "@/components/cms/Feature";
import { Teaser } from "@/components/cms/Teaser";
import { CertificationBadge } from "@/components/cms/CertificationBadge";
import { IndustryTilesCMS } from "@/components/cms/IndustryTiles";
import { HeaderCMS } from "@/components/cms/Header";
import { IndustryShowcaseCMS } from "@/components/cms/IndustryShowcase";
import { ProductBreadthCMS } from "@/components/cms/ProductBreadthCMS";
import { FooterCMS } from "@/components/cms/Footer";
import { CertificationsStripCMS } from "@/components/cms/CertificationsStripCMS";
import { KnowledgeBaseTeaserCMS } from "@/components/cms/KnowledgeBaseTeaserCMS";
import { B2BCredibilityCMS } from "@/components/cms/B2BCredibilityCMS";
import { ShopPromoCMS } from "@/components/cms/ShopPromoCMS";
import { NotFoundCMS } from "@/components/cms/NotFoundCMS";

async function fetchWithLocaleFallback(slugPath: string, locale: Locale) {
  // Attempts: requested locale (plain -> prefixed), then English fallback (plain -> prefixed)
  const attempts: Array<{ slug: string; language: Locale }> = [
    { slug: slugPath, language: locale },
    { slug: `${locale}/${slugPath}`, language: locale },
    { slug: slugPath, language: "en" as Locale },
    { slug: `en/${slugPath}`, language: "en" as Locale },
  ];

  let lastError: unknown = null;
  for (const a of attempts) {
    try {
      const res = await fetchStory({
        slug: a.slug,
        language: a.language,
        version: "draft",
      });
      if (res) return res;
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  throw new Error(`Story not found for slug "${slugPath}" in ${locale} or en`);
}

function isObject(v: any): v is Record<string, any> {
  return v && typeof v === "object" && !Array.isArray(v);
}

function isEmptyValue(v: any): boolean {
  return (
    v === undefined || v === null || (typeof v === "string" && v.trim() === "")
  );
}

function mergeArraysByUid(primary: any[], fallback: any[]): any[] {
  if (!Array.isArray(primary) || primary.length === 0)
    return Array.isArray(fallback) ? fallback : [];
  const fbByUid = new Map<string, any>();
  (fallback || []).forEach((it: any, i: number) => {
    const key =
      it && typeof it === "object" && typeof it._uid === "string"
        ? it._uid
        : `__idx_${i}`;
    fbByUid.set(key, it);
  });
  return primary.map((it: any, i: number) => {
    const key =
      it && typeof it === "object" && typeof it._uid === "string"
        ? it._uid
        : `__idx_${i}`;
    const fb = fbByUid.get(key) ?? (fallback ? fallback[i] : undefined);
    return mergeDeep(it, fb);
  });
}

function mergeDeep(primary: any, fallback: any): any {
  if (isEmptyValue(primary)) return fallback;
  if (Array.isArray(primary) || Array.isArray(fallback)) {
    const a1 = Array.isArray(primary) ? primary : [];
    const a2 = Array.isArray(fallback) ? fallback : [];
    return mergeArraysByUid(a1, a2);
  }
  if (isObject(primary) && isObject(fallback)) {
    const out: Record<string, any> = { ...fallback };
    for (const k of Object.keys({ ...fallback, ...primary })) {
      out[k] = mergeDeep(primary[k], fallback[k]);
    }
    return out;
  }
  return primary;
}

async function fetchStoryWithFieldFallback(slugPath: string, locale: Locale) {
  // First, try to get requested locale (with slug variants)
  const localized = await (async () => {
    for (const s of [slugPath, `${locale}/${slugPath}`]) {
      try {
        return await fetchStory({
          slug: s,
          language: locale,
          version: "draft",
        });
      } catch {}
    }
    return undefined;
  })();

  // Always fetch English as the fallback baseline
  let fallbackEn: any = undefined;
  for (const s of [slugPath, `en/${slugPath}`]) {
    try {
      fallbackEn = await fetchStory({
        slug: s,
        language: "en" as Locale,
        version: "draft",
      });
      if (fallbackEn) break;
    } catch {}
  }

  // If nothing found at all, throw
  if (!localized && !fallbackEn) {
    throw new Error(
      `Story not found for slug "${slugPath}" (${locale} or en).`
    );
  }

  // If requested locale is en or missing, return the available result
  if (locale === "en" || !localized) return localized || fallbackEn;

  // Merge localized content with English fallback per field/uid
  const locStory = localized?.story?.story || localized?.story;
  const enStory = fallbackEn?.story?.story || fallbackEn?.story;
  if (!locStory || !enStory) return localized || fallbackEn;

  const mergedContent = mergeDeep(locStory.content, enStory.content);
  const mergedName = isEmptyValue(locStory.name) ? enStory.name : locStory.name;

  const merged = {
    ...(localized || {}),
    story: { ...(locStory || {}), content: mergedContent, name: mergedName },
  };
  return merged;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const p = await params;
  const locale = (p.locale as Locale) || "en";
  const slugPath = p.slug?.join("/") || "home";

  try {
    const data = await fetchStoryWithFieldFallback(slugPath, locale);
    const title = data?.story?.story?.name
      ? `${data.story.story.name} | Karl Hengste`
      : data?.story?.name
      ? `${capitalize(data.story.name)} | Karl Hengste`
      : "Karl Hengste";

    function capitalize(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return { title };
  } catch {
    return { title: "Karl Hengste" };
  }
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const p = await params;
  const locale = (p.locale as Locale) || "en";
  const slugPath = p.slug?.join("/") || "home";

  try {
    const data = await fetchStoryWithFieldFallback(slugPath, locale);
    const story = data?.story?.story || data?.story;

    if (!story) {
      return (
        <main className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-2xl font-semibold mb-4">Not found in CMS</h1>
          <p className="text-gray-600">
            No Storyblok story for: <code>{`/${locale}/${slugPath}`}</code>
          </p>
        </main>
      );
    }

    const body: any[] = Array.isArray(story?.content?.body)
      ? story.content.body
      : [];

    return (
      <main>
        {body.length === 0 ? (
          <section className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-4">{story.name}</h1>
            <p className="text-gray-600">No blocks found in this page.</p>
          </section>
        ) : (
          body.map((blok) => {
            switch (blok.component) {
              case "hero_banner":
                return <HeroBanner key={blok._uid} blok={blok} />;
              case "grid":
                return <Grid key={blok._uid} blok={blok} />;
              case "feature":
                return <Feature key={blok._uid} blok={blok} />;
              case "teaser":
                return <Teaser key={blok._uid} blok={blok} />;
              case "certification_badge":
                return <CertificationBadge key={blok._uid} blok={blok} />;
              case "industry_tiles":
                return <IndustryTilesCMS key={blok._uid} blok={blok} />;
              case "industry_showcase":
                return (
                  <IndustryShowcaseCMS
                    key={blok._uid}
                    blok={blok}
                    locale={locale}
                  />
                );
              case "header":
                return (
                  <HeaderCMS key={blok._uid} blok={blok} locale={locale} />
                );
              case "product_breadth":
                return (
                  <ProductBreadthCMS
                    key={blok._uid}
                    blok={blok}
                    locale={locale}
                  />
                );
              case "certifications_strip":
                return (
                  <CertificationsStripCMS
                    key={blok._uid}
                    blok={blok}
                    locale={locale}
                  />
                );
              case "Knowledge Base Teaser":
                return (
                  <KnowledgeBaseTeaserCMS
                    key={blok._uid}
                    blok={blok}
                    locale={locale}
                  />
                );
              case "B2B Credibility":
                return (
                  <B2BCredibilityCMS
                    key={blok._uid}
                    blok={blok}
                    locale={locale}
                  />
                );
              case "shop_promo":
                return (
                  <ShopPromoCMS key={blok._uid} blok={blok} locale={locale} />
                );
              case "footer":
                return (
                  <FooterCMS key={blok._uid} blok={blok} locale={locale} />
                );
              case "not_found":
                return <NotFoundCMS key={blok._uid} blok={blok} />;
              default:
                return (
                  <section
                    key={blok._uid}
                    className="max-w-3xl mx-auto px-6 py-8"
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      Unknown block: <code>{blok.component}</code>
                    </div>
                    <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                      {JSON.stringify(blok, null, 2)}
                    </pre>
                  </section>
                );
            }
          })
        )}
      </main>
    );
  } catch (e: any) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-4">
          Error loading CMS content
        </h1>
        <p className="text-gray-600">{e?.message || "Unknown error"}</p>
      </main>
    );
  }
}
