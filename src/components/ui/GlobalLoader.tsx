"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/components/providers/LoadingContext";

export default function GlobalLoader() {
  const { isLoaded } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Clean minimal spinner */}
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-xs font-light tracking-widest text-white/70 uppercase">
              Habib
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
