"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";
import BlogCard from "@/features/blogs/components/BlogCard";
import { useBlogs } from "@/hooks/useBlogs";

export default function BlogsPage() {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();
  const { blogs, isLoading } = useBlogs();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelEn: "All Posts", labelAr: "جميع المقالات" },
    { id: "Web Animations", labelEn: "Animations", labelAr: "التحريك" },
    { id: "Next.js", labelEn: "Next.js", labelAr: "نكست جي إس" },
    { id: "AI Tools", labelEn: "AI Tools", labelAr: "الذكاء الاصطناعي" },
    { id: "Performance", labelEn: "Performance", labelAr: "تحسين الأداء" },
  ];

  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((b) => b.categoryEn === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. Blogs Hero Section */}
      <section className="relative w-full h-[82vh] min-h-[560px] max-h-[860px] flex flex-col justify-between px-6 sm:px-12 pt-8 pb-8 select-none overflow-hidden">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full flex items-start justify-between"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group text-white/95 font-normal tracking-tight text-sm sm:text-base hover:text-neutral-300 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-sm bg-neutral-900 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/avatar.png"
                alt="Mohamed H. Mowafy Logo"
                width={32}
                height={32}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span>{t.codeBy}</span>
          </Link>

          <div className="flex flex-col items-end gap-2.5 max-w-sm sm:max-w-md text-right">
            <div className="flex items-center gap-2.5">
              <AdminHeaderBadge />
              <LanguageToggle />
            </div>
            <p className="text-white/70 text-xs sm:text-[13px] font-normal leading-relaxed">
              {t.blogsHeroSubtitle}
            </p>
          </div>
        </motion.header>

        {/* Center Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full text-center px-4 my-auto"
        >
          <h1
            className="font-normal text-white tracking-tight select-none inline-block max-w-4xl"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
            }}
          >
            {t.blogsHeadline}
          </h1>
        </motion.div>

        {/* Floating Dock at bottom center of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 w-full flex justify-center"
        >
          <FloatingDock />
        </motion.div>
      </section>

      {/* 2. Blog Posts Grid Section */}
      <section className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const label = language === "ar" ? cat.labelAr : cat.labelEn;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-normal transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse bg-[#14151a] p-6 rounded-3xl border border-white/5">
                  <div className="w-full aspect-[16/9] bg-white/5 rounded-2xl" />
                  <div className="h-6 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                </div>
              ))
            ) : filteredBlogs && filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, idx) => (
                <BlogCard key={blog.id} blog={blog} index={idx} />
              ))
            ) : (
              <div className="col-span-2 text-center py-20 px-4 bg-[#14151a]/40 border border-white/5 rounded-3xl">
                <p className="text-neutral-400 text-base">
                  {language === "ar" ? "لا توجد مقالات مضافة حالياً في قاعدة البيانات." : "No articles currently in database."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Reusable Contact Section: 'Got a project in mind? Let's talk' */}
      <ContactSection />

      {/* 4. Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
