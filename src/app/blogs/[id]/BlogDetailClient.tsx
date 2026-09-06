"use client";

import React from "react";
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
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";
import BlogLikeButton from "@/features/blogs/components/BlogLikeButton";

interface BlogDetailClientProps {
  id: string;
  initialBlog?: any;
}

export default function BlogDetailClient({ id, initialBlog }: BlogDetailClientProps) {
  const { t, language, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { blogs, isLoading } = useBlogs();

  const cleanId = typeof id === "string" ? decodeURIComponent(id).trim().toLowerCase() : "";
  const blog =
    (blogs &&
      blogs.find((b: any) => {
        const bId = b.id?.toLowerCase();
        const bSlug = b.slug?.toLowerCase();
        return bId === cleanId || bSlug === cleanId;
      })) ||
    initialBlog;

  // If blogs are currently loading and blog is not ready yet, display a smooth loader
  if (isLoading && !blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute w-8 h-8 rounded-full border-2 border-blue-500/30 border-b-blue-400 animate-spin [animation-direction:reverse]" />
        </div>
        <p className="text-neutral-400 text-sm font-medium tracking-wide animate-pulse">
          {language === "ar" ? "جاري تحميل تفاصيل المقال..." : "Loading article..."}
        </p>
      </div>
    );
  }

  // Only display not found if request has finished and article is genuinely missing
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="text-2xl font-normal text-neutral-200">
          {language === "ar" ? "المقال غير موجود" : "Article not found"}
        </h2>
        <p className="text-neutral-500 text-sm max-w-md">
          {language === "ar"
            ? "المقال الذي تبحث عنه قد تم نقله أو حذفه."
            : "The article you are looking for may have been moved or deleted."}
        </p>
        <Link
          href="/blogs"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm border border-white/10 transition-colors"
        >
          <FiArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          <span>{t.backToBlogs}</span>
        </Link>
      </div>
    );
  }

  const title = language === "ar" ? blog.titleAr : blog.titleEn;
  const excerpt = language === "ar" ? blog.excerptAr : blog.excerptEn;
  const category = language === "ar" ? blog.categoryAr : blog.categoryEn;
  const readTime = language === "ar" ? blog.readTimeAr : blog.readTimeEn;
  const authorName = blog.author?.name || blog.authorName || "Mohamed H. Mowafy";
  const authorRole = language === "ar"
    ? blog.author?.roleAr || "مطور واجهات أمامية"
    : blog.author?.roleEn || blog.authorRole || "Front-End Developer";
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
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6 ${
              isRtl ? "leading-[1.35] sm:leading-[1.4] tracking-normal" : "leading-tight tracking-tight"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-base sm:text-xl text-neutral-300 font-light ${
              isRtl ? "leading-[1.85]" : "leading-relaxed"
            }`}
          >
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
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-neutral-900 shrink-0 shadow-md">
            <Image
              src="/avatar.png"
              alt={authorName}
              width={48}
              height={48}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-normal text-white">
              {authorName}
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
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl"
        >
          <Image
            src={blog.coverImage || "/avatar.png"}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover object-center"
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
          {content.intro && (
            <div className="p-6 rounded-2xl bg-white/[0.03] border-l-4 border-blue-500 text-neutral-200 italic">
              {content.intro}
            </div>
          )}

          {/* Sections */}
          {content.sections && content.sections.map((sec: any, idx: number) => {
            const codeBlock = sec.code || sec.codeSnippet;
            return (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold mt-1">
                    {idx + 1}
                  </span>
                  <h2
                    className={`text-2xl sm:text-3xl font-medium text-white ${
                      isRtl ? "tracking-normal leading-normal" : "tracking-tight leading-snug"
                    }`}
                  >
                    {sec.heading}
                  </h2>
                </div>
                <p
                  className={`text-neutral-300 font-light ps-0 sm:ps-10 ${
                    isRtl ? "leading-[1.85]" : "leading-relaxed"
                  }`}
                >
                  {sec.body}
                </p>

                {codeBlock && (
                  <div className="relative mt-2 rounded-2xl bg-[#0f1118] border border-white/15 overflow-hidden shadow-2xl ms-0 sm:ms-10" dir="ltr">
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
          {content.conclusion && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-medium text-white mb-2">
                {language === "ar" ? "خلاصة القول" : "Final Thoughts"}
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {content.conclusion}
              </p>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Likes Section */}
          <BlogLikeButton
            blogId={blog.slug || blog.id || id}
            initialLikes={typeof blog.likes === "number" ? blog.likes : 0}
          />
        </motion.div>
      </article>

      {/* Floating Dock at bottom center of the article */}
      <div className="w-full flex justify-center pb-12">
        <FloatingDock />
      </div>

      {/* Reusable Contact Section */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
