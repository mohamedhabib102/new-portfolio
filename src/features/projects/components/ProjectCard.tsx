"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "../types";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiArrowRight, FiImage, FiLock } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { language, isRtl } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video reliably autoplays on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const title = language === "ar" ? project.titleAr : project.titleEn;
  const imageCount = Array.isArray(project.images) ? project.images.filter(Boolean).length : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-3.5"
    >
      {/* Pure video container - Video is the Cover */}
      <Link
        href={`/projects/${project.slug || project.id}`}
        className="relative block w-full aspect-[16/10] rounded-3xl sm:rounded-[30px] overflow-hidden bg-neutral-900 shadow-sm transition-all duration-300 group-hover:scale-[1.015] group-hover:shadow-xl border border-neutral-100 group-hover:border-neutral-300"
      >
        <video
          ref={videoRef}
          src={project.videoUrl || "/test.mp4"}
          poster={project.coverImage || (Array.isArray(project.images) && project.images[0]) || undefined}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges: Status (Under Dev vs Production) + Gallery photos count + Private NDA badge */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            {project.status === "in_development" ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/95 backdrop-blur-md text-black text-[11px] font-semibold shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span>{language === "ar" ? "تحت التطوير" : "In Development"}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-mono shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{language === "ar" ? "برودكشن" : "Production"}</span>
              </span>
            )}

            {imageCount > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono shadow-sm">
                <FiImage className="w-3 h-3 text-cyan-400" />
                <span>+{imageCount} {language === "ar" ? "صور" : "photos"}</span>
              </span>
            )}
          </div>

          {project.githubPrivate && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-amber-400/30 text-amber-300 text-[10px] font-mono shadow-sm">
              <FiLock className="w-3 h-3 text-amber-400" />
              <span>NDA</span>
            </span>
          )}
        </div>

        {/* Bottom Tag Preview on hover */}
        {project.tags && project.tags.length > 0 && (
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center gap-1.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {project.tags.slice(0, 3).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      {/* Title with circular arrow icon */}
      <div className="flex items-center justify-between gap-3 pt-0.5">
        <Link
          href={`/projects/${project.slug || project.id}`}
          className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-medium text-neutral-950 group-hover:text-blue-600 transition-colors"
        >
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300 group-hover:border-blue-600 text-neutral-800 group-hover:text-blue-600 shrink-0 transition-all duration-300 group-hover:translate-x-0.5">
            <FiArrowRight
              className={`w-3.5 h-3.5 ${
                isRtl ? "rotate-180 group-hover:-translate-x-0.5" : ""
              }`}
            />
          </span>
          <h3 className="tracking-tight">{title}</h3>
        </Link>
      </div>
    </motion.article>
  );
}
