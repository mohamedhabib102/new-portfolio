"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "../types";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiArrowUpRight, FiClock } from "react-icons/fi";

interface BlogCardProps {
  blog: BlogPost;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const { language, isRtl, t } = useTranslation();

  const title = language === "ar" ? blog.titleAr : blog.titleEn;
  const excerpt = language === "ar" ? blog.excerptAr : blog.excerptEn;
  const category = language === "ar" ? blog.categoryAr : blog.categoryEn;
  const readTime = language === "ar" ? blog.readTimeAr : blog.readTimeEn;
  const authorRole = language === "ar" ? blog.author.roleAr : blog.author.roleEn;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between bg-[#12141a] border border-white/8 hover:border-white/20 rounded-[28px] overflow-hidden transition-all duration-300 shadow-xl"
    >
      {/* 1. Cover Image Container with Hover Scale */}
      <Link href={`/blogs/${blog.id}`} className="relative w-full aspect-[16/9] overflow-hidden block">
        <Image
          src={blog.coverImage}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-normal bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-sm">
            {category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-black/75 backdrop-blur-md text-white/90 border border-white/10 shadow-sm">
            <FiClock className="w-3 h-3 text-neutral-300" />
            <span>{readTime}</span>
          </span>
        </div>
      </Link>

      {/* 2. Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
        <div className="flex flex-col gap-3">
          <Link href={`/blogs/${blog.id}`} className="group-hover:text-blue-400 transition-colors">
            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight leading-snug">
              {title}
            </h3>
          </Link>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* 3. Bottom Author & Read Link Bar */}
        <div className="pt-4 border-t border-white/8 flex items-center justify-between">
          {/* Author info (Habib - Owner of the site) */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-cyan-400/40 relative shrink-0 bg-cyan-400/10">
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={36}
                height={36}
                className="object-cover scale-125"
              />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-normal text-white">{blog.author.name}</span>
              <span className="text-neutral-400 font-light">{authorRole}</span>
            </div>
          </div>

          {/* Read Arrow Button */}
          <Link
            href={`/blogs/${blog.id}`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-black border border-white/10 transition-all duration-300 shadow-md"
            aria-label={t.readArticle}
            title={t.readArticle}
          >
            <FiArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isRtl ? "group-hover:-rotate-90" : "group-hover:rotate-45"}`} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
