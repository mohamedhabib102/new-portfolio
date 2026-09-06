import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import BlogsClient from "./BlogsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights | Mohamed H. Mowafy",
  description:
    "In-depth technical articles on Next.js 16, React 19, web rendering strategies (CSR, SSR, SSG, ISR), 60FPS animations, and frontend performance by Mohamed H. Mowafy.",
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app/blogs",
  },
  openGraph: {
    title: "Engineering Blog & Technical Insights | Mohamed H. Mowafy",
    description:
      "In-depth technical articles on Next.js, React, modern web rendering techniques, animations, and frontend performance.",
    url: "https://mohamedmowafydev.vercel.app/blogs",
    type: "website",
    images: [
      {
        url: "https://mohamedmowafydev.vercel.app/avatar.png",
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
    images: ["https://mohamedmowafydev.vercel.app/avatar.png"],
    creator: "@mohamedhabib102",
  },
};

export default async function BlogsPage() {
  const initialBlogs = await portfolioStore.getBlogs();

  return <BlogsClient initialBlogs={initialBlogs} />;
}
