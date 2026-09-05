import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Featured Works & Engineering Projects",
  description:
    "Explore a curated portfolio of full-stack and frontend web applications, interactive interfaces, animations, and high-performance digital products engineered by Mohamed H. Mowafy.",
  keywords: [
    "Frontend Projects",
    "Web Applications",
    "Next.js Projects",
    "React Portfolio",
    "TypeScript Projects",
    "Tailwind CSS",
    "Mohamed H. Mowafy Projects",
    "أعمال ومشاريع محمد حبيب موافي",
  ],
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app/projects",
  },
  openGraph: {
    title: "Featured Works & Engineering Projects | Mohamed H. Mowafy",
    description:
      "Explore a curated portfolio of high-performance web applications and interactive interfaces built with Next.js, React, and TypeScript.",
    url: "https://mohamedmowafydev.vercel.app/projects",
    type: "website",
    siteName: "Mohamed H. Mowafy Portfolio",
    images: [
      {
        url: "/avatar.png",
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
    images: ["/avatar.png"],
    creator: "@mohamedhabib102",
  },
};

export default async function AllProjectsPage() {
  const projects = await portfolioStore.getProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mohamed H. Mowafy - Featured Engineering Projects",
    url: "https://mohamedmowafydev.vercel.app/projects",
    description:
      "A curated collection of web engineering projects and high-performance applications built by Mohamed H. Mowafy.",
    author: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      url: "https://mohamedmowafydev.vercel.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsClient initialProjects={projects} />
    </>
  );
}
