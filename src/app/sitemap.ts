import { MetadataRoute } from "next";
import { portfolioStore } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");
  
  const [projects, blogs] = await Promise.all([
    portfolioStore.getProjects().catch(() => []),
    portfolioStore.getBlogs().catch(() => []),
  ]);

  const now = new Date();

  // Static top-level pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic Project pages
  const seenProjectSlugs = new Set<string>();
  const projectRoutes: MetadataRoute.Sitemap = [];

  for (const p of projects || []) {
    const slug = (p.slug || p.id)?.toString().trim();
    if (!slug || seenProjectSlugs.has(slug)) continue;
    seenProjectSlugs.add(slug);

    const projectDate = p.updatedAt ? new Date(p.updatedAt) : p.createdAt ? new Date(p.createdAt) : now;

    projectRoutes.push({
      url: `${baseUrl}/projects/${encodeURIComponent(slug)}`,
      lastModified: isNaN(projectDate.getTime()) ? now : projectDate,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // Dynamic Blog pages
  const seenBlogSlugs = new Set<string>();
  const blogRoutes: MetadataRoute.Sitemap = [];

  for (const b of blogs || []) {
    const slug = (b.slug || b.id)?.toString().trim();
    if (!slug || seenBlogSlugs.has(slug)) continue;
    seenBlogSlugs.add(slug);

    const rawDate = b.updatedAt || b.publishedAt || b.createdAt;
    const blogDate = rawDate ? new Date(rawDate) : now;

    blogRoutes.push({
      url: `${baseUrl}/blogs/${encodeURIComponent(slug)}`,
      lastModified: isNaN(blogDate.getTime()) ? now : blogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}

