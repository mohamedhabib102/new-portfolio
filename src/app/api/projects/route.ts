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
    featuresEn: [
      "Eliminated heavy loading bottlenecks and optimized scripts for instantaneous page delivery",
      "Overhauled blog typography with rich Word-style formatting for headings, lead paragraphs, styled quotes, and links",
      "Fixed broken responsive design across all viewports from smartphones to 4K displays",
      "Implemented Next.js built-in Image optimization with automatic WebP conversion and zero CLS",
      "Engineered fluid UI animations, micro-interactions, and scroll effects with Framer Motion and modern JS"
    ],
    featuresAr: [
      "معالجة مشاكل الأداء والتحميل الثقيل ورفع كفاءة سرعة استجابة الموقع ومؤشرات Core Web Vitals",
      "تنسيق نظام المدونات والمقالات بتنسيقات غنية للعناوين والأوصاف والروابط على غرار محررات النصوص مثل Word",
      "إصلاح وضبط التصميم المتجاوب (Responsive Design) لكافة الشاشات والهواتف والأجهزة اللوحية بدقة متناهية",
      "استخدام مكون Next.js Image المدمج لمعالجة الصور تلقائياً ومنع تذبذب وانزياح الواجهة (CLS)",
      "إضافة حركات وتفاعلات بصرية سلسة باستخدام Framer Motion وجافاسكريبت الحديثة"
    ]
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
    featuresEn: [
      "Full Lifecycle Execution: Custom Figma UI/UX architecture translated into a modular Vue.js frontend",
      "Multi-Role Permission Architecture: Dedicated portals for Buyers, Owners, Brokers, Companies, and Super-Admin",
      "Compound & Unit Purchasing: Real estate firms can list compounds with unit-level inventory and specs",
      "Super-Admin Governance: Granular control over all platform static & dynamic page contents and listings",
      "Advanced Property Discovery: Interactive filters for location, budget, property types, and amenities"
    ],
    featuresAr: [
      "تنفيذ كامل من الصفر: تصميم واجهات وتجربة المستخدم UI/UX في Figma وتحويلها لكود متكامل بـ Vue.js",
      "نظام أدوار متعدد وصلاحيات: بوابات مخصصة لكل من المشتري، المالك، السمسار، المطورين، والسوبر أدمن",
      "إدارة مشاريع الكومباوند والوحدات: رفع مشاريع عقارية كبرى مع تمكين المشترين من حجز وشراء الوحدات فردياً",
      "لوحة تحكم Super-Admin متطورة: إدارة شاملة لكافة محتويات الصفحات والخدمات وإعدادات المنصة بالكامل",
      "محرك بحث وفلترة عقارية متقدم: تصفية دقيقة بحسب المنطقة، نوع العقار، الأسعار، والمواصفات"
    ]
  },
  {
    id: "proj-1788541272452",
    slug: "sohighla",
    titleEn: "Shogla - On-Demand Craftsmen Marketplace",
    titleAr: "منصة شغلة - وساطة رقمية للحرفيين والتشطيبات",
    descriptionEn: "Shogla is a modern on-demand digital marketplace designed to seamlessly connect homeowners and clients with qualified, trusted local craftsmen and technicians. The platform enables clients to submit customized service requests, review technician profiles, and establish direct service agreements. To ensure safety and service reliability, craftsmen undergo an identity verification process. Built with Next.js, TypeScript, and Tailwind CSS with Zustand state management.",
    descriptionAr: "منصة شغلة هي منصة وساطة رقمية متطورة تهدف إلى تسهيل وصول العملاء إلى أمهر الحرفيين والفنيين الموثوقين في مجالات الصيانة والتشطيبات المنزلية. تعمل المنصة كحلقة وصل ذكية تتيح للعميل استعراض الحرفيين المعتمدين وإنشاء طلبات تواصل وشرح متطلبات العمل ليقوم الحرفي باستقبال الطلب والاتفاق المباشر. تم بناء واجهات المشروع بالاعتماد على Next.js و TypeScript و Tailwind CSS مع إدارة الحالة عبر Zustand.",
    videoUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/1788540982041_sohighla.mp4",
    liveUrl: "http://sohighla.vercel.app/",
    githubUrl: "https://github.com/mohamedhabib102/sohighla",
    githubPrivate: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "ASP.NET Core", "REST APIs", "UI/UX Design"],
    featured: true,
    order: 3,
    featuresEn: [
      "Direct Craftsman Booking: Seamless service requests and communication between clients and verified technicians",
      "Strict Identity Verification: Rigorous background verification workflows before technician profile publishing",
      "Smart Re-hiring History: Client dashboard for tracking previous technicians and quick one-click re-hiring",
      "Transparent Ratings Engine: Authentic user review system reflecting real customer service feedback",
      "High-Performance UI: Fast Next.js frontend with lightweight Zustand client state management"
    ],
    featuresAr: [
      "حجز وتواصل مباشر مع الحرفيين: سهولة إنشاء طلبات الصيانة والتواصل مع الفنيين المعتمدين",
      "نظام تحقق وتدقيق صارم للهوية: فحص واعتماد هويات الحرفيين لضمان أمان وموثوقية الخدمة",
      "سجل تفاعلي لإعادة الطلب: لوحة تحكم تتيح الاحتفاظ بسجل الصنايعية وسهولة الرجوع إليهم",
      "محرك تقييمات ومراجعات شفافة: نظام تقييم دقيق يعكس جودة الخدمة الحقيقية",
      "أداء فائق واستجابة سريعة: واجهات Next.js سريعة مع إدارة خفيفة للحالة عبر Zustand"
    ]
  },
  {
    id: "proj-1788541485137",
    slug: "noor-alhuda",
    titleEn: "Noor Alhuda - Islamic Platform & Audio Streaming",
    titleAr: "منصة نور الهدى - منصة إسلامية وبث صوتي تفاعلي",
    descriptionEn: "A comprehensive Islamic digital platform engineered with modern web technologies. Features Holy Qur’an reading with an intuitive interface, audio streaming player for listening to renowned Qur’an reciters, morning/evening adhkar, Google authentication via NextAuth, and an interactive Community hub for publishing and sharing articles. Built using Next.js, TypeScript, Tailwind CSS, Framer Motion, and Context API.",
    descriptionAr: "منصة إسلامية رقمية شاملة تم بناؤها بأحدث تقنيات الويب لتقديم تجربة إيمانية متكاملة وسلسة. تتيح المنصة قراءة القرآن الكريم وتصفح الآيات بسهولة، مع مشغل صوتي متقدم للبث والاستماع للتلاوات القرآنية، وقسم خاص لأذكار الصباح والمساء، وتسجيل دخول آمن بحسابات Google عبر NextAuth، ومجتمع تفاعلي لنشر ومشاركة المقالات الهادفة. تم التطوير باستخدام Next.js و TypeScript و Tailwind CSS و Framer Motion و Context API.",
    videoUrl: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/1788543258827_2026-09-04_20-08-03.mp4",
    liveUrl: "https://noor-alhuda-lyart.vercel.app/",
    githubUrl: "https://github.com/mohamedhabib102/noor-alhuda",
    githubPrivate: false,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth", "Context API", "Framer Motion", "Audio Streaming"],
    featured: true,
    order: 4,
    featuresEn: [
      "Quran Reader & Typography: Clean, accessible Arabic font rendering and surah navigation",
      "Synchronized Audio Streaming: Global audio playback with reciter selection and smooth streaming",
      "Interactive Community Hub: User publishing and sharing of articles across social networks",
      "Morning & Evening Adhkar: Dedicated daily remembrance section with counter interactions",
      "Secure NextAuth Authentication: Google OAuth sign-in with personalized user bookmarking"
    ],
    featuresAr: [
      "مصحف إلكتروني بخطوط واضحة: تصفح سهل ومريح للآيات والسور القرآنية",
      "مشغل صوتي متزامن للبث: استماع لتلاوات خاشعة بأصوات كبار القراء مع تحكم صوتي شامل",
      "مجتمع ومقالات تفاعلية: إمكانية نشر ومشاركة المقالات الهادفة عبر شبكات التواصل",
      "أذكار الصباح والمساء: قسم مخصص للأدعية والأذكار اليومية مع عداد تسبيح تفاعلي",
      "تسجيل دخول آمن بـ NextAuth: دعم تسجيل الدخول بحسابات Google لحفظ المقالات والمفضلة"
    ]
  }
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
