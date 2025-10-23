export type Locale = "en" | "de";

const API_BASE = "https://api.storyblok.com/v2/cdn";
const TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

if (!TOKEN) {
  // Non-fatal: allow app to boot; pages will show a friendly error instead
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_STORYBLOK_TOKEN is not set. Storyblok requests will fail until you configure it in .env.local"
  );
}

export async function fetchStory(opts: {
  slug: string;
  language: Locale;
  version?: "draft" | "published";
  resolve_relations?: string[];
}): Promise<any> {
  const { slug, language, version = "draft", resolve_relations = [] } = opts;
  const url = new URL(`${API_BASE}/stories/${encodeURIComponent(slug)}`);
  url.searchParams.set("token", TOKEN || "");
  url.searchParams.set("version", version);
  url.searchParams.set("language", language);
  if (resolve_relations.length) {
    url.searchParams.set("resolve_relations", resolve_relations.join(","));
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Storyblok fetch failed for slug=${slug} lang=${language} (${res.status})`);
  }
  return res.json();
}
