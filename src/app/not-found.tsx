"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ArrowRight, Compass, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NotFound() {
  const { language, isRtl } = useLanguage();

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-xl w-full mx-auto text-center relative z-10">
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>{language === "ar" ? "خطأ 404 - صفحة غير موجودة" : "Error 404 - Page Not Found"}</span>
        </motion.div>

        {/* Large 404 Text with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-8xl sm:text-9xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent mb-4 select-none drop-shadow-2xl"
        >
          404
        </motion.h1>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
        >
          {language === "ar" 
            ? "عذراً، هذه الصفحة غير موجودة أو تم نقلها" 
            : "Lost in the digital void?"}
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/60 text-base sm:text-lg mb-10 leading-relaxed max-w-md mx-auto"
        >
          {language === "ar"
            ? "يبدو أنك وصلت إلى مسار غير متاح أو تم تغيير رابطه. لا تقلق، يمكنك العودة للصفحة الرئيسية واستكشاف المشاريع والمهارات."
            : "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4" />
            <span>{language === "ar" ? "العودة للرئيسية" : "Back to Home"}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 ml-1" />}
          </Link>

          <Link
            href="/skills"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-medium backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{language === "ar" ? "استعراض المهارات" : "Explore Skills"}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
