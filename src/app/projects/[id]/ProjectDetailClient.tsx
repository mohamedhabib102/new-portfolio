"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectDetail } from "@/features/projects/hooks/useProjects";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ShapeDivider from "@/components/ui/ShapeDivider";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { 
  FiArrowLeft, 
  FiExternalLink, 
  FiGithub, 
  FiLock, 
  FiPlay, 
  FiImage, 
  FiLayers, 
  FiCheckCircle, 
  FiCopy, 
  FiCheck,
  FiMaximize2,
  FiBriefcase
} from "react-icons/fi";

interface ProjectDetailClientProps {
  id: string;
  initialProject?: any;
}

export default function ProjectDetailClient({ id, initialProject }: ProjectDetailClientProps) {
  const { t, language, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { data: projectData, isLoading, isError } = useProjectDetail(id, initialProject);

  const project = initialProject || projectData;

  // Active media viewer state: 'video' | index (number) for image
  const [activeMedia, setActiveMedia] = useState<"video" | number>("video");
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  if (isLoading && !project) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <div className="w-9 h-9 border-2 border-neutral-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project || (isError && !project)) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="text-2xl font-medium text-neutral-900">
          {language === "ar" ? "المشروع غير موجود" : "Project not found"}
        </h2>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          {t.backToHome}
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? project.titleAr : project.titleEn;
  const description = language === "ar" ? project.descriptionAr : project.descriptionEn;
  const galleryImages: string[] =
    Array.isArray(project.images) && project.images.length > 0
      ? project.images.filter(Boolean)
      : (project.coverImage ? [project.coverImage] : []);

  const handleCopyCode = (code: string, idx: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-blue-600 selection:text-white relative">
      {/* 1. Top Header with Mount Animation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-7 flex items-center justify-between border-b border-neutral-100"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-normal text-neutral-600 hover:text-neutral-950 transition-colors group"
        >
          <FiArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isRtl ? "rotate-180 group-hover:translate-x-1" : ""}`} />
          <span>{isRtl ? "كافة المشاريع" : "All Projects"}</span>
        </Link>
        <div className="flex items-center gap-3">
          <AdminHeaderBadge variant="light" />
          <LanguageToggle variant="light" />
        </div>
      </motion.header>

      {/* Floating Navigation Dock (Sticks 20px from top on scroll) */}
      <div className="w-full flex justify-center py-3">
        <FloatingDock />
      </div>

      {/* 2. Main Article Showcase */}
      <article className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 pb-20">
        {/* Title & Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          {/* Tags & Status Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.status === "in_development" && (
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{language === "ar" ? "قيد التطوير المستمر (In Development)" : "Under Active Development"}</span>
              </span>
            )}

            {project.company && (
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5 shadow-xs">
                <FiBriefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "ar" ? `تم العمل مع: ${project.company}` : `Client / Company: ${project.company}`}</span>
              </span>
            )}

            {project.tags && project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/70 hover:bg-neutral-200/80 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-950 mb-5 ${
              isRtl
                ? "leading-[1.38] sm:leading-[1.42] tracking-normal"
                : "leading-tight sm:leading-[1.15] tracking-tight"
            }`}
          >
            {title}
          </h1>

          {/* Project Description */}
          <p
            className={`text-base sm:text-lg text-neutral-600 max-w-3xl font-normal ${
              isRtl ? "leading-[1.9] sm:leading-[2.0]" : "leading-relaxed"
            }`}
          >
            {description}
          </p>

          {/* Development Notice Banner */}
          {project.status === "in_development" && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-600 shrink-0 mt-0.5">
                <FiLayers className="w-4 h-4" />
              </span>
              <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <strong className="font-semibold text-neutral-950 block mb-0.5">
                  {language === "ar" ? "مشروع قيد التطوير البرمجي النشط" : "Active Development & Continuous Deployment"}
                </strong>
                {language === "ar"
                  ? "يتم بناء وتحديث هذه المنصة السحابية بشكل مستمر، ويمكنك معاينة التجربة الحية الحالية عبر رابط Live Preview ومتابعة كافة الإضافات القادمة."
                  : "This platform is actively undergoing engineering iterations. You can explore the live demo via Live Preview to test features as they launch."}
              </div>
            </div>
          )}
        </motion.div>

        {/* 3. Interactive Main Media Showcase Stage */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video rounded-3xl sm:rounded-[32px] overflow-hidden bg-neutral-950 shadow-2xl border border-neutral-900 mb-6 group"
        >
          <AnimatePresence mode="wait">
            {activeMedia === "video" ? (
              <motion.div
                key="video-player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full relative"
              >
                <video
                  src={project.videoUrl || "/test.mp4"}
                  poster={project.coverImage || (galleryImages.length > 0 ? galleryImages[0] : undefined)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top Badge: Active Video Indicator */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isRtl ? "فيديو المشروع (الغلاف الرئيسي)" : "Main Video Cover"}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`gallery-image-${activeMedia}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full relative bg-neutral-950 flex items-center justify-center"
              >
                <Image
                  src={galleryImages[activeMedia as number]}
                  alt={`${project.titleEn} - screenshot ${(activeMedia as number) + 1}`}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />

                {/* Active Photo Info Badge & Quick Switch back to Video */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                  <FiImage className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {isRtl
                      ? `صورة ${(activeMedia as number) + 1} من ${galleryImages.length}`
                      : `Photo ${(activeMedia as number) + 1} of ${galleryImages.length}`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveMedia("video")}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-medium backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <FiPlay className="w-3.5 h-3.5 fill-current" />
                  <span>{isRtl ? "العودة للفيديو" : "Play Video"}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 4. Thumbnails Gallery Strip (Video Cover + Gallery Photos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full mb-10 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider flex items-center gap-2">
              <FiLayers className="w-3.5 h-3.5 text-blue-600" />
              <span>{isRtl ? "معرض وسائط المشروع (اضغط للتبديل والعرض)" : "Project Media Gallery (Click to preview)"}</span>
            </span>

            <span className="text-xs font-mono text-neutral-400">
              {galleryImages.length > 0
                ? (isRtl ? `1 فيديو • ${galleryImages.length} صور` : `1 Video • ${galleryImages.length} Photos`)
                : (isRtl ? "فيديو المعاينة" : "Video Preview")}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none pt-1">
            {/* 1. Main Video Thumbnail */}
            <button
              type="button"
              onClick={() => setActiveMedia("video")}
              className={`group relative shrink-0 w-28 sm:w-36 aspect-video rounded-2xl overflow-hidden bg-neutral-900 border-2 transition-all duration-200 cursor-pointer ${
                activeMedia === "video"
                  ? "border-blue-600 ring-2 ring-blue-500/30 scale-105 shadow-md"
                  : "border-neutral-200 hover:border-blue-400 opacity-80 hover:opacity-100"
              }`}
              title={isRtl ? "عرض فيديو المشروع" : "Show project video"}
            >
              <video
                src={project.videoUrl || "/test.mp4"}
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <FiPlay className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                {isRtl ? "فيديو" : "Video"}
              </span>
            </button>

            {/* 2. Additional Image Thumbnails */}
            {galleryImages.map((imgUrl, imgIdx) => {
              const isSelected = activeMedia === imgIdx;
              return (
                <button
                  key={imgIdx}
                  type="button"
                  onClick={() => setActiveMedia(imgIdx)}
                  className={`group relative shrink-0 w-28 sm:w-36 aspect-video rounded-2xl overflow-hidden bg-neutral-100 border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/30 scale-105 shadow-md"
                      : "border-neutral-200 hover:border-blue-400 opacity-80 hover:opacity-100"
                  }`}
                  title={isRtl ? `عرض الصورة ${imgIdx + 1}` : `Preview photo ${imgIdx + 1}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Thumbnail ${imgIdx + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                    #{imgIdx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 5. Action Buttons (Live Preview & GitHub) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 pt-2 mb-14"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-[0_10px_25px_rgba(59,90,251,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{t.livePreview}</span>
              <FiExternalLink className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </a>
          )}

          {project.githubUrl && !project.githubPrivate ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FiGithub className="w-4 h-4" />
              <span>{t.sourceCode}</span>
            </a>
          ) : (
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 font-normal text-xs sm:text-sm select-none"
              title={
                language === "ar"
                  ? "الكود المصدري خاص ومحمي باتفاقية سرية مع العميل / الشركة"
                  : "Source code is private and protected by NDA / Client Agreement"
              }
            >
              <FiLock className="w-4 h-4 text-amber-600" />
              <FiGithub className="w-4 h-4 text-neutral-600" />
              <span>
                {language === "ar"
                  ? "الكود المصدري خاص ومحمي (NDA)"
                  : "Source Code Private (NDA)"}
              </span>
            </div>
          )}
        </motion.div>

        {/* 6. Rich Features & Key Highlights */}
        {(() => {
          const features =
            language === "ar"
              ? project.featuresAr || project.featuresEn
              : project.featuresEn || project.featuresAr;
          if (!features || features.length === 0) return null;
          return (
            <div className="mb-14 p-7 sm:p-10 rounded-3xl bg-neutral-50/80 border border-neutral-200/80 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-950 mb-6 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>{language === "ar" ? "أبرز الميزات والخصائص التقنية" : "Key Highlights & Core Features"}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200/70 shadow-xs hover:border-blue-400 transition-colors">
                    <FiCheckCircle className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <span className="text-sm text-neutral-800 leading-relaxed font-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* 7. Structured Technical Sections & Code Architecture */}
        {(() => {
          const sections =
            language === "ar"
              ? project.sectionsAr || project.sectionsEn
              : project.sectionsEn || project.sectionsAr;
          if (!sections || sections.length === 0) return null;
          return (
            <div className="flex flex-col gap-12 border-t border-neutral-200 pt-12">
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-semibold text-neutral-950 ${
                    isRtl ? "tracking-normal leading-snug" : "tracking-tight"
                  }`}
                >
                  {language === "ar" ? "التفاصيل الهندسية والمعمارية البرمجية" : "Architecture & Technical Deep-Dive"}
                </h2>
                <p className="text-sm text-neutral-500 font-light mt-1">
                  {language === "ar"
                    ? "شرح الهيكلية البرمجية ومنطق الأكواد المستخدم في هذا المشروع"
                    : "Implementation breakdown and architecture patterns applied"}
                </p>
              </div>

              {sections.map((sec: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 font-mono text-xs font-semibold mt-0.5">
                      {idx + 1}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-medium text-neutral-950 ${
                        isRtl ? "tracking-normal leading-normal" : "tracking-tight leading-snug"
                      }`}
                    >
                      {sec.heading}
                    </h3>
                  </div>

                  <p
                    className={`text-neutral-600 text-base sm:text-lg font-normal ps-0 sm:ps-11 ${
                      isRtl ? "leading-[1.85]" : "leading-relaxed"
                    }`}
                  >
                    {sec.body}
                  </p>

                  {sec.code && (
                    <div
                      className="relative mt-2 rounded-2xl bg-[#0c0e14] border border-neutral-800 overflow-hidden shadow-2xl ms-0 sm:ms-11"
                      dir="ltr"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                          <span className="text-[11px] text-neutral-400 font-mono ml-2">Architecture Code</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(sec.code!, idx)}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-[11px] transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5"
                        >
                          {copiedCodeIdx === idx ? (
                            <>
                              <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">{isRtl ? "تم النسخ!" : "Copied!"}</span>
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-3.5 h-3.5" />
                              <span>{isRtl ? "نسخ الكود" : "Copy Code"}</span>
                            </>
                          )}
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

      {/* Reusable Contact Section */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
