"use client";

import React from "react";
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
import TechIcon, { getTechIconInfo } from "@/components/ui/TechIcon";
import { useSkills } from "@/hooks/useSkills";

interface SkillsClientProps {
  initialSkills?: any[];
}

export default function SkillsClient({ initialSkills }: SkillsClientProps) {
  const { t, language, isRtl } = useTranslation();
  const { isLoaded } = useLoading();
  const { skills: dynamicSkills, isLoading } = useSkills();

  const skills = dynamicSkills && dynamicSkills.length > 0 ? dynamicSkills : initialSkills || [];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[580px] max-h-[900px] flex flex-col justify-between px-6 sm:px-12 pt-8 pb-8 select-none overflow-hidden">
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
              {t.skillsHeroSubtitle}
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
            className={`font-normal text-white select-none inline-block max-w-4xl ${
              isRtl ? "leading-[1.3] tracking-normal" : "tracking-tight"
            }`}
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.8rem)",
              lineHeight: isRtl ? "1.3" : "1.1",
              letterSpacing: isRtl ? "0" : "-0.03em",
            }}
          >
            {t.skillsHeadline}
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

      {/* 2. Dynamic Skills Grid */}
      <section className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto">
          {isLoading && (!skills || skills.length === 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-[26px] bg-[#14151a] border border-white/5 animate-pulse flex flex-col justify-between h-64"
                >
                  <div className="flex gap-2 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5" />
                    <div className="w-10 h-10 rounded-xl bg-white/5" />
                    <div className="w-10 h-10 rounded-xl bg-white/5" />
                  </div>
                  <div className="h-6 bg-white/5 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-white/5 rounded w-full mb-2" />
                  <div className="h-4 bg-white/5 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : skills && skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {skills.map((card: any, idx: number) => (
                <motion.div
                  key={card.id || idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-7 rounded-[26px] bg-[#14151a] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Tech Icons Row */}
                    {card.icons && card.icons.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        {card.icons.map((iconId: string, i: number) => {
                          const info = getTechIconInfo(iconId);
                          return (
                            <div
                              key={i}
                              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                              title={info.name}
                            >
                              <TechIcon nameOrId={iconId} className="w-5 h-5" />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Card Title */}
                    <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                      {language === "ar" ? card.titleAr || card.titleEn : card.titleEn}
                    </h3>

                    {/* Card Description */}
                    <p
                      className={`text-xs sm:text-[13px] text-neutral-400 font-light ${
                        isRtl ? "leading-[1.8]" : "leading-relaxed"
                      }`}
                    >
                      {language === "ar" ? card.descAr || card.descEn : card.descEn}
                    </p>
                  </div>

                  {/* Badges / Concepts */}
                  {card.badges && card.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-6 mt-4 border-t border-white/5">
                      {card.badges.map((b: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-[11px] font-normal rounded-full bg-white/5 text-neutral-300 border border-white/5"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#14151a]/40 border border-white/5 rounded-3xl">
              <p className="text-neutral-400 text-base">
                {language === "ar" ? "لا توجد مهارات مضافة حالياً في قاعدة البيانات." : "No skills added yet in the database."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Reusable Contact Section */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
