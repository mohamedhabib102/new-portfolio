import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import BlogsClient from "./BlogsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights",
  description:
    "In-depth technical articles on Next.js 16, React 19, web rendering strategies (CSR, SSR, SSG, ISR), animations, and frontend performance by Mohamed H. Mowafy.",
  keywords: [
    "Frontend Engineering Blog",
    "Next.js Blog",
    "React 19 Tutorials",
    "Web Performance Optimization",
    "مدونة برمجة",
    "مقالات فرونت إند",
    "محمد حبيب موافي",
    "CSS Architecture",
    "JavaScript Architecture",
  ],
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
  openGraph: {
    title: "Engineering Blog & Technical Insights | Mohamed H. Mowafy",
    description:
      "In-depth technical articles on Next.js, React, modern web rendering techniques, animations, and frontend performance.",
    url: `${siteUrl}/blogs`,
    type: "website",
    siteName: "Mohamed H. Mowafy Blog",
    images: [
      {
        url: `${siteUrl}/avatar.png`,
        width: 1200,
        height: 630,
        alt: "Mohamed H. Mowafy - Engineering Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & Technical Insights | Mohamed H. Mowafy",
    description:
      "In-depth technical articles on Next.js, React, modern rendering techniques, and frontend performance.",
    images: [`${siteUrl}/avatar.png`],
    creator: "@mohamedhabib102",
  },
};

export default async function BlogsPage() {
  const initialBlogs = await portfolioStore.getBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mohamed H. Mowafy Engineering Blog",
    url: `${siteUrl}/blogs`,
    description:
      "Technical articles, engineering insights, and tutorials about frontend architecture, Next.js, React, and web performance.",
    author: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      url: siteUrl,
    },
    blogPost: (initialBlogs || []).slice(0, 10).map((b: any) => ({
      "@type": "BlogPosting",
      headline: b.titleEn,
      url: `${siteUrl}/blogs/${b.slug || b.id}`,
      datePublished: b.publishedAt,
      description: b.excerptEn || b.excerptAr,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogsClient initialBlogs={initialBlogs} />
    </>
  );
}
