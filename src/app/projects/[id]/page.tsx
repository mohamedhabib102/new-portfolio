import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

// SSG with ISR: Revalidate every 10 days (864,000 seconds). Also updated whenever build runs or new data is added.
export const revalidate = 864000;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await portfolioStore.getProjects();
  const params: { id: string }[] = [];

  for (const project of projects) {
    if (project.id) {
      params.push({ id: String(project.id) });
    }
    if (project.slug && project.slug !== project.id) {
      params.push({ id: String(project.slug) });
    }
  }

  return params;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projects = await portfolioStore.getProjects();
  const project = projects.find((p: any) => p.id === id || p.slug === id);

  if (!project) {
    return {
      title: "Project Not Found | Mohamed H. Mowafy",
      description: "The requested project could not be found in Mohamed H. Mowafy's portfolio.",
      robots: { index: false, follow: true },
    };
  }

  const title = `${project.titleEn} | Projects`;
  const description =
    project.descriptionEn ||
    project.descriptionAr ||
    `Explore ${project.titleEn}, a high-performance web engineering project developed by Mohamed H. Mowafy.`;
  const canonicalUrl = `${siteUrl}/projects/${project.slug || id}`;
  const keywords = Array.isArray(project.tags)
    ? [...project.tags, "Mohamed H. Mowafy", "Frontend Project", "Web Development", project.titleAr]
    : ["Frontend Project", "Web Development"];

  const previewImage = project.coverImage?.startsWith("http")
    ? project.coverImage
    : project.coverImage
    ? `${siteUrl}${project.coverImage}`
    : `${siteUrl}/avatar.png`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.titleEn} - ${project.titleAr || "Project"} | Mohamed H. Mowafy`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Mohamed H. Mowafy Portfolio",
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: `${project.titleEn} - Project Showcase`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.titleEn} | Mohamed H. Mowafy`,
      description,
      images: [previewImage],
      creator: "@mohamedhabib102",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projects = await portfolioStore.getProjects();
  const project = projects.find((p: any) => p.id === id || p.slug === id);

  const jsonLd = project
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: project.titleEn,
        alternateName: project.titleAr,
        description: project.descriptionEn || project.descriptionAr,
        applicationCategory: "WebApplication",
        operatingSystem: "All",
        url: `${siteUrl}/projects/${project.slug || id}`,
        author: {
          "@type": "Person",
          name: "Mohamed H. Mowafy",
          url: siteUrl,
        },
        keywords: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProjectDetailClient id={id} initialProject={project} />
    </>
  );
}
