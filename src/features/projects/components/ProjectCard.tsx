"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "../types";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiArrowRight } from "react-icons/fi";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 45, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-3"
    >
      {/* Pure video container - NO static poster images */}
      <Link
        href={`/projects/${project.slug || project.id}`}
        className="relative block w-full aspect-[16/10] rounded-3xl sm:rounded-[30px] overflow-hidden bg-neutral-900 shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
      >
        <video
          ref={videoRef}
          src={project.videoUrl || "/test.mp4"}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Title with circular arrow icon matching Figma */}
      <div className="flex items-center gap-2.5 pt-1">
        <Link
          href={`/projects/${project.slug || project.id}`}
          className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-normal text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-neutral-400 text-neutral-800 shrink-0">
            <FiArrowRight
              className={`w-3.5 h-3.5 ${
                isRtl ? "rotate-180" : ""
              }`}
            />
          </span>
          <h3 className="tracking-tight text-neutral-900">{title}</h3>
        </Link>
      </div>
    </motion.article>
  );
}
