import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Mohamed H. Mowafy - Front-End Developer",
  description:
    "Learn about Mohamed H. Mowafy, a Front-End Engineer focused on building fast, modern, and responsive web applications with React, Next.js, and TypeScript.",
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app/about",
  },
  openGraph: {
    title: "About Mohamed H. Mowafy | Front-End Developer",
    description:
      "23-year-old Front-End Developer from Egypt crafting high-performance, interactive user experiences with Next.js, React, and TypeScript.",
    url: "https://mohamedmowafydev.vercel.app/about",
    type: "profile",
    images: [
      {
        url: "https://mohamedmowafydev.vercel.app/me.png",
        width: 1200,
        height: 630,
        alt: "Mohamed H. Mowafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Mohamed H. Mowafy | Front-End Developer",
    description:
      "Front-End Developer crafting high-performance, interactive user experiences with Next.js, React, and TypeScript.",
    images: ["https://mohamedmowafydev.vercel.app/me.png"],
    creator: "@mohamedhabib102",
  },
};

export default async function AboutPage() {
  const [initialConfig, initialExperiences] = await Promise.all([
    portfolioStore.getSiteConfig(),
    portfolioStore.getExperiences(),
  ]);

  return <AboutClient initialConfig={initialConfig} initialExperiences={initialExperiences} />;
}
