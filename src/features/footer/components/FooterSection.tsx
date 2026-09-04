"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiCornerDownRight } from "react-icons/fi";
import { IoLogoWhatsapp, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

import { useSiteConfig, SiteConfig } from "@/hooks/useSiteConfig";

export default function FooterSection({ initialConfig }: { initialConfig?: SiteConfig }) {
  const { isRtl, language } = useTranslation();
  const { config } = useSiteConfig(initialConfig);

  const footerHeadline =
    language === "ar"
      ? config.footerHeadlineAr || "دعنا نصنع شيئاً عظيماً معاً"
      : config.footerHeadlineEn || "Let's build something great together";

  const footerSubtitle =
    language === "ar"
      ? config.footerSubAr || "هل لديك فكرة أو مشروع طموح؟ دعنا نحول الرؤية إلى واقع رقمي مبهر."
      : config.footerSubEn || "Have an ambitious project in mind? Let's turn your vision into an unforgettable digital reality.";

  const githubUrl = config.githubUrl || "https://github.com/mowafy-dev";
  const linkedinUrl = config.linkedinUrl || "https://www.linkedin.com/in/habib-mowafy";
  const whatsappNum = (config.whatsappNumber || "201027227796").replace(/[^0-9]/g, "");

  return (
    <footer className="relative w-full bg-black text-white px-6 sm:px-12 lg:px-20 pt-16 sm:pt-24 pb-14 sm:pb-20 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
        {/* Top row: Catchy Subtitle & White Circular Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between gap-6"
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-normal uppercase tracking-widest text-neutral-400">
              {isRtl ? "مستعد للانطلاق؟" : "READY TO COLLABORATE?"}
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white/95 leading-relaxed">
              {footerSubtitle}
            </p>
          </div>

          <Link
            href="/skills"
            id="footer-skills-arrow-btn"
            className="group flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-xl cursor-pointer shrink-0"
            aria-label="View skills"
            title={isRtl ? "استعرض المهارات" : "View skills"}
          >
            <FiCornerDownRight className="w-5 h-5 sm:w-7 sm:h-7 text-black group-hover:rotate-[-45deg] transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Big Motivating CTA Headline across the screen */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full my-10 sm:my-14"
        >
          <h2
            className="font-normal tracking-tight text-white/95 select-none leading-[0.95]"
            style={{
              fontSize: "clamp(2.8rem, 7.8vw, 8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {footerHeadline}
          </h2>
        </motion.div>

        {/* Direct WhatsApp Call To Action Button & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${whatsappNum}?text=Hi%20Mohamed,%20I'm%20interested%20in%20working%20together%20on%20a%20project!`}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-cta-btn"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <IoLogoWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform" />
              <span>{isRtl ? "تواصل معي عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>

            {/* GitHub and LinkedIn buttons in footer */}
            <div className="flex items-center gap-2.5">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105"
              >
                <IoLogoGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105"
              >
                <IoLogoLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-neutral-400 font-normal">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{isRtl ? "متاح للعمل الحر والمشاريع" : "Available for new projects"}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
