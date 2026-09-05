import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const projects = await portfolioStore.getProjects();
  const project = projects.find((p: any) => p.id === id || p.slug === id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found in Mohamed H. Mowafy's portfolio.",
      robots: { index: false, follow: true },
    };
  }

  const title = `${project.titleEn} | Projects`;
  const description =
    project.descriptionEn ||
    project.descriptionAr ||
    `Explore ${project.titleEn}, a high-performance web engineering project developed by Mohamed H. Mowafy.`;
  const canonicalUrl = `https://mohamedmowafydev.vercel.app/projects/${project.slug || id}`;
  const keywords = Array.isArray(project.tags)
    ? [...project.tags, "Mohamed H. Mowafy", "Frontend Project", "Web Development", project.titleAr]
    : ["Frontend Project", "Web Development"];

  const previewImage = project.coverImage || "/avatar.png";

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
        url: `https://mohamedmowafydev.vercel.app/projects/${project.slug || id}`,
        author: {
          "@type": "Person",
          name: "Mohamed H. Mowafy",
          url: "https://mohamedmowafydev.vercel.app",
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
