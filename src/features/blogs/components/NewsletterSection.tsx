"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from "lucide-react";

export default function NewsletterSection() {
  const { t, isRtl, language } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "already_subscribed" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    const trimmed = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      setStatus("error");
      setFeedbackMessage(
        language === "ar" ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address"
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.status === "already_subscribed") {
          setStatus("already_subscribed");
          setFeedbackMessage(language === "ar" ? data.messageAr || t.newsletterAlreadySubscribed : data.message || t.newsletterAlreadySubscribed);
        } else {
          setStatus("success");
          setFeedbackMessage(language === "ar" ? data.messageAr || t.newsletterSuccess : data.message || t.newsletterSuccess);
          setEmail("");
        }
      } else {
        setStatus("error");
        setFeedbackMessage(
          language === "ar"
            ? data.errorAr || t.newsletterError
            : data.error || t.newsletterError
        );
      }
    } catch {
      setStatus("error");
      setFeedbackMessage(t.newsletterError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-black text-white overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-[300px] h-[200px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[32px] p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-[#141622] via-[#0f1118] to-[#0a0b10] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Glass Highlight Line on top border */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Badge */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>{t.newsletterBadge}</span>
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center mt-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
              {t.newsletterTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              {t.newsletterSubtitle}
            </p>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl focus-within:border-blue-500/60 focus-within:shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all duration-300">
              <div className="flex items-center flex-1 px-4 py-2 sm:py-0">
                <Mail className={`w-5 h-5 text-neutral-500 shrink-0 ${isRtl ? "ml-3" : "mr-3"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  disabled={isSubmitting}
                  placeholder={t.newsletterInputPlaceholder}
                  className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className={`relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-medium text-sm sm:text-[15px] transition-all duration-300 shadow-md ${
                  isSubmitting || !email.trim()
                    ? "bg-blue-600/40 text-white/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white cursor-pointer shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.newsletterSubscribing}</span>
                  </>
                ) : (
                  <>
                    <span>{t.newsletterButton}</span>
                    <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                  </>
                )}
              </button>
            </div>

            {/* Feedback Messages (Animated with AnimatePresence) */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-4 rounded-xl text-center"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}

              {status === "already_subscribed" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 py-2.5 px-4 rounded-xl text-center"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2.5 px-4 rounded-xl text-center"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Small Disclaimer */}
            <p className="text-center text-[12px] text-neutral-500 mt-4">
              {t.newsletterDisclaimer}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
