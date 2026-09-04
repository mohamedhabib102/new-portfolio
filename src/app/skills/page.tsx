"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { useLoading } from "@/components/providers/LoadingContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import AdminHeaderBadge from "@/components/ui/AdminHeaderBadge";
import FloatingDock from "@/components/ui/FloatingDock";
import ContactSection from "@/features/contact/components/ContactSection";
import FooterSection from "@/features/footer/components/FooterSection";

// Real Frontend & Dev Tools Icons
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiMui,
  SiFramer,
  SiGreensock,
  SiCursor,
  SiGithubcopilot,
  SiAnthropic,
  SiChatbot,
  SiGooglechrome,
  SiPostman,
  SiVite,
  SiWebpack,
  SiLighthouse,
  SiJest,
  SiTestinglibrary,
  SiEslint,
  SiPrettier,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrandReactNative } from "react-icons/tb";

export default function SkillsPage() {
  const { t, isRtl, language } = useTranslation();
  const { isLoaded } = useLoading();

  const skillCards = [
    {
      id: "frontend-core",
      titleEn: "Front-End Core & Frameworks",
      titleAr: "تطوير واجهات المستخدم وأطر العمل",
      descEn: "Building fast, reactive, and user-friendly web interfaces using Next.js 16, React 19, TypeScript, and modern standards.",
      descAr: "بناء واجهات ويب تفاعلية وسريعة وفائقة الاستجابة بالاعتماد على Next.js 16 و React 19 و TypeScript ومعايير الويب العالمية.",
      icons: [
        { icon: <SiHtml5 className="w-5 h-5 text-orange-500" />, label: "HTML5" },
        { icon: <SiCss className="w-5 h-5 text-blue-500" />, label: "CSS3" },
        { icon: <SiJavascript className="w-5 h-5 text-yellow-400" />, label: "JavaScript" },
        { icon: <SiTypescript className="w-5 h-5 text-blue-400" />, label: "TypeScript" },
        { icon: <SiReact className="w-5 h-5 text-cyan-400" />, label: "React 19" },
        { icon: <SiNextdotjs className="w-5 h-5 text-white" />, label: "Next.js 16" },
      ],
    },
    {
      id: "styling",
      titleEn: "Styling & Design Systems",
      titleAr: "التنسيق وأنظمة التصميم",
      descEn: "Crafting visually appealing, pixel-perfect, and responsive layouts with Tailwind CSS, Sass, and modern UI component systems.",
      descAr: "صياغة تصميمات عصرية فائقة الدقة متجاوبة مع كافة الشاشات باستخدام Tailwind CSS و Sass ونظم التصميم المتقدمة.",
      icons: [
        { icon: <SiTailwindcss className="w-5 h-5 text-cyan-400" />, label: "Tailwind CSS" },
        { icon: <SiSass className="w-5 h-5 text-pink-500" />, label: "Sass / SCSS" },
        { icon: <SiMui className="w-5 h-5 text-blue-400" />, label: "Material UI" },
        { icon: <SiBootstrap className="w-5 h-5 text-purple-500" />, label: "Bootstrap" },
      ],
      badges: ["Responsive Design", "Mobile-First", "Dark Mode", "Custom Themes"],
    },
    {
      id: "animations",
      titleEn: "Web Animations & Interactions",
      titleAr: "التحريك وتفاعلات الويب المتقدمة",
      descEn: "Creating 60FPS fluid animations, scroll-driven choreographies, and magnetic micro-interactions that elevate brand feel.",
      descAr: "صناعة حركات انتقالية وتفاعلات حركية فائقة السلاسة بمعدل 60 إطار مع مؤثرات سكرول تجذب المستخدم وترفع قيمة البراند.",
      icons: [
        { icon: <SiGreensock className="w-5 h-5 text-green-400" />, label: "GSAP" },
        { icon: <SiFramer className="w-5 h-5 text-purple-400" />, label: "Framer Motion" },
      ],
      badges: ["ScrollTrigger", "Micro-Interactions", "Spring Physics", "Page Transitions"],
    },
    {
      id: "ai-tools",
      titleEn: "AI Tools & Modern Workflow",
      titleAr: "أدوات الذكاء الاصطناعي والإنتاجية",
      descEn: "Leveraging cutting-edge AI coding environments and models to accelerate component scaffolding, refactoring, and code review.",
      descAr: "تسخير أحدث أدوات ومحررات الذكاء الاصطناعي لمضاعفة سرعة كتابة الكود، وإعادة الهيكلة ومراجعة الجودة البرمجية.",
      icons: [
        { icon: <SiCursor className="w-5 h-5 text-cyan-300" />, label: "Cursor AI" },
        { icon: <SiGithubcopilot className="w-5 h-5 text-white" />, label: "GitHub Copilot" },
        { icon: <SiAnthropic className="w-5 h-5 text-amber-500" />, label: "Claude AI" },
        { icon: <SiChatbot className="w-5 h-5 text-emerald-400" />, label: "AI Assistant" },
      ],
      badges: ["Prompt Engineering", "Context-Aware Dev", "Smart Refactoring"],
    },
    {
      id: "dev-tools",
      titleEn: "Developer Environment & Tools",
      titleAr: "بيئة التطوير وأدوات المطور",
      descEn: "Proficient with industry-standard development software, debugging toolchains, and API exploration suites.",
      descAr: "إتقان كامل لأدوات بيئة العمل الاحترافية، فحص وتصحيح الأخطاء، وتحليل استجابات الـ APIs.",
      icons: [
        { icon: <VscCode className="w-5 h-5 text-blue-400" />, label: "VS Code" },
        { icon: <SiGooglechrome className="w-5 h-5 text-yellow-400" />, label: "Chrome DevTools" },
        { icon: <SiPostman className="w-5 h-5 text-orange-500" />, label: "Postman" },
        { icon: <SiGit className="w-5 h-5 text-red-500" />, label: "Git" },
        { icon: <SiGithub className="w-5 h-5 text-white" />, label: "GitHub" },
      ],
    },
    {
      id: "state-management",
      titleEn: "State Management & Data Fetching",
      titleAr: "إدارة الحالة وجلب البيانات",
      descEn: "Architecting predictable client/server state with modern cache invalidation, optimistic updates, and clean hooks.",
      descAr: "بناء معمارية بيانات مستقرة وسريعة مع تحديثات متفائلة وتخزين مؤقت ذكي واستعلامات غير متزامنة.",
      icons: [
        { icon: <SiRedux className="w-5 h-5 text-purple-400" />, label: "Redux Toolkit" },
        { icon: <SiReactquery className="w-5 h-5 text-red-400" />, label: "React Query" },
      ],
      badges: ["Zustand", "Context API", "Axios", "Optimistic UI", "SWR"],
    },
    {
      id: "build-performance",
      titleEn: "Build Tools & Web Performance",
      titleAr: "أدوات البناء وتحسين الأداء",
      descEn: "Optimizing bundle sizes, tree-shaking, and web vitals to consistently achieve a 95+ score on Google Lighthouse.",
      descAr: "تحسين سرعة التحميل، وتقليص حجم حزم الكود، والوصول إلى تقييم 95+ على Google Lighthouse ومؤشرات الويب الحيوية.",
      icons: [
        { icon: <SiVite className="w-5 h-5 text-purple-400" />, label: "Vite" },
        { icon: <SiWebpack className="w-5 h-5 text-blue-400" />, label: "Webpack" },
        { icon: <SiLighthouse className="w-5 h-5 text-amber-400" />, label: "Lighthouse" },
        { icon: <SiVercel className="w-5 h-5 text-white" />, label: "Turbopack" },
      ],
      badges: ["95+ Lighthouse", "Core Web Vitals", "Code Splitting", "Lazy Loading"],
    },
    {
      id: "testing",
      titleEn: "Testing & Code Quality",
      titleAr: "الاختبارات وضمان جودة الكود",
      descEn: "Writing comprehensive unit, integration, and linting rules to maintain a bug-free, scalable codebase.",
      descAr: "كتابة اختبارات شاملة وقواعد تدقيق قياسية للحفاظ على استقرار الكود البرمجي وسهولة صيانته.",
      icons: [
        { icon: <SiJest className="w-5 h-5 text-red-500" />, label: "Jest" },
        { icon: <SiTestinglibrary className="w-5 h-5 text-red-400" />, label: "Testing Library" },
        { icon: <SiEslint className="w-5 h-5 text-purple-400" />, label: "ESLint" },
        { icon: <SiPrettier className="w-5 h-5 text-cyan-400" />, label: "Prettier" },
      ],
    },
    {
      id: "uiux-design",
      titleEn: "UI/UX & Design Collaboration",
      titleAr: "تصميم الواجهات وتجربة المستخدم",
      descEn: "Translating complex Figma mockups into accessible, pixel-perfect digital experiences with high visual polish.",
      descAr: "تحويل تصميمات فيجما المعقدة إلى واجهات برمجية حية تطابق التصميم بالبكسل مع مراعاة أدق التفاصيل الجمالية.",
      icons: [
        { icon: <SiFigma className="w-5 h-5 text-purple-400" />, label: "Figma" },
      ],
      badges: ["Prototyping", "Wireframing", "Design Handoff", "Atomic Design"],
    },
    {
      id: "mobile-crossplatform",
      titleEn: "Mobile Web & Cross-Platform",
      titleAr: "تطبيقات الهواتف والويب المتجاوب",
      descEn: "Creating sleek cross-platform web and mobile experiences with touch gestures and adaptive viewports.",
      descAr: "تطوير تطبيقات ويب وهواتف ذكية متوافقة مع شاشات اللمس والمنصات المختلفة بأعلى درجات الانسيابية.",
      icons: [
        { icon: <TbBrandReactNative className="w-6 h-6 text-cyan-400" />, label: "React Native" },
      ],
      badges: ["Progressive Web Apps (PWA)", "Touch Gestures", "Adaptive Layouts"],
    },
    {
      id: "deployment-hosting",
      titleEn: "Deployment & Modern Hosting",
      titleAr: "النشر والاستضافة السحابية",
      descEn: "Deploying high-availability frontend applications using Vercel, edge serverless functions, and CI/CD automation.",
      descAr: "نشر تطبيقات الويب بسرعة فائقة عبر Vercel والشبكات الطرفية Edge مع أتمتة دورة البناء والنشر المستمر.",
      icons: [
        { icon: <SiVercel className="w-5 h-5 text-white" />, label: "Vercel" },
        { icon: <SiGithub className="w-5 h-5 text-white" />, label: "GitHub Actions" },
      ],
      badges: ["CI/CD", "Serverless Edge", "DNS & SSL", "Environment Management"],
    },
    {
      id: "frontend-concepts",
      titleEn: "Core Frontend Concepts",
      titleAr: "المفاهيم البرمجية الأساسية للواجهات",
      descEn: "Strong command of DOM mechanics, event loop, asynchronous JavaScript, Web Accessibility (a11y), and semantic HTML.",
      descAr: "فهم عميق لآليات شجرة الـ DOM، دورة الأحداث البرمجية، إمكانية الوصول لذوي الاحتياجات الخاصة (a11y) والـ SEO المتقدم.",
      icons: [
        { icon: <SiHtml5 className="w-5 h-5 text-orange-500" />, label: "Semantic HTML" },
        { icon: <SiTypescript className="w-5 h-5 text-blue-400" />, label: "Clean Code" },
      ],
      badges: ["Accessibility (a11y)", "Technical SEO", "Event Loop", "DOM Tree Optimization"],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Section matching Figma Image 1 */}
      <section className="relative w-full h-[85vh] min-h-[580px] max-h-[900px] flex flex-col justify-between px-6 sm:px-12 pt-8 pb-8 select-none overflow-hidden">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full flex items-start justify-between"
        >
          <Link
            href="/"
            className="text-white/95 font-normal tracking-tight text-sm sm:text-base hover:text-neutral-300 transition-colors"
          >
            {t.codeBy}
          </Link>

          <div className="flex flex-col items-end gap-2.5 max-w-sm sm:max-w-md text-right">
            <div className="flex items-center gap-2.5">
              <AdminHeaderBadge />
              <LanguageToggle />
            </div>
            <p className="text-white/70 text-xs sm:text-[13px] font-normal leading-relaxed">
              {t.skillsHeroSubtitle}
            </p>
          </div>
        </motion.header>

        {/* Center Headline matching Image 1: "Skills that fuel my passion" */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full text-center px-4 my-auto"
        >
          <h1
            className="font-normal text-white tracking-tight select-none inline-block max-w-4xl"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.8rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
            }}
          >
            {t.skillsHeadline}
          </h1>
        </motion.div>

        {/* Floating Dock at bottom center of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 w-full flex justify-center"
        >
          <FloatingDock />
        </motion.div>
      </section>

      {/* 2. Skills Grid matching Figma Image 2 */}
      <section className="relative w-full py-20 px-6 sm:px-12 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {skillCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-[26px] bg-[#14151a] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Tech Icons Row */}
                {card.icons && card.icons.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 mb-6">
                    {card.icons.map((item, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                        title={item.label}
                      >
                        {item.icon}
                      </div>
                    ))}
                  </div>
                )}

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {language === "ar" ? card.titleAr : card.titleEn}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed">
                  {language === "ar" ? card.descAr : card.descEn}
                </p>
              </div>

              {/* Badges / Concepts */}
              {card.badges && (
                <div className="flex flex-wrap gap-1.5 pt-6 mt-4 border-t border-white/5">
                  {card.badges.map((b, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[11px] font-normal rounded-full bg-white/5 text-neutral-300 border border-white/5"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Reusable Contact Section: 'Got a project in mind? Let's talk' */}
      <ContactSection />

      {/* 4. Reusable Footer Section */}
      <FooterSection />
    </main>
  );
}
