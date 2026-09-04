"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { FiShield } from "react-icons/fi";

export default function AdminHeaderBadge() {
  const { isRtl } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);

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
    >
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95"
      >
        <FiShield className="w-3.5 h-3.5 text-blue-400" />
        <span>{isRtl ? "لوحة التحكم" : "Dashboard"}</span>
      </Link>
    </motion.div>
  );
}
