"use client";

import React, { useState } from "react";
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
      icon: (
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden bg-cyan-400/20 border border-cyan-400/50 relative flex items-center justify-center">
          <Image
            src="/me.png"
            alt="Mohamed H. Mowafy"
            width={28}
            height={28}
            className="object-cover scale-125"
          />
        </div>
      ),
      href: "/about",
      isExternal: false,
    },
    {
      id: "resume",
      label: t.dockResume,
      icon: <IoDocumentTextOutline className="w-4 h-4 sm:w-5 sm:h-5" />,
      href: "/resume",
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

  return (
    <nav 
      aria-label="Floating Navigation Dock"
      className={`flex items-center justify-center pointer-events-auto ${className}`}
    >
      <div className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-[#16181f]/95 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {dockItems.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isNeighbor =
            hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          const isActive =
            (!item.isExternal && item.href === "/" && pathname === "/") ||
            (!item.isExternal && item.href !== "/" && pathname?.startsWith(item.href));

          const content = (
            <motion.div
              animate={{
                scale: isHovered ? 1.3 : isNeighbor ? 1.12 : 1,
                y: isHovered ? -4 : 0,
              }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-white/20 text-white shadow-inner ring-1 ring-white/30"
                  : "bg-white/5 hover:bg-white/15 text-white/80 hover:text-white"
              }`}
            >
              {item.icon}
            </motion.div>
          );

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -38, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none px-2.5 py-1 rounded-md bg-black/95 border border-white/15 text-white text-[11px] font-medium whitespace-nowrap shadow-xl z-50 tracking-wide"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="cursor-pointer"
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className="cursor-pointer"
                >
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
