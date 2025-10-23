/*
  Seed EN/DE home stories in Storyblok using the Management API.
  Requires environment variables in .env.local (not committed):
    STORYBLOK_MANAGEMENT_TOKEN=...   // Personal Access Token with write permissions
    STORYBLOK_SPACE_ID=287745220002324

  Run with: npm run seed:home
*/

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const MGMT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MGMT_TOKEN) {
  console.error(
    "Missing STORYBLOK_SPACE_ID or STORYBLOK_MANAGEMENT_TOKEN in env."
  );
  process.exit(1);
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

function bearerHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${MGMT_TOKEN}`,
  } as Record<string, string>;
}
function tokenHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Token token=${MGMT_TOKEN}`,
  } as Record<string, string>;
}

async function fetchJson(url: string, init?: RequestInit) {
  // Try Bearer first
  let res = await fetch(url, {
    ...(init || {}),
    headers: { ...(init?.headers || {}), ...bearerHeaders() },
  });
  if (res.status === 401) {
    // Retry with Token token=
    res = await fetch(url, {
      ...(init || {}),
      headers: { ...(init?.headers || {}), ...tokenHeaders() },
    });
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

async function findStoryByFullSlug(fullSlug: string) {
  const url = `${BASE}/stories?with_slug=${encodeURIComponent(fullSlug)}`;
  const json = await fetchJson(url);
  const stories = (json?.stories as any[]) || [];
  return stories.find((s) => s.full_slug === fullSlug);
}

async function createStory(payload: any) {
  const url = `${BASE}/stories`;
  return fetchJson(url, {
    method: "POST",
    body: JSON.stringify({ story: payload }),
  });
}

async function updateStory(id: number, payload: any) {
  const url = `${BASE}/stories/${id}`;
  return fetchJson(url, {
    method: "PUT",
    body: JSON.stringify({ story: payload }),
  });
}

function buildHomeContentEN() {
  return {
    component: "page",
    body: [
      {
        component: "hero_banner",
        title:
          "Welcome to Karl Hengste GmbH – Your trusted partner in premium sheet metal solutions for over 110 years.",
      },
      {
        component: "grid",
        columns: [
          {
            component: "feature",
            name: "Defense",
            text: "Precision parts for defense applications.",
          },
          {
            component: "feature",
            name: "Medical",
            text: "High-precision components for medical industry.",
          },
          {
            component: "feature",
            name: "Construction",
            text: "Solutions tailored for construction industry needs.",
          },
          {
            component: "feature",
            name: "Automotive",
            text: "Reliable sheet metal parts for automotive.",
          },
          {
            component: "feature",
            name: "General Industry",
            text: "Versatile products for various industries.",
          },
        ],
      },
      {
        component: "certification_badge",
        headline: "Trusted by leading companies",
        items: [
          {
            component: "badge_item",
            image: { filename: "/images/logo.avif", alt: "Badge" },
          },
          {
            component: "badge_item",
            image: { filename: "/images/logo.avif", alt: "Badge" },
          },
        ],
      },
    ],
  };
}

function buildHomeContentDE() {
  return {
    component: "page",
    body: [
      {
        component: "hero_banner",
        title:
          "Willkommen bei Karl Hengste GmbH – Ihr Partner für hochwertige Blechlösungen seit über 110 Jahren.",
      },
      {
        component: "grid",
        columns: [
          {
            component: "feature",
            name: "Verteidigung",
            text: "Präzisionsteile für die Verteidigung.",
          },
          {
            component: "feature",
            name: "Medizinindustrie",
            text: "Hochpräzise Komponenten für die Medizin.",
          },
          {
            component: "feature",
            name: "Bauindustrie",
            text: "Lösungen für Anforderungen der Bauindustrie.",
          },
          {
            component: "feature",
            name: "Automobilindustrie",
            text: "Zuverlässige Blechbauteile für Automotive.",
          },
          {
            component: "feature",
            name: "Allgemeine Industrie",
            text: "Vielseitige Produkte für verschiedene Branchen.",
          },
        ],
      },
      {
        component: "certification_badge",
        headline: "Vertrauen von führenden Unternehmen",
        items: [
          {
            component: "badge_item",
            image: { filename: "/images/logo.avif", alt: "Abzeichen" },
          },
          {
            component: "badge_item",
            image: { filename: "/images/logo.avif", alt: "Abzeichen" },
          },
        ],
      },
    ],
  };
}

async function upsertHome(lang: "en" | "de") {
  const slug = "home";
  const name = lang === "en" ? "Home" : "Startseite";
  const content = lang === "en" ? buildHomeContentEN() : buildHomeContentDE();
  const fullSlug = `${lang}/${slug}`;

  const existing = await findStoryByFullSlug(fullSlug);
  const payload = {
    name,
    slug,
    is_startpage: false,
    default_root: false,
    content,
    lang,
    path: lang,
    // place under the language folder; if you use folder IDs, you can set parent_id here
  };

  if (existing) {
    console.log(`[update] ${fullSlug} (id=${existing.id})`);
    await updateStory(existing.id, payload);
  } else {
    console.log(`[create] ${fullSlug}`);
    await createStory(payload);
  }
}

(async () => {
  try {
    // quick auth check
    await fetchJson(`${BASE}/stories?per_page=1`);
    await upsertHome("en");
    await upsertHome("de");
    console.log("Seed complete: en/home and de/home upserted.");
  } catch (e: any) {
    console.error("Seed failed:", e?.message || e);
    process.exit(1);
  }
})();
