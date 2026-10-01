import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import AboutClient from "./AboutClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "About | Frontend Engineer & UI Specialist",
  description:
    "Learn about Mohamed H. Mowafy, an Egypt-based Frontend Engineer focused on crafting high-performance, responsive web applications with Next.js, React, TypeScript, and modern animation systems.",
  keywords: [
    "About Mohamed H. Mowafy",
    "Mohamed Habib Mowafy",
    "Frontend Engineer Egypt",
    "عن محمد حبيب موافي",
    "مهندس واجهات أمامية",
    "React Developer",
    "Next.js Developer",
    "UI/UX Specialist",
    "TypeScript",
    "Tailwind CSS",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Mohamed H. Mowafy | Frontend Engineer & UI Specialist",
    description:
      "Frontend Engineer from Egypt crafting high-performance, interactive user experiences with Next.js, React, and TypeScript.",
    url: `${siteUrl}/about`,
    type: "profile",
    siteName: "Mohamed H. Mowafy Portfolio",
    images: [
      {
        url: `${siteUrl}/me.png`,
        width: 1200,
        height: 630,
        alt: "Mohamed H. Mowafy - Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mohamed H. Mowafy | Frontend Engineer & UI Specialist",
    description:
      "Frontend Engineer crafting high-performance, interactive user experiences with Next.js, React, and TypeScript.",
    images: [`${siteUrl}/me.png`],
    creator: "@mohamedhabib102",
  },
};

export default async function AboutPage() {
  const [initialConfig, initialExperiences] = await Promise.all([
    portfolioStore.getSiteConfig(),
    portfolioStore.getExperiences(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Mohamed H. Mowafy",
    url: `${siteUrl}/about`,
    description:
      "Biography, background, technical skills, and engineering experience of Frontend Engineer Mohamed H. Mowafy.",
    mainEntity: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      alternateName: "محمد حبيب موافي",
      jobTitle: "Frontend Engineer & UI Specialist",
      image: `${siteUrl}/me.png`,
      url: siteUrl,
      sameAs: [
        "https://github.com/mohamedhabib102",
        "https://www.linkedin.com/in/mohamedhabibmowafy-dev/",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Serv5",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient initialConfig={initialConfig} initialExperiences={initialExperiences} />
    </>
  );
}
