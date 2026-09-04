import { MetadataRoute } from "next";
import { portfolioStore } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mohamedmowafy.dev";
  
  const projects = await portfolioStore.getProjects();
  const blogs = await portfolioStore.getBlogs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projects || []).map((p: any) => ({
    url: `${baseUrl}/projects/${p.slug || p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blogs || []).map((b: any) => ({
    url: `${baseUrl}/blogs/${b.slug || b.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
