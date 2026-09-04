import { portfolioStore } from "@/lib/store";
import HeroSection from "@/features/hero/components/HeroSection";
import ProjectsSection from "@/features/projects/components/ProjectsSection";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";

export default async function HomePage() {
  const siteConfig = await portfolioStore.getSiteConfig();

  return (
    <main className="relative flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Section: render dynamic config instantly on server, ZERO flicker or lag */}
      <HeroSection initialConfig={siteConfig} />

      {/* 2. Impressive Works / Projects Section */}
      <ProjectsSection />

      {/* 3. Contact Section */}
      <ContactSection />

      {/* 4. Footer Section */}
      <FooterSection initialConfig={siteConfig} />
    </main>
  );
}
