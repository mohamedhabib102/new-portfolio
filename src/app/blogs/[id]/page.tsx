"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import { useBlogs } from "@/hooks/useBlogs";
import { blogsData } from "@/features/blogs/data/blogsData";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2 } from "react-icons/fi";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, language, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { blogs } = useBlogs();

  const blog = blogs.find((b) => b.id === id || b.slug === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-normal">Article not found</h2>
        <Link href="/blogs" className="text-sm text-blue-400 hover:underline">
          {t.backToBlogs}
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? blog.titleAr : blog.titleEn;
  const excerpt = language === "ar" ? blog.excerptAr : blog.excerptEn;
  const category = language === "ar" ? blog.categoryAr : blog.categoryEn;
  const readTime = language === "ar" ? blog.readTimeAr : blog.readTimeEn;
  const authorRole = language === "ar" ? blog.author.roleAr : blog.author.roleEn;
  const content = language === "ar" ? blog.contentAr : blog.contentEn;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. Header with Mount Animation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between border-b border-white/10"
      >
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-normal text-neutral-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{t.backToBlogs}</span>
        </Link>
        <LanguageToggle />
      </motion.header>

      {/* 2. Article Content Container */}
      <article className="max-w-4xl mx-auto px-6 sm:px-10 pt-12 pb-24">
        {/* Meta row: Category, Read time, Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="px-3.5 py-1 rounded-full text-xs font-normal bg-white/10 text-white border border-white/15">
            {category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
            <FiClock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </span>
          <span className="text-neutral-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>{blog.publishedAt}</span>
          </span>
        </motion.div>

        {/* Title & Excerpt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
            {excerpt}
          </p>
        </motion.div>

        {/* Author Box (Habib) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 py-4 mb-10 border-y border-white/10"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-cyan-400/50 relative bg-cyan-400/10 shrink-0">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              width={48}
              height={48}
              className="object-cover scale-125"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-normal text-white">
              {blog.author.name}
            </div>
            <div className="text-xs sm:text-sm text-neutral-400 font-light">
              {authorRole}
            </div>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl"
        >
          <Image
            src={blog.coverImage}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </motion.div>

        {/* Main Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-10 text-neutral-200 font-light leading-relaxed text-base sm:text-lg"
        >
          {/* Intro */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-blue-500 text-neutral-200 italic">
            {content.intro}
          </div>

          {/* Sections */}
          {content.sections.map((sec, idx) => {
            const codeBlock = (sec as any).code || (sec as any).codeSnippet;
            return (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold mt-1">
                    {idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
                    {sec.heading}
                  </h2>
                </div>
                <p className="text-neutral-300 leading-relaxed font-light pl-0 sm:pl-10">
                  {sec.body}
                </p>

                {codeBlock && (
                  <div className="relative mt-2 rounded-2xl bg-[#0f1118] border border-white/15 overflow-hidden shadow-2xl" dir="ltr">
                    {/* Terminal Top Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                        <span className="text-[11px] text-neutral-400 font-mono ml-2">Code Snippet</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof navigator !== "undefined" && navigator.clipboard) {
                            navigator.clipboard.writeText(codeBlock);
                            alert(isRtl ? "تم نسخ الكود!" : "Code copied to clipboard!");
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                      >
                        {isRtl ? "نسخ الكود" : "Copy Code"}
                      </button>
                    </div>

                    <pre className="p-5 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto selection:bg-cyan-500 selection:text-black">
                      <code>{codeBlock}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}

          {/* Conclusion */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xl font-medium text-white mb-2">
              {language === "ar" ? "خلاصة القول" : "Final Thoughts"}
            </h3>
            <p className="text-neutral-300">
              {content.conclusion}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </article>

      {/* Floating Dock at bottom center of the article */}
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
