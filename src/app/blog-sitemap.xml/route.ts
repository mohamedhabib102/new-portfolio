import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");
  const now = new Date().toISOString();

  let blogs: any[] = [];
  try {
    blogs = await portfolioStore.getBlogs();
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }

  const seenSlugs = new Set<string>();
  const blogEntries: { url: string; lastmod: string; changefreq: string; priority: string }[] = [
    {
      url: `${baseUrl}/blogs`,
      lastmod: now,
      changefreq: "daily",
      priority: "0.9",
    },
  ];

  for (const b of blogs || []) {
    const slug = (b.slug || b.id)?.toString().trim();
    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const rawDate = b.updatedAt || b.publishedAt || b.createdAt;
    const dateObj = rawDate ? new Date(rawDate) : new Date();
    const lastmod = isNaN(dateObj.getTime()) ? now : dateObj.toISOString();

    blogEntries.push({
      url: `${baseUrl}/blogs/${encodeURIComponent(slug)}`,
      lastmod,
      changefreq: "weekly",
      priority: "0.85",
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogEntries
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
