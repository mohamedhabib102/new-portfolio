import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");
  const now = new Date().toISOString();

  let projects: any[] = [];
  try {
    projects = await portfolioStore.getProjects();
  } catch (err) {
    console.error("Error fetching projects for sitemap:", err);
  }

  const seenSlugs = new Set<string>();
  const projectEntries: { url: string; lastmod: string; changefreq: string; priority: string }[] = [
    {
      url: `${baseUrl}/projects`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.9",
    },
  ];

  for (const p of projects || []) {
    const slug = (p.slug || p.id)?.toString().trim();
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const rawDate = p.updatedAt || p.createdAt;
    const dateObj = rawDate ? new Date(rawDate) : new Date();
    const lastmod = isNaN(dateObj.getTime()) ? now : dateObj.toISOString();

    projectEntries.push({
      url: `${baseUrl}/projects/${encodeURIComponent(slug)}`,
      lastmod,
      changefreq: "monthly",
      priority: "0.85",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${projectEntries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
