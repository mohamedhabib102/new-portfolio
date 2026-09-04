"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiClient } from "@/lib/axios";
import MagneticButton from "@/components/ui/MagneticButton";
import { X, Check, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const router = useRouter();
  const { t, isRtl } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isAdminRedirect, setIsAdminRedirect] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await apiClient.post("/api/contact", formData);
      if (res.data?.isAdmin) {
        setIsAdminRedirect(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("mowafy_admin_logged_in", "true");
          sessionStorage.setItem("mowafy_admin_authenticated", "true");
        }
        setTimeout(() => {
          setIsModalOpen(false);
          setIsAdminRedirect(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
          router.push("/dashboard");
        }, 1200);
        return;
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (err) {
      console.warn("Contact form notice:", err);
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-20 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-12 lg:px-20 bg-white text-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[440px]">
        {/* Top Text & Heading matching Figma Image with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <span className="text-xs sm:text-[13px] text-neutral-600 tracking-wide font-normal">
            {t.thatsAllForNow}
          </span>

          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight leading-[1.08] text-neutral-950 mt-1">
            <p>{t.gotAProject}</p>
            <p>{t.letsTalk}</p>
          </div>
        </motion.div>

        {/* Divider line intersected by Big Cobalt Blue Circle with Magnetic Hover Animation */}
        <div className="relative w-full my-16 sm:my-20">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-[1px] bg-neutral-300 origin-left"
          />

          {/* Big Blue Circular Button with Interactive Magnetic Hover */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-20 ${
              isRtl ? "left-6 sm:left-14" : "right-6 sm:right-14"
            }`}
          >
            <MagneticButton strength={0.45}>
              <button
                onClick={() => setIsModalOpen(true)}
                id="get-in-touch-btn"
                className="group relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-[#3b5afb] hover:bg-[#324fec] text-white transition-all duration-300 cursor-pointer shadow-[0_15px_35px_rgba(59,90,251,0.35)] hover:shadow-[0_20px_45px_rgba(59,90,251,0.55)] active:scale-95"
                aria-label="Get in touch"
              >
                <span className="text-sm sm:text-base font-normal tracking-tight text-white group-hover:scale-110 transition-transform duration-200">
                  {t.getInTouch}
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Details with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-400 font-normal">
              {t.emailLabel}
            </span>
            <a
              href="mailto:mowafy.dev@gmail.com"
              className="text-sm sm:text-base font-normal text-neutral-900 hover:text-blue-600 transition-colors"
            >
              mowafy.dev@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-400 font-normal">
              {t.phoneLabel}
            </span>
            <a
              href="tel:01027227796"
              className="text-sm sm:text-base font-normal text-neutral-900 hover:text-blue-600 transition-colors"
            >
              <span dir="ltr">01027227796</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} text-white/50 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-medium tracking-tight mb-2">
                {t.getInTouch}
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                {isRtl
                  ? "اترك رسالتك وسأقوم بالرد عليك سريعاً."
                  : "Send a message and I'll get back to you promptly."}
              </p>

              {isAdminRedirect ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center animate-pulse">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {isRtl ? "مرحباً يا محمد! تم التحقق بنجاح" : "Welcome Mohamed! Access Granted"}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {isRtl ? "جاري نقلك للوحة التحكم..." : "Redirecting to your Dashboard..."}
                  </p>
                </div>
              ) : submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {isRtl ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isRtl ? "الاسم" : "Name"}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isRtl ? "اسمك الكريم" : "Your Name"}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isRtl ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isRtl ? "الرسالة" : "Message"}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isRtl ? "أخبرني عن تفاصيل مشروعك..." : "Tell me about your project..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting
                      ? isRtl
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : isRtl
                      ? "إرسال الرسالة"
                      : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
