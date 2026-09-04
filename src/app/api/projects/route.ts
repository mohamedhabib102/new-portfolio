import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Project } from "@/features/projects/types";

export const initialProjects: Project[] = [
  {
    id: "proj-serv5-optimization",
    slug: "serv5-platform-optimization",
    titleEn: "Serv5 Corporate Platform & Performance Revamp",
    titleAr: "منصة Serv5 - تحسين الأداء وإعادة الهيكلة الشاملة",
    descriptionEn: "A comprehensive performance and UX overhaul for Serv5's production web platform. Solved severe page load latency and heavy resource bottlenecks to achieve seamless Core Web Vitals. Re-architected the blog formatting engine to support Word-like rich typography (structured headings, styled descriptions, custom links, and quotes). Restored and perfected responsive layouts across mobile and desktop, eliminated layout shift with Next.js built-in <Image /> optimization, and animated interface elements smoothly using Framer Motion.",
    descriptionAr: "مشروع تطوير وإعادة هندسة شاملة لموقع منصة Serv5 بعد وجود مشاكل أداء واختناقات في سرعة التحميل وتنسيقات الواجهة. قمت بتحسين الأداء العام للموقع والتخلص من بطء التحميل الثقيل لضمان تجربة تصفح فائقة السرعة، وإعادة هيكلة وتنسيق صفحات المدونات (Blogs) بشكل كامل لتوفير تنسيقات نصوص احترافية للعناوين والأوصاف والروابط تشبه محررات النصوص مثل Word، مع ضبط وتصحيح التصميم المتجاوب (Responsive Design) الذي كان يعاني من مشاكل في العرض، وتطبيق مكون Next.js Image المدمج مع تحريكات Framer Motion الانسيابية.",
    videoUrl: "/serv5.mp4",
    liveUrl: "https://serv5.com.eg/",
    githubUrl: null,
    githubPrivate: true,
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Framer Motion", "Performance Optimization", "Next Image", "Responsive Design", "Rich Text Blogs"],
    featured: true,
    order: 1,
  },
  {
    id: "proj-aqarat-online",
    slug: "aqarat-online-platform",
    titleEn: "Aqarat Online - Multi-Role Real Estate Ecosystem",
    titleAr: "منصة عقارات أونلاين - منصة عقارية متكاملة متعددة الأدوار",
    descriptionEn: "Engineered from the ground up starting from custom UI/UX design and wireframing in Figma to full frontend realization using Vue.js. A comprehensive multi-role real estate platform featuring tailored workflows for Buyers, Property Owners, Brokers/Agents (listing individual properties), Real Estate Developers/Companies (publishing mega compounds and facilitating unit-by-unit sales), and a Super-Admin with full governance over platform pages and dynamic content.",
    descriptionAr: "منصة عقارات متكاملة صممتها ونفذتها بالكامل من البداية؛ بدءاً من تصميم تجربة وواجهة المستخدم UI/UX على Figma وحتى برمجتها كواجهة أمامية باستخدام Vue.js. تتميز المنصة بنظام أدوار وصلاحيات متكامل يخدم: المشتري، المالك، السمسار (لرفع العقارات)، الشركات العقارية والمطورين (لرفع كمبوندات ومشاريع ضخمة مع إمكانية شراء وحجز الوحدات بشكل منفصل)، بالإضافة إلى لوحة تحكم Super-Admin للتحكم الشامل في محتوى وتصميم صفحات الموقع بالكامل.",
    videoUrl: "/aqaratonline.mp4",
    liveUrl: "http://aqaratonline.net/",
    githubUrl: null,
    githubPrivate: true,
    tags: ["Vue.js", "UI/UX Design", "Figma", "Tailwind CSS", "JavaScript", "Real Estate Platform", "Multi-Role RBAC", "Super-Admin Dashboard"],
    featured: true,
    order: 2,
  },
  {
    id: "proj-1",
    slug: "learnlogicify-landing-page",
    titleEn: "Learnlogicify Landing Page",
    titleAr: "صفحة هبوط Learnlogicify",
    descriptionEn: "Accelerate the tech career and build your future faster. A high-conversion landing page with smooth animations and interactive components.",
    descriptionAr: "منصة تعليمية لتسريع المسار المهني والبرمجي، مصممة بأحدث تقنيات الويب مع حركة سلسة وعناصر تفاعلية عالية الأداء.",
    videoUrl: "/test.mp4",
    liveUrl: "https://example.com/learnlogicify",
    githubUrl: "https://github.com/mowafy-dev",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    featured: true,
    order: 3,
  },
  {
    id: "proj-2",
    slug: "winzee-web-chat",
    titleEn: "Winzee Web Chat application",
    titleAr: "تطبيق الدردشة والمحادثة Winzee",
    descriptionEn: "Modern real-time web messaging platform with clean design, instant websocket delivery, and multimedia sharing capabilities.",
    descriptionAr: "تطبيق محادثة فورية عصري بتصميم جذاب واتصال آني بالويب سوكت ومشاركة الوسائط بأعلى درجات السرعة.",
    videoUrl: "/test.mp4",
    liveUrl: "https://example.com/winzee",
    githubUrl: "https://github.com/mowafy-dev",
    tags: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
    featured: true,
    order: 4,
  },
  {
    id: "proj-3",
    slug: "chatgpt-clone",
    titleEn: "ChatGPT clone",
    titleAr: "منصة استنساخ ChatGPT المتطورة",
    descriptionEn: "Sleek AI conversational interface with streaming markdown responses, prompt caching, conversation trees, and dark mode.",
    descriptionAr: "واجهة محادثة ذكاء اصطناعي متكاملة مع ميزة التدفق الفوري للنصوص، سجل المحادثات والوضع الليلي الأنيق.",
    videoUrl: "/test.mp4",
    liveUrl: "https://example.com/chatgpt-clone",
    githubUrl: "https://github.com/mowafy-dev",
    tags: ["Next.js", "OpenAI API", "Prisma", "Tailwind CSS"],
    featured: true,
    order: 5,
  },
  {
    id: "proj-4",
    slug: "gemini-clone",
    titleEn: "Gemini Clone",
    titleAr: "تطبيق Gemini Clone الذكي",
    descriptionEn: "Next-generation multimodal AI web app inspired by Google Gemini, featuring voice synthesis, image reasoning, and fluid animations.",
    descriptionAr: "تطبيق ويب للذكاء الاصطناعي متعدد الوسائط مستوحى من Google Gemini مع دعم تحليل الصور والتحريك التفاعلي.",
    videoUrl: "/test.mp4",
    liveUrl: "https://example.com/gemini-clone",
    githubUrl: "https://github.com/mowafy-dev",
    tags: ["Next.js", "Gemini API", "Framer Motion", "Tailwind CSS"],
    featured: true,
    order: 6,
  },
];

import { portfolioStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";

  const allProjects = await portfolioStore.getProjects();
  const filtered = featured
    ? allProjects.filter((p: any) => p.featured)
    : allProjects;

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}
