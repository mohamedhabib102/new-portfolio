import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Project } from "@/features/projects/types";

export const initialProjects: Project[] = [
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
    order: 1,
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
    order: 2,
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
    order: 3,
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
    order: 4,
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
