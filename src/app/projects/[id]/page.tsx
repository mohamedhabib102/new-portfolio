"use client";

import React, { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProjectDetail } from "@/features/projects/hooks/useProjects";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { FiArrowLeft, FiExternalLink, FiGithub, FiLock, FiShield } from "react-icons/fi";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, language, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { data: project, isLoading, isError } = useProjectDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project || isError) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-normal">Project not found</h2>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          {t.backToHome}
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? project.titleAr : project.titleEn;
  const description = language === "ar" ? project.descriptionAr : project.descriptionEn;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 1. Top Header with Mount Animation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between border-b border-neutral-100"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-normal text-neutral-600 hover:text-neutral-950 transition-colors"
        >
          <FiArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{t.backToHome}</span>
        </Link>
        <LanguageToggle />
      </motion.header>

      {/* 2. Project Content with Mount Animations */}
      <article className="max-w-6xl mx-auto px-6 sm:px-10 pt-12 pb-20">
        {/* Title & Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-normal rounded-full bg-neutral-100 text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-950 mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed font-normal">
            {description}
          </p>
        </motion.div>

        {/* Video Player (NO controls, autoPlay muted loop) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video rounded-3xl sm:rounded-[28px] overflow-hidden bg-neutral-950 shadow-lg mb-8 relative"
        >
          <video
            src={project.videoUrl || "/test.mp4"}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 pt-2 mb-12"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-normal text-sm transition-colors shadow-sm"
            >
              <span>{t.livePreview}</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubPrivate ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-200 font-normal text-xs sm:text-sm shadow-sm select-none" title={language === "ar" ? "الكود المصدري خاص ومحمي باتفاقية سرية مع العميل / الشركة" : "Source code is private and protected by NDA / Client Agreement"}>
              <FiLock className="w-3.5 h-3.5 text-amber-400" />
              <FiGithub className="w-3.5 h-3.5 text-neutral-400" />
              <span>
                {language === "ar"
                  ? "مستودع خاص (مشروع عميل / كود غير متاح للعامة)"
                  : "Private Repository (Client NDA Protected)"}
              </span>
            </div>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-normal text-sm transition-colors shadow-sm"
            >
              <FiGithub className="w-3.5 h-3.5" />
              <span>{t.sourceCode}</span>
            </a>
          ) : null}
        </motion.div>

        {/* 3. Rich Features & Key Highlights */}
        {(() => {
          const features = language === "ar" ? (project.featuresAr || project.featuresEn) : (project.featuresEn || project.featuresAr);
          if (!features || features.length === 0) return null;
          return (
            <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80">
              <h3 className="text-xl font-semibold text-neutral-950 mb-4 flex items-center gap-2">
                <span>{language === "ar" ? "أبرز الميزات والخصائص التقنية" : "Key Highlights & Core Features"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-neutral-200/60 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="text-sm text-neutral-700 leading-relaxed font-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* 4. Structured Technical Sections & Code Architecture */}
        {(() => {
          const sections = language === "ar" ? (project.sectionsAr || project.sectionsEn) : (project.sectionsEn || project.sectionsAr);
          if (!sections || sections.length === 0) return null;
          return (
            <div className="flex flex-col gap-10 border-t border-neutral-200 pt-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950">
                {language === "ar" ? "التفاصيل الهندسية والمعمارية البرمجية" : "Architecture & Technical Deep-Dive"}
              </h2>

              {sections.map((sec, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 font-mono text-xs font-semibold mt-1">
                      {idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-neutral-950 tracking-tight leading-snug">
                      {sec.heading}
                    </h3>
                  </div>

                  <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal pl-0 sm:pl-10">
                    {sec.body}
                  </p>

                  {sec.code && (
                    <div className="relative mt-2 rounded-2xl bg-[#0d1017] border border-neutral-800 overflow-hidden shadow-xl pl-0 sm:ml-10" dir="ltr">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                          <span className="text-[11px] text-neutral-400 font-mono ml-2">Architecture Code</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof navigator !== "undefined" && navigator.clipboard) {
                              navigator.clipboard.writeText(sec.code!);
                              alert(isRtl ? "تم نسخ الكود!" : "Code copied to clipboard!");
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-[11px] transition-colors cursor-pointer"
                        >
                          {isRtl ? "نسخ الكود" : "Copy Code"}
                        </button>
                      </div>
                      <pre className="p-5 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto selection:bg-cyan-500 selection:text-black">
                        <code>{sec.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })()}
      </article>

      {/* Floating Navigation Dock */}
      <div className="w-full flex justify-center pb-12">
        <FloatingDock />
      </div>

      {/* 3. Reusable Contact Section: 'Got a project in mind? Let's talk' */}
      <ContactSection />

      {/* 4. Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
