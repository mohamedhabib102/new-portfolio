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
import { FiBriefcase } from "react-icons/fi";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useExperiences } from "@/hooks/useExperiences";

interface AboutClientProps {
  initialConfig?: any;
  initialExperiences?: any[];
}

export default function AboutClient({ initialConfig, initialExperiences }: AboutClientProps) {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();
  const { config: dynamicConfig } = useSiteConfig(initialConfig);

  const config = dynamicConfig || initialConfig || {};
  const aboutBioText = language === "ar" ? (config.aboutBioAr || t.aboutBio) : (config.aboutBioEn || t.aboutBio);

  const { experiences: dynamicExperiences } = useExperiences();
  const fallbackExperiences = [
    {
      id: "exp-1",
      period: "2024 - Present",
      roleEn: "Frontend Engineer",
      roleAr: "مهندس واجهات أمامية",
      company: "serv5",
      descEn:
        "Leading UI development for highly interactive web projects to boost user engagement and retention. Designing advanced custom scroll animations and micro-interactions with GSAP, while optimizing site performance to achieve a 95+ score on Google Lighthouse across core pages.",
      descAr:
        "قيادة تطوير واجهات المستخدم للمشاريع التفاعلية المتقدمة لتعزيز تجربة المستخدم ومعدل التفاعل. تصميم وتطوير حركات سكرول تفاعلية مخصصة باستخدام GSAP و Framer Motion، مع تحسين أداء المواقع لتحقيق معدل 95+ على Google Lighthouse في جميع الصفحات الرئيسية.",
      skills: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS", "Performance Optimization"],
    },
    {
      id: "exp-2",
      period: "2024 - Present",
      roleEn: "Freelance Frontend Developer",
      roleAr: "مطور واجهات أمامية مستقل",
      company: "Independent / Saudi Clients",
      descEn:
        "Developing bespoke web systems for Saudi clients, directly aligning tech stacks with business requirements. Managing full project lifecycles from requirement gathering and UI coding to cloud hosting and maintenance, ensuring fully responsive, high-performance designs.",
      descAr:
        "تطوير أنظمة ويب وحلول رقمية مخصصة لعملاء في المملكة العربية السعودية، مع مواءمة التقنيات المستخدمة مع متطلبات الأعمال. إدارة دورة حياة المشاريع بالكامل بدءاً من تحليل المتطلبات وتكويد الواجهات وحتى الاستضافة السحابية والصيانة، وضمان تصميمات متجاوبة وعالية الأداء.",
      skills: ["Next.js", "Tailwind CSS", "Supabase", "Prisma", "Client Collaboration"],
    },
  ];

  const experiences =
    dynamicExperiences && dynamicExperiences.length > 0
      ? dynamicExperiences
      : initialExperiences && initialExperiences.length > 0
      ? initialExperiences
      : fallbackExperiences;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. About Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[550px] max-h-[850px] flex flex-col justify-between px-6 sm:px-12 pt-8 pb-8 select-none overflow-hidden">
        {/* Top Header */}
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
            <p className="text-white/70 text-xs sm:text-[13px] font-normal leading-relaxed line-clamp-2">
              {t.aboutBio}
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
              fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
              lineHeight: isRtl ? "1.3" : "1.1",
              letterSpacing: isRtl ? "0" : "-0.03em",
            }}
          >
            {t.aboutHeadline}
          </h1>
        </motion.div>

        {/* Floating Dock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 w-full flex justify-center"
        >
          <FloatingDock />
        </motion.div>
      </section>

      {/* 2. Bio Section */}
      <section className="relative w-full py-16 px-6 sm:px-12 lg:px-20 bg-black border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#12141a] border border-white/10 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-cyan-300">
                {isRtl ? "نبذة عني" : "ABOUT ME"}
              </span>
            </div>

            <div
              className={`text-base sm:text-lg text-neutral-200 font-light whitespace-pre-line ${
                isRtl ? "leading-[1.9]" : "leading-relaxed"
              }`}
            >
              {aboutBioText}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Vertical Experience Timeline Section */}
      <section className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 sm:mb-20 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <FiBriefcase className="w-5 h-5" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
              {t.experienceTitle}
            </h2>
          </motion.div>

          {/* Vertical Timeline with Line and Dots */}
          <div
            className={`relative flex flex-col gap-14 sm:gap-18 ${
              isRtl
                ? "border-r border-white/20 mr-4 sm:mr-6 pr-8 sm:pr-12"
                : "border-l border-white/20 ml-4 sm:ml-6 pl-8 sm:pl-12"
            }`}
          >
            {experiences.map((exp: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col gap-4 group"
              >
                {/* Glowing Dot on the Vertical Line */}
                <div
                  className={`absolute top-1.5 w-4 h-4 rounded-full bg-white border-4 border-black shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform duration-300 ${
                    isRtl
                      ? "-right-[41px] sm:-right-[57px]"
                      : "-left-[41px] sm:-left-[57px]"
                  }`}
                />

                {/* Period Badge */}
                <span className="text-xs sm:text-sm font-mono text-neutral-400">
                  {exp.period}
                </span>

                {/* Role & Company */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                    {language === "ar" ? exp.roleAr : exp.roleEn}
                  </h3>
                  <p className="text-sm sm:text-base font-normal text-blue-400 mt-1">
                    @ {exp.company}
                  </p>
                </div>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base text-neutral-300 max-w-2xl font-light ${
                    isRtl ? "leading-[1.85]" : "leading-relaxed"
                  }`}
                >
                  {language === "ar" ? exp.descAr : exp.descEn}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills && exp.skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-normal rounded-full bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Contact Section */}
      <ContactSection />

      {/* Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
