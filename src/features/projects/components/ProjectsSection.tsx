"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectsSection({ initialProjects = [] }: { initialProjects?: any[] }) {
  const { t, isRtl } = useTranslation();

  // Pure Next.js SSG with ISR data (zero client-side fetching delay)
  const allProjects = initialProjects || [];
  const homeProjects = allProjects.slice(0, 4);

  return (
    <section
      id="works"
      className="relative w-full pt-28 sm:pt-40 pb-16 px-6 sm:px-12 lg:px-20 bg-white text-neutral-900"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* 1. Top Split Intro with ample clearance for top floating dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16 sm:mb-24"
        >
          {/* Left Intro */}
          <div className="md:col-span-8 lg:col-span-8">
            <p className="text-xl sm:text-2xl md:text-[27px] font-normal leading-[1.4] text-neutral-900 tracking-tight">
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

        {/* 2. Heading row: 'Impressive Works' and user's personal description with generous vertical space */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-3 mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-medium tracking-tight text-neutral-950 leading-tight">
            {t.impressiveWorks}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal max-w-2xl leading-relaxed mt-2 sm:mt-4">
            {t.projectsPersonalNote}
          </p>
        </motion.div>

        {/* 3. Projects 2x2 Grid (Only 4 on Homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {homeProjects.length > 0 ? (
            homeProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16 px-4 bg-neutral-50 rounded-3xl border border-neutral-100">
              <p className="text-neutral-500 text-base">
                {isRtl ? "لا توجد مشاريع مضافة حالياً في قاعدة البيانات." : "No projects currently in database."}
              </p>
            </div>
          )}
        </div>

        {/* 4. 'Explore more' button */}
        {allProjects && allProjects.length > 4 && (
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-[13px] font-normal text-neutral-800 transition-colors shadow-xs hover:scale-105 active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              <span>{t.exploreMore} ({allProjects.length})</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
