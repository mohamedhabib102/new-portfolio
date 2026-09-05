"use client";

import React from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function LanguageToggle({
  variant = "dark",
  className = "",
}: LanguageToggleProps) {
  const { language, toggleLanguage, t } = useTranslation();
  const isLight = variant === "light";

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
        isLight
          ? "bg-neutral-100 hover:bg-neutral-200/90 border border-neutral-200 text-neutral-800 shadow-sm active:scale-95"
          : "bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md active:scale-95"
      } ${className}`}
      aria-label="Toggle language"
      id="hero-language-toggle"
    >
      <Globe
        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
          isLight ? "text-neutral-500" : "text-white/80"
        }`}
      />
      <span className="hidden sm:inline">{t.toggleLanguage}</span>
      <span
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
          isLight
            ? "bg-neutral-200/80 text-neutral-900 border border-neutral-300/60"
            : "bg-white/20 text-white"
        }`}
      >
        {language === "en" ? "AR" : "EN"}
      </span>
    </button>
  );
}
