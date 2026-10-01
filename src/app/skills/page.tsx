import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import SkillsClient from "./SkillsClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Skills & Technical Tooling",
  description:
    "Explore the technical stack, frameworks, animation libraries, state management, and modern tools mastered by Mohamed H. Mowafy.",
  keywords: [
    "Frontend Skills",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "مهارات محمد حبيب موافي",
    "تقنيات الواجهات الأمامية",
  ],
  alternates: {
    canonical: `${siteUrl}/skills`,
  },
  openGraph: {
    title: "Skills & Technical Tooling | Mohamed H. Mowafy",
    description:
      "Core technologies including Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion, and modern web performance tooling.",
    url: `${siteUrl}/skills`,
    type: "website",
    siteName: "Mohamed H. Mowafy Portfolio",
    images: [
      {
        url: `${siteUrl}/me.png`,
        width: 1200,
        height: 630,
        alt: "Skills - Mohamed H. Mowafy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Technical Tooling | Mohamed H. Mowafy",
    description:
      "Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion, and modern web performance tooling.",
    images: [`${siteUrl}/me.png`],
    creator: "@mohamedhabib102",
  },
};

export default async function SkillsPage() {
  const initialSkills = await portfolioStore.getSkills();

  return <SkillsClient initialSkills={initialSkills} />;
}
