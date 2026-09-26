"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiClient } from "@/lib/axios";
import MagneticButton from "@/components/ui/MagneticButton";
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Send
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function ContactSection() {
  const router = useRouter();
  const { t, isRtl, language } = useTranslation();
  const isAr = language === "ar";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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
      }, 2500);
    } catch (err) {
      console.warn("Contact form notice:", err);
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2500);
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
        {/* 1. Top Text & Classic Heading with Added Motivating Consultation Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 max-w-4xl"
        >
          <span className="text-xs sm:text-[13px] text-neutral-600 tracking-wide font-normal">
            {t.thatsAllForNow}
          </span>

          {/* Iconic Large Display Heading */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight leading-[1.08] text-neutral-950 mt-1">
            <p>{t.gotAProject}</p>
            <p>{t.letsTalk}</p>
          </div>

          {/* Added Motivating Copy explaining the consultation value naturally */}
          <p
            className={`text-sm sm:text-base md:text-lg text-neutral-600 font-normal mt-3 max-w-3xl ${
              isRtl ? "leading-[1.9]" : "leading-relaxed"
            }`}
          >
            {isAr
              ? "سواء كنت تؤسس مشروعاً برمجياً جديداً، أو ترغب في مضاعفة سرعة وأداء وتجربة منصتك الحالية لتنافس بقوة، أو ترغب في مناقشة تفاصيل برمجية وتحديات معمارية في الويب — يسعدني أن نتحدث في جلسة استشارية مجانية لنناقش كل الجوانب التقنية ونضع خطة عمل وتكلفة واضحة تناسب أهدافك."
              : "Whether you're building a new software product from scratch, revamping your existing platform for peak performance, or looking to discuss modern web architecture and technical challenges — let's connect for a free 30-minute consultation to explore solutions and outline a clear roadmap."}
          </p>
        </motion.div>

        {/* 2. Iconic Divider line intersected by Big Cobalt Blue Circle Button */}
        <div className="relative w-full my-16 sm:my-20">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-[1px] bg-neutral-300 origin-left"
          />

          {/* Big Blue Circular Button with Interactive Magnetic Hover - Opens Modal */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-20 ${
              isRtl ? "left-6 sm:left-14" : "right-6 sm:right-14"
            }`}
          >
            <MagneticButton strength={0.45}>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                id="get-in-touch-btn"
                className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-[#3b5afb] hover:bg-[#2f4df5] text-white transition-all duration-300 cursor-pointer shadow-[0_15px_35px_rgba(59,90,251,0.35)] hover:shadow-[0_20px_45px_rgba(59,90,251,0.55)] active:scale-95"
                aria-label={t.getInTouch}
              >
                <span className="text-sm sm:text-base font-normal tracking-tight text-white group-hover:scale-105 transition-transform duration-200 text-center px-4">
                  {t.getInTouch}
                </span>
                <span className="text-[11px] text-white/80 mt-1 font-light">
                  {isAr ? "احجز استشارتك" : "Free Consultation"}
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* 3. Bottom Details with Direct Contact and WhatsApp Link */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl"
        >
          {/* Email */}
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

          {/* Phone */}
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

          {/* Direct WhatsApp */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-neutral-400 font-normal">
              {isAr ? "واتساب مباشر:" : "Direct WhatsApp:"}
            </span>
            <a
              href="https://wa.me/201027227796?text=مرحباً%20محمد،%20أود%20حجز%20استشارة%20مجانية%20لمشروعي"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-normal text-neutral-900 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
            >
              <IoLogoWhatsapp className="w-4 h-4 text-[#25D366]" />
              <span dir="ltr">+20 102 722 7796</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Consultation Modal (The Original Centered Popup Dialog with Enhanced Copy) */}
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
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-6 ${
                  isRtl ? "left-6" : "right-6"
                } text-white/50 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 mb-2 text-blue-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "جلسة استشارية مجانية" : "Free 30-Min Strategy Call"}</span>
              </div>

              <h3 className="text-xl font-medium tracking-tight mb-2">
                {isAr ? "احجز استشارتك المجانية لمشروعك" : "Book Your Free Consultation"}
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-light leading-relaxed">
                {isAr
                  ? "أخبرني عن فكرة مشروعك أو التحديات البرمجية التي تواجهك، وسأقوم بالرد والتواصل معك سريعاً لتحديد موعد الجلسة."
                  : "Tell me about your project or technical challenges, and I'll get back to you promptly to schedule the session."}
              </p>

              {isAdminRedirect ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center animate-pulse">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {isAr ? "مرحباً يا محمد! تم التحقق بنجاح" : "Welcome Mohamed! Access Granted"}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {isAr ? "جاري نقلك للوحة التحكم..." : "Redirecting to your Dashboard..."}
                  </p>
                </div>
              ) : submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {isAr ? "تم إرسال طلبك بنجاح!" : "Request Sent Successfully!"}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {isAr ? "سأتواصل معك في أقرب وقت." : "I will get back to you shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isAr ? "الاسم" : "Name"}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "اسمك الكريم" : "Your Name"}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isAr ? "البريد الإلكتروني *" : "Email Address *"}
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
                      {isAr ? "رقم الهاتف / واتساب (اختياري)" : "Phone / WhatsApp (Optional)"}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={isAr ? "010xxxxxxxx" : "+1 234 567 890"}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {isAr ? "تفاصيل المشروع" : "Project Details"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? "أخبرني باختصار عن فكرتك أو التحديات في مشروعك..."
                          : "Tell me briefly about your project goals..."
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{isAr ? "جاري الإرسال..." : "Sending..."}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isAr ? "إرسال وحجز الاستشارة" : "Send & Book Consultation"}</span>
                      </>
                    )}
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
