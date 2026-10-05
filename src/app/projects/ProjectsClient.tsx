"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ShapeDivider from "@/components/ui/ShapeDivider";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { FiArrowLeft, FiFilter, FiFolder } from "react-icons/fi";

interface ProjectsClientProps {
  initialProjects?: any[];
}

export default function ProjectsClient({ initialProjects = [] }: ProjectsClientProps) {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();

  const [selectedTag, setSelectedTag] = useState<string>("All");

  const projects = (initialProjects || []).filter((p: any) => !p.isHidden);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p: any) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((tag: string) => tagSet.add(tag));
      }
    });
    return ["All", ...Array.from(tagSet)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") return projects;
    return projects.filter(
      (p: any) => Array.isArray(p.tags) && p.tags.includes(selectedTag)
    );
  }, [projects, selectedTag]);

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-blue-600 selection:text-white relative">
      {/* Top Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex items-center justify-between border-b border-neutral-100"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-normal text-neutral-600 hover:text-neutral-950 transition-colors group"
        >
          <FiArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isRtl ? "rotate-180 group-hover:translate-x-1" : ""}`} />
          <span>{t.backToHome}</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <AdminHeaderBadge variant="light" />
          <LanguageToggle variant="light" />
        </div>
      </motion.header>

      {/* Floating Navigation Dock (Sticks 20px from top on scroll) */}
      <div className="w-full flex justify-center py-4">
        <FloatingDock />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-14 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-xs font-mono text-neutral-700 mb-3 border border-neutral-200">
            <FiFolder className="w-3.5 h-3.5 text-blue-600" />
            <span>{isRtl ? `إجمالي المشاريع المنجزة: ${projects.length}` : `Curated Portfolio (${projects.length} Projects)`}</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-950 mb-4 ${
              isRtl ? "leading-[1.3] tracking-normal" : "tracking-tight"
            }`}
          >
            {t.impressiveWorks}
          </h1>
          <p
            className={`text-base sm:text-lg text-neutral-600 font-normal ${
              isRtl ? "leading-[1.85]" : "leading-relaxed"
            }`}
          >
            {t.projectsPersonalNote}
          </p>
        </motion.div>

        {/* Filter Pills */}
        {allTags.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none"
          >
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 me-2 shrink-0">
              <FiFilter className="w-3.5 h-3.5" />
              <span>{isRtl ? "فلترة:" : "Filter:"}</span>
            </span>

            {allTags.map((tag) => {
              const isActive = selectedTag === tag;
              const displayLabel = tag === "All" ? (language === "ar" ? "الكل" : "All") : tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-neutral-950 text-white shadow-sm scale-105"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200/60"
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
          >
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((project: any, index: number) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="col-span-2 text-center py-20 px-4 bg-neutral-50 rounded-3xl border border-neutral-100">
                <p className="text-neutral-500 text-base">
                  {isRtl ? "لا توجد مشاريع مضافة تحت هذا التصنيف." : "No projects found under this tag."}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reusable Contact Section */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
