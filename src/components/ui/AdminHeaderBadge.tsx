"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiShield } from "react-icons/fi";

interface AdminHeaderBadgeProps {
  variant?: "dark" | "light";
}

export default function AdminHeaderBadge({ variant = "dark" }: AdminHeaderBadgeProps) {
  const { isRtl } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const isLight = variant === "light";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogged =
        localStorage.getItem("mowafy_admin_logged_in") === "true" ||
        sessionStorage.getItem("mowafy_admin_authenticated") === "true";
      setIsAdmin(isLogged);
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="shrink-0"
    >
      <Link
        href="/dashboard"
        className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap active:scale-95 ${
          isLight
            ? "bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 shadow-sm"
            : "bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-200 hover:text-white shadow-[0_0_12px_rgba(59,130,246,0.3)] backdrop-blur-md"
        }`}
      >
        <FiShield className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isLight ? "text-blue-600" : "text-blue-300"}`} />
        <span className="hidden xs:inline sm:inline">{isRtl ? "لوحة التحكم" : "Dashboard"}</span>
        <span className="inline xs:hidden sm:hidden">{isRtl ? "لوحة" : "Dash"}</span>
      </Link>
    </motion.div>
  );
}
