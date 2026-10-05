import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import ProjectsClient from "./ProjectsClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Featured Works & Engineering Projects",
  description:
    "Explore a curated portfolio of frontend web applications, interactive interfaces, animations, and high-performance digital products engineered by Mohamed H. Mowafy.",
  keywords: [
    "Frontend Projects",
    "Web Applications",
    "Next.js Projects",
    "React Portfolio",
    "TypeScript Projects",
    "Tailwind CSS",
    "Mohamed H. Mowafy Projects",
    "مشاريع فرونت إند",
    "أعمال ومشاريع محمد حبيب موافي",
  ],
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "Featured Works & Engineering Projects | Mohamed H. Mowafy",
    description:
      "Explore a curated portfolio of high-performance web applications and interactive interfaces built with Next.js, React, and TypeScript.",
    url: `${siteUrl}/projects`,
    type: "website",
    siteName: "Mohamed H. Mowafy Portfolio",
    images: [
      {
        url: `${siteUrl}/avatar.png`,
        width: 800,
        height: 800,
        alt: "Mohamed H. Mowafy Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Works & Engineering Projects | Mohamed H. Mowafy",
    description:
      "Explore a curated portfolio of high-performance web applications and interactive interfaces built with Next.js, React, and TypeScript.",
    images: [`${siteUrl}/avatar.png`],
    creator: "@mohamedhabib102",
  },
};

// Dynamic Server-Side Rendering (SSR): rendered on the server on every request with fresh data from database
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AllProjectsPage() {
  const projects = await portfolioStore.getProjects();
  const publicProjects = (projects || []).filter((p: any) => !p.isHidden);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mohamed H. Mowafy - Featured Engineering Projects",
    url: `${siteUrl}/projects`,
    description:
      "A curated collection of web engineering projects and high-performance applications built by Mohamed H. Mowafy.",
    author: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient initialProjects={publicProjects} />
    </>
  );
}
