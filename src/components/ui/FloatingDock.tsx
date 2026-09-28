"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import Image from "next/image";
import { 
  IoHomeOutline, 
  IoTerminalOutline, 
  IoCubeOutline, 
  IoDocumentTextOutline, 
  IoReaderOutline,
} from "react-icons/io5";

interface FloatingDockProps {
  className?: string;
}

export default function FloatingDock({ className = "" }: FloatingDockProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      // When anchor top reaches 20px from top of viewport or past it, dock becomes fixed at top: 20px
      setIsSticky(rect.top <= 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const dockItems = [
    {
      id: "home",
      label: t.dockHome,
      icon: <IoHomeOutline className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/",
      isExternal: false,
    },
    {
      id: "terminal",
      label: t.dockTerminal,
      icon: <IoTerminalOutline className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/projects",
      isExternal: false,
    },
    {
      id: "cube",
      label: t.dockCube,
      icon: <IoCubeOutline className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/skills",
      isExternal: false,
    },
    {
      id: "avatar",
      label: t.dockAvatar,
      icon: null, // Custom rendered in loop
      href: "/about",
      isExternal: false,
    },
    {
      id: "blogs",
      label: t.dockBlogs,
      icon: <IoReaderOutline className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/blogs",
      isExternal: false,
    },
  ];

  const renderDockBar = (isFixedMode: boolean) => (
    <nav
      aria-label="Floating Navigation Dock"
      className={`flex items-center justify-center pointer-events-auto select-none transition-shadow duration-300`}
    >
      <div
        className={`flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
          isFixedMode
            ? "bg-[#0f1118]/90 border-white/20 shadow-[0_16px_45px_rgba(0,0,0,0.75)] backdrop-blur-2xl ring-1 ring-blue-500/20"
            : "bg-[#14161f]/95 border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        }`}
      >
        {dockItems.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          const isActive =
            (!item.isExternal && item.href === "/" && pathname === "/") ||
            (!item.isExternal &&
              item.href !== "/" &&
              (pathname === item.href || pathname?.startsWith(item.href + "/")));

          const isAvatar = item.id === "avatar";

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip (Positioned below the dock when fixed at top: 20px to prevent clipping at the top of the screen) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: isFixedMode ? 25 : 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: isFixedMode ? 44 : -42, scale: 1 }}
                    exit={{ opacity: 0, y: isFixedMode ? 25 : 10, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none px-2.5 py-1 rounded-md bg-neutral-950/95 border border-white/20 text-white text-[11px] font-medium whitespace-nowrap shadow-2xl z-50 tracking-wide backdrop-blur-md"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Link Wrapper */}
              <Link
                href={item.href}
                aria-label={item.label}
                className="group relative flex items-center justify-center cursor-pointer"
              >
                {/* Active Pill Glow Indicator - Smooth Layout Spring Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 shadow-[0_0_18px_rgba(59,90,251,0.7)] ring-1 ring-white/35"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}

                {/* Animated Icon Container */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.25 : isNeighbor ? 1.1 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className={`relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/70 group-hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isAvatar ? (
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden relative flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "ring-2 ring-blue-400 border border-white shadow-[0_0_14px_rgba(59,90,251,0.8)] scale-105"
                          : "border border-white/25 bg-neutral-900 shadow-sm group-hover:border-white/60"
                      }`}
                    >
                      <Image
                        src="/avatar.png"
                        alt="Mohamed H. Mowafy"
                        width={28}
                        height={28}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                  ) : (
                    <span className="relative z-10 drop-shadow-xs">
                      {item.icon}
                    </span>
                  )}
                </motion.div>

                {/* Active Indicator Dot under the active button */}
                {isActive && (
                  <motion.span
                    layoutId="activeDockDot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div
      ref={anchorRef}
      className={`relative flex items-center justify-center w-full min-h-[52px] ${className}`}
    >
      {/* 1. In-flow Dock (When user is above sticky threshold) */}
      {!isSticky && renderDockBar(false)}

      {/* 2. Fixed Dock when user scrolls down and reaches top: 20px (Mounted via Portal into body to bypass any parent overflow-hidden or transforms) */}
      {mounted &&
        isSticky &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] pointer-events-auto"
          >
            {renderDockBar(true)}
          </motion.div>,
          document.body
        )}
    </div>
  );
}
