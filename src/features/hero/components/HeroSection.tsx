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
      className="relative w-full h-screen min-h-[660px] max-h-[1080px] overflow-hidden flex flex-col justify-between select-none bg-[#7b828a]"
    >
      {/* 1. Full Hero Background Image: dynamic hero image filling the screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Mohamed H. Mowafy - Portfolio Hero"
          fill
          priority
          unoptimized
          className="object-cover object-[center_18%] filter grayscale contrast-105 brightness-100"
          sizes="100vw"
        />
      </div>

      {/* 2. Top Header Bar (Inside Hero Only) with post-loading animation */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full px-6 sm:px-12 pt-8 pb-4 flex items-start justify-between"
      >
        {/* Top Left: Logo & @ Code by Habib / @ كود بواسطة حبيب */}
        <Link href="/" className="inline-flex items-center gap-2.5 group">
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
          <span className="text-white font-normal tracking-tight text-sm sm:text-base drop-shadow-sm group-hover:text-neutral-200 transition-colors">
            {t.codeBy}
          </span>
        </Link>

        {/* Top Right: Language Toggle & Quote (Single continuous block, not split) */}
        <div
          className={`flex flex-col items-end gap-2.5 max-w-full ${
            isRtl ? "text-right" : "text-right"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <AdminHeaderBadge />
            <LanguageToggle />
          </div>

          <p className="text-white/90 text-xs sm:text-[13px] font-normal tracking-wide drop-shadow-sm whitespace-normal sm:whitespace-nowrap">
            {heroQuote}
          </p>
        </div>
      </motion.header>

      {/* 3. Circular Arrow Icon matching Figma: Large thin circle + crisp diagonal arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
        className={`absolute z-20 top-[31%] sm:top-[32%] ${
          isRtl ? "left-[14%] sm:left-[17%]" : "right-[14%] sm:right-[17%]"
        }`}
      >
        <MagneticButton strength={0.35}>
          <a
            href="#works"
            className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full border border-white/50 hover:border-white transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-[2px]"
            aria-label="Scroll to projects"
          >
            <FiArrowUpRight
              className="w-7 h-7 sm:w-9 sm:h-9 text-white/90 group-hover:text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ strokeWidth: 1.15 }}
            />
          </a>
        </MagneticButton>
      </motion.div>

      {/* 4. Display Headline Typography:
          Edge to edge full width!
          - English: "e" far left, wide space, "Developer" center, wide space, "&" far right
          - Arabic: "مطور" full width across the screen
      */}
      <motion.div
        initial={{ opacity: 0, y: 55, scale: 0.96 }}
        animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 55, scale: 0.96 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full pointer-events-none overflow-hidden select-none mt-auto mb-10 sm:mb-14"
      >
        {language === "ar" ? (
          <div className="w-full flex items-center justify-center px-4">
            <h1
              dir="rtl"
              className="font-bold sm:font-extrabold tracking-normal text-white text-center drop-shadow-md w-full"
              style={{
                fontSize: "clamp(5.5rem, 21vw, 20rem)",
                lineHeight: "0.85",
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
                  className="w-full flex items-center justify-between px-3 sm:px-6 md:px-10 lg:px-12 font-bold sm:font-extrabold text-white drop-shadow-md whitespace-nowrap"
                  style={{
                    fontSize: "clamp(4.2rem, 15vw, 15.5rem)",
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="shrink-0 -ml-1 sm:-ml-3">{firstPart}</span>
                  <span className="mx-auto text-center px-2 sm:px-6">{middlePart}</span>
                  <span className="shrink-0 -mr-1 sm:-mr-3">{lastPart}</span>
                </div>
              );
            }

            if (parts.length === 2) {
              return (
                <div
                  dir="ltr"
                  className="w-full flex items-center justify-between px-3 sm:px-6 md:px-10 lg:px-12 font-bold sm:font-extrabold text-white drop-shadow-md whitespace-nowrap"
                  style={{
                    fontSize: "clamp(4.2rem, 15vw, 15.5rem)",
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
                className="w-full flex items-center justify-center px-4 font-bold sm:font-extrabold text-white drop-shadow-md"
                style={{
                  fontSize: "clamp(4.2rem, 15vw, 15.5rem)",
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
        className="relative z-20 w-full pb-7 sm:pb-9 flex justify-center"
      >
        <FloatingDock />
      </motion.div>
    </section>
  );
}
