"use client";

import React from "react";
import { useTranslation } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all cursor-pointer backdrop-blur-md"
      aria-label="Toggle language"
      id="hero-language-toggle"
    >
      <Globe className="w-3.5 h-3.5 text-white/80" />
      <span>{t.toggleLanguage}</span>
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20">
        {language === "en" ? "AR" : "EN"}
      </span>
    </button>
  );
}
