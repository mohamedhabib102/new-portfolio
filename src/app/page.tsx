import { portfolioStore } from "@/lib/store";
import HeroSection from "@/features/hero/components/HeroSection";
import ProjectsSection from "@/features/projects/components/ProjectsSection";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohamed H. Mowafy | Senior Frontend Engineer & UI Specialist",
  description:
    "Senior Frontend Engineer specializing in Next.js, React 19, TypeScript, GSAP animations, Tailwind CSS, and Web Performance Optimization. Crafting fast, responsive, and pixel-perfect web experiences.",
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app",
  },
  openGraph: {
    title: "Mohamed H. Mowafy | Senior Frontend Engineer & UI Specialist",
    description:
      "Senior Frontend Engineer specializing in Next.js, React 19, TypeScript, and modern web experiences.",
    url: "https://mohamedmowafydev.vercel.app",
    type: "website",
    images: [{ url: "/avatar.png", width: 800, height: 800, alt: "Mohamed H. Mowafy" }],
  },
};

// SSG with ISR: Static generation revalidated every 10 days (864,000s) or immediately on new build
export const revalidate = 864000;

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
