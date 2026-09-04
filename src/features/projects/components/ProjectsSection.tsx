"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectsSection() {
  const { t, isRtl } = useTranslation();
  const { data: projects, isLoading } = useProjects(true);

  return (
    <section
      id="works"
      className="relative w-full pt-16 sm:pt-24 pb-14 px-6 sm:px-12 lg:px-20 bg-white text-neutral-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* 1. Top Split Intro matching Figma Image 3 (Scroll Animated) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16 sm:mb-20"
        >
          {/* Left Intro */}
          <div className="md:col-span-8 lg:col-span-8">
            <p className="text-xl sm:text-2xl md:text-[27px] font-normal leading-[1.35] text-neutral-900 tracking-tight">
              {t.drivenByCuriosity}
            </p>
          </div>

          {/* Right: More about me link directly to /about */}
          <div
            className={`md:col-span-4 lg:col-span-4 flex items-center ${
              isRtl ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <Link
              href="/about"
              id="more-about-me-btn"
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-normal text-neutral-900 hover:text-blue-600 transition-colors group"
            >
              <span>{t.moreAboutMe}</span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-400 group-hover:border-blue-600 transition-colors">
                <FiArrowUpRight className="w-3.5 h-3.5 text-neutral-700 group-hover:text-blue-600" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* 2. Heading row: 'Impressive Works' and user's personal description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-2 mb-10 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-neutral-950 leading-tight">
            {t.impressiveWorks}
          </h2>
          {/* User requested description */}
          <p className="text-sm sm:text-base text-neutral-600 font-normal max-w-2xl leading-relaxed">
            {t.projectsPersonalNote}
          </p>
        </motion.div>

        {/* 3. Projects 2x2 Grid with pure Video Cards */}
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

        {/* 4. 'Explore more' button matching Figma Image 5 exactly */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-12 sm:mt-14"
        >
          <Link
            href="/projects"
            id="explore-more-projects-btn"
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-[12px] sm:text-[13px] font-normal text-neutral-800 transition-colors shadow-xs hover:scale-105 active:scale-95"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
            <span>{t.exploreMore}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
