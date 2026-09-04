"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProjects } from "@/features/projects/hooks/useProjects";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { FiArrowLeft } from "react-icons/fi";

export default function AllProjectsPage() {
  const { t, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { data: projects, isLoading } = useProjects(false);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Top Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex items-center justify-between border-b border-neutral-100"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-normal text-neutral-600 hover:text-neutral-950 transition-colors"
        >
          <FiArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{t.backToHome}</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <AdminHeaderBadge />
          <LanguageToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-14 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-950 mb-3">
            {t.impressiveWorks}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {t.projectsPersonalNote}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-[16/10] bg-neutral-100 rounded-3xl" />
                <div className="h-5 bg-neutral-100 rounded w-1/3" />
              </div>
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-neutral-400">
              No projects available.
            </div>
          )}
        </div>
      </div>

      {/* Floating Navigation Dock */}
      <div className="w-full flex justify-center pb-12">
        <FloatingDock />
      </div>

      {/* Reusable Contact Section: 'Got a project in mind? Let's talk' */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
