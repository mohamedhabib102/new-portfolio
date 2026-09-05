"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { 
  FiDownload, 
  FiLayers, 
  FiCpu, 
  FiUser, 
  FiCheckCircle, 
  FiArrowUpRight,
  FiMail
} from "react-icons/fi";
import { IoLogoLinkedin } from "react-icons/io5";

export default function ResumeClient() {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();

  const isAr = language === "ar";

  const cards = [
    {
      id: "linkedin",
      title: isAr ? "ملف لينكد إن الموثق" : "Verified LinkedIn Profile",
      subtitle: isAr
        ? "تواصل معي مهنياً واطلع على التوصيات والشبكة المهنية وتفاصيل الخبرات الرسمية."
        : "Connect professionally, view peer recommendations, endorsements, and verified career milestones.",
      badge: isAr ? "تواصل مهني" : "Professional Network",
      href: "https://www.linkedin.com/in/habib-mowafy",
      isExternal: true,
      icon: <IoLogoLinkedin className="w-6 h-6 text-[#0A66C2]" />,
      accentColor: "from-blue-600/20 to-cyan-500/10",
      borderColor: "hover:border-[#0A66C2]/50",
    },
    {
      id: "projects",
      title: isAr ? "المشاريع الهندسية والمعمارية" : "Featured Projects & Architecture",
      subtitle: isAr
        ? "استكشف مشاريع الإنتاج الحية، المعاينات السريعة، مؤشرات الأداء، والأكواد المصدرية."
        : "Explore production web applications, live interactive demos, Lighthouse performance metrics, and codebases.",
      badge: isAr ? "معاينات حية" : "Live Demos",
      href: "/projects",
      isExternal: false,
      icon: <FiLayers className="w-6 h-6 text-purple-400" />,
      accentColor: "from-purple-600/20 to-pink-500/10",
      borderColor: "hover:border-purple-500/50",
    },
    {
      id: "skills",
      title: isAr ? "المهارات والتقنيات البرمجية" : "Technical Skills & Tooling",
      subtitle: isAr
        ? "Next.js 16، React 19، TypeScript، GSAP، Tailwind CSS، وهندسة واجهات الذكاء الاصطناعي."
        : "Next.js 16, React 19, TypeScript, GSAP, Tailwind CSS, Core Web Vitals, and modern AI engineering workflows.",
      badge: isAr ? "الترسانة التقنية" : "Tech Stack",
      href: "/skills",
      isExternal: false,
      icon: <FiCpu className="w-6 h-6 text-emerald-400" />,
      accentColor: "from-emerald-600/20 to-teal-500/10",
      borderColor: "hover:border-emerald-500/50",
    },
    {
      id: "about",
      title: isAr ? "نبذة عني ومسيرتي في Serv5" : "About My Journey & Serv5 Impact",
      subtitle: isAr
        ? "تعرف على خلفيتي الهندسية، مسيرتي العملية في شركة Serv5، وفلسفتي في بناء الواجهات."
        : "Read my engineering journey, corporate experience at Serv5, and philosophy in crafting modern user experiences.",
      badge: isAr ? "الخبرة والمسيرة" : "Biography",
      href: "/about",
      isExternal: false,
      icon: <FiUser className="w-6 h-6 text-amber-400" />,
      accentColor: "from-amber-600/20 to-orange-500/10",
      borderColor: "hover:border-amber-500/50",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex items-center justify-between"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group text-white/95 font-normal tracking-tight text-sm sm:text-base hover:text-neutral-300 transition-colors"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-sm bg-neutral-900 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/avatar.png"
              alt="Mohamed H. Mowafy Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span>{t.codeBy}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <AdminHeaderBadge />
          <LanguageToggle />
        </div>
      </motion.header>

      {/* 2. Hero & Status Announcement */}
      <section className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 pt-6 pb-16 text-center select-none">
        {/* Glow backdrop decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Pulsing Live Update Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-medium mb-8 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span>
            {isAr
              ? "جاري تحديث وتطوير السيرة الذاتية • إصدار 2026"
              : "CV Currently Being Refreshed • 2026 Revision"}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`font-medium text-white mb-6 ${
            isRtl ? "leading-[1.3] tracking-normal" : "tracking-tight leading-tight"
          }`}
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
          }}
        >
          {isAr ? "السيرة الذاتية والملف المهني" : "Curriculum Vitae & Career"}
        </motion.h1>

        {/* Subtitle / Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`max-w-3xl mx-auto text-base sm:text-lg text-neutral-300 font-light mb-10 ${
            isRtl ? "leading-[1.9]" : "leading-relaxed"
          }`}
        >
          {isAr
            ? "أعمل حالياً على تحديث السيرة الذاتية الرسمية لإضافة أحدث الإنجازات المعمارية، وتحسينات أداء الواجهات لعام 2026 في منصة Serv5، وتطبيقات الواجهات التفاعلية الحديثة. يمكنك في هذه الأثناء استكشاف مشاريعي الحية، أو مراجعة مهاراتي، أو تحميل النسخة السابقة من السيرة الذاتية أدناه."
            : "My official CV is undergoing an extensive revision to include recent frontend architecture benchmarks at Serv5, 2026 performance revamps, and advanced interactive engineering work. In the meantime, feel free to explore my verified live projects, skills, or download the previous CV PDF below."}
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {/* Download PDF Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Mohamed_Mowafy_CV.pdf"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all duration-200 shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiDownload className="w-4 h-4" />
            <span>{isAr ? "تحميل النسخة السابقة (PDF)" : "Download Previous CV (PDF)"}</span>
          </a>

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiMail className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? "تواصل معي مباشرة" : "Get in Touch Directly"}</span>
          </a>
        </motion.div>
      </section>

      {/* 3. Interactive Bento Grid of Quick-Access Portals */}
      <section className="relative w-full max-w-6xl mx-auto px-6 sm:px-10 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-sm uppercase tracking-widest text-neutral-400 font-mono">
            {isAr ? "بوابات الاستكشاف السريع" : "Quick Access Portals"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const isExternal = card.isExternal;
            const CardWrapper = isExternal ? "a" : Link;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="group relative"
              >
                <CardWrapper
                  href={card.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`block h-full p-8 rounded-3xl bg-[#0f1118]/80 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${card.borderColor} backdrop-blur-sm relative overflow-hidden`}
                >
                  {/* Subtle top glow highlight */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    {/* Top Row: Icon + Badge + Arrow */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-normal bg-white/5 text-neutral-300 border border-white/10">
                          {card.badge}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-white/15 transition-all">
                          <FiArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isRtl ? "-scale-x-100" : ""}`} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={`text-xl sm:text-2xl font-medium text-white mb-2 group-hover:text-cyan-300 transition-colors ${
                          isRtl ? "leading-snug" : "tracking-tight"
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-neutral-300 text-sm font-light ${
                          isRtl ? "leading-relaxed" : "leading-relaxed"
                        }`}
                      >
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span className="inline-flex items-center gap-1.5 text-neutral-300">
                        <FiCheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isAr ? "متاح ومحدث" : "Verified & Live"}</span>
                      </span>
                      <span className="group-hover:text-white transition-colors">
                        {isAr ? "انقر للمتابعة ←" : "Explore →"}
                      </span>
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Dock integration */}
        <div className="flex justify-center mt-16">
          <FloatingDock />
        </div>
      </section>

      {/* 4. Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* 5. Footer Section */}
      <FooterSection />
    </main>
  );
}
