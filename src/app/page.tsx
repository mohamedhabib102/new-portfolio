import { portfolioStore } from "@/lib/store";
import HeroSection from "@/features/hero/components/HeroSection";
import ProjectsSection from "@/features/projects/components/ProjectsSection";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";

import type { Metadata } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Mohamed H. Mowafy | Frontend Engineer & UI Specialist",
  description:
    "Frontend Engineer specializing in Next.js, React 19, TypeScript, GSAP animations, Tailwind CSS, and Web Performance Optimization. Crafting fast, responsive, and pixel-perfect web experiences.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Mohamed H. Mowafy | Frontend Engineer & UI Specialist",
    description:
      "Frontend Engineer specializing in Next.js, React 19, TypeScript, and modern web experiences.",
    url: siteUrl,
    type: "website",
    images: [{ url: "/avatar.png", width: 800, height: 800, alt: "Mohamed H. Mowafy" }],
  },
};

// Dynamic Server-Side Rendering (SSR): rendered on the server on every request with fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [siteConfig, projects] = await Promise.all([
    portfolioStore.getSiteConfig(),
    portfolioStore.getProjects(),
  ]);

  return (
    <main className="relative flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Section: render dynamic config instantly on server, ZERO flicker or lag */}
      <HeroSection initialConfig={siteConfig} />

      {/* 2. Impressive Works / Projects Section (SSR: rendered instantly on server) */}
      <ProjectsSection initialProjects={projects} />

      {/* 3. Contact Section */}
      <ContactSection />

      {/* 4. Footer Section */}
      <FooterSection initialConfig={siteConfig} />
    </main>
  );
}
