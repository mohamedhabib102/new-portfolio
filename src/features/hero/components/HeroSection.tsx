"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import MagneticButton from "@/components/ui/MagneticButton";
import { FiArrowUpRight } from "react-icons/fi";

import { useSiteConfig, SiteConfig } from "@/hooks/useSiteConfig";

export default function HeroSection({ initialConfig }: { initialConfig?: SiteConfig }) {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();
  const { config } = useSiteConfig(initialConfig);

  const heroQuote = language === "ar" ? (config.heroQuoteAr || t.heroRightQuote) : (config.heroQuoteEn || t.heroRightQuote);
  const heroImage = config.heroImage || "/me.png";

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] sm:min-h-[820px] md:min-h-[900px] lg:min-h-[980px] overflow-hidden flex flex-col justify-between select-none bg-[#7b828a]"
    >
      {/* 1. Full Hero Background Image: dynamic hero image filling the screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Mohamed H. Mowafy - Portfolio Hero"
          fill
          priority
          unoptimized
          className="object-cover object-[center_16%] sm:object-[center_14%] filter grayscale contrast-105 brightness-100"
          sizes="100vw"
        />
      </div>

      {/* 2. Top Header Bar (Inside Hero Only) with post-loading animation */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full px-4 sm:px-12 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-start justify-between gap-3"
      >
        {/* Top Left: Logo & @ Code by Habib / @ كود بواسطة حبيب */}
        <Link href="/" className="inline-flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/20 shadow-sm bg-neutral-900 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/avatar.png"
              alt="Mohamed H. Mowafy Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="text-white font-normal tracking-tight text-xs sm:text-base drop-shadow-sm group-hover:text-neutral-200 transition-colors">
            {t.codeBy}
          </span>
        </Link>

        {/* Top Right: Language Toggle & Quote (Single continuous block, not split) */}
        <div
          className={`flex flex-col items-end gap-1.5 sm:gap-2.5 max-w-[62%] sm:max-w-full ${
            isRtl ? "text-right" : "text-right"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <AdminHeaderBadge />
            <LanguageToggle />
          </div>

          <p className="text-white/80 sm:text-white/90 text-[11px] sm:text-[13px] font-normal tracking-wide drop-shadow-sm leading-tight sm:leading-normal whitespace-normal sm:whitespace-nowrap max-w-[210px] sm:max-w-none">
            {heroQuote}
          </p>
        </div>
      </motion.header>

      {/* 3. Circular Arrow Icon matching Figma: Proportional & positioned safely on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
        className={`absolute z-20 top-[22%] sm:top-[30%] ${
          isRtl ? "left-4 sm:left-[17%]" : "right-4 sm:right-[17%]"
        }`}
      >
        <MagneticButton strength={0.35}>
          <a
            href="#works"
            className="group flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full border border-white/50 hover:border-white transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-[2px]"
            aria-label="Scroll to projects"
          >
            <FiArrowUpRight
              className="w-5 h-5 sm:w-9 sm:h-9 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ strokeWidth: 1.15 }}
            />
          </a>
        </MagneticButton>
      </motion.div>

      {/* 4. Display Headline Typography:
          Edge to edge full width, fully responsive on mobile without horizontal clipping!
      */}
      <motion.div
        initial={{ opacity: 0, y: 55, scale: 0.96 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 55, scale: 0.96 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full pointer-events-none overflow-hidden select-none mt-auto mb-4 sm:mb-10 lg:mb-12"
      >
        {language === "ar" ? (
          <div className="w-full flex items-center justify-center px-4">
            <h1
              dir="rtl"
              className="font-bold sm:font-extrabold tracking-normal text-white text-center drop-shadow-md w-full text-[clamp(2.8rem,13.5vw,4.5rem)] sm:text-[clamp(4.5rem,16.5vw,16.5rem)]"
              style={{
                lineHeight: "0.9",
                letterSpacing: "0.02em",
              }}
            >
              {config.heroTitleAr || "مطور"}
            </h1>
          </div>
        ) : (
          (() => {
            const rawTitle = (config.heroTitleEn || "Creative Developer &").trim();
            const parts = rawTitle.split(/\s+/);

            if (parts.length >= 3) {
              const firstPart = parts[0];
              const lastPart = parts[parts.length - 1];
              const middlePart = parts.slice(1, -1).join(" ");

              return (
                <div
                  dir="ltr"
                  className="w-full flex items-center justify-between px-2.5 sm:px-6 md:px-10 lg:px-12 font-bold sm:font-extrabold text-white drop-shadow-md whitespace-nowrap text-[clamp(1.5rem,7vw,3.2rem)] sm:text-[clamp(4.2rem,15vw,15.5rem)]"
                  style={{
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="shrink-0">{firstPart}</span>
                  <span className="mx-auto text-center px-1 sm:px-6 truncate">{middlePart}</span>
                  <span className="shrink-0">{lastPart}</span>
                </div>
              );
            }

            if (parts.length === 2) {
              return (
                <div
                  dir="ltr"
                  className="w-full flex items-center justify-between px-3 sm:px-6 md:px-10 lg:px-12 font-bold sm:font-extrabold text-white drop-shadow-md whitespace-nowrap text-[clamp(2.2rem,9.5vw,4.2rem)] sm:text-[clamp(4.2rem,15vw,15.5rem)]"
                  style={{
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="shrink-0">{parts[0]}</span>
                  <span className="shrink-0">{parts[1]}</span>
                </div>
              );
            }

            return (
              <div
                dir="ltr"
                className="w-full flex items-center justify-center px-4 font-bold sm:font-extrabold text-white drop-shadow-md text-[clamp(2.5rem,12vw,4.5rem)] sm:text-[clamp(4.2rem,15vw,15.5rem)]"
                style={{
                  lineHeight: "0.85",
                  letterSpacing: "-0.03em",
                }}
              >
                <span>{rawTitle}</span>
              </div>
            );
          })()
        )}
      </motion.div>

      {/* 5. Floating Dock with post-loading animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full pb-4 sm:pb-9 flex justify-center"
      >
        <FloatingDock />
      </motion.div>
    </section>
  );
}
