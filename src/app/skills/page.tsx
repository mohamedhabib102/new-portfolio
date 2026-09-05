import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import SkillsClient from "./SkillsClient";

export const metadata: Metadata = {
  title: "Skills & Technical Tooling | Mohamed H. Mowafy",
  description:
    "Explore the technical stack, frameworks, animation libraries, state management, and modern tools mastered by Mohamed H. Mowafy.",
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app/skills",
  },
  openGraph: {
    title: "Skills & Technical Tooling | Mohamed H. Mowafy",
    description:
      "Core technologies including Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Framer Motion, and AI engineering tools.",
    url: "https://mohamedmowafydev.vercel.app/skills",
    type: "website",
    images: [
      {
        url: "https://mohamedmowafydev.vercel.app/me.png",
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
    images: ["https://mohamedmowafydev.vercel.app/me.png"],
    creator: "@mohamedhabib102",
  },
};

export default async function SkillsPage() {
  const initialSkills = await portfolioStore.getSkills();

  return <SkillsClient initialSkills={initialSkills} />;
}
