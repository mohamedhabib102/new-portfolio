import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Project } from "@/features/projects/types";

export const initialProjects: Project[] = [
  {
    id: "proj-buildflow-builder",
    slug: "buildflow-saas-web-builder",
    titleEn: "Buildflow - SaaS Visual Website Builder Platform",
    titleAr: "منصة Buildflow - أداة سحابية تفاعلية لبناء وتصميم المواقع",
    descriptionEn: "A high-performance SaaS visual website builder engineered to empower creators, developers, and businesses to build, customize, and publish modern responsive web experiences in minutes with zero code. Packed with an intuitive drag-and-drop canvas, customizable component trees, real-time CSS styling inspector, responsive multi-device previews, clean code generation, and instant cloud publishing.",
    descriptionAr: "منصة سحابية متطورة (SaaS) لبناء وتصميم مواقع الويب بصرياً وتفاعلياً، تُمكّن المطورين والمستخدمين من تصميم صفحات ويب عصرية فائقة الاستجابة والسرعة دون الحاجة إلى كتابة كود. تحتوي على محرر سحب وإفلات (Drag & Drop Canvas)، هيكلية مكونات ديناميكية، محرر خصائص وتنسيقات CSS فوري، معاينة تفاعلية لكافة الشاشات (Desktop, Tablet, Mobile)، وتوليد كود نظيف مع نشر سحابي فوري.",
    videoUrl: "/web-builder.mp4",
    coverImage: "/buildflow-cover.jpg",
    images: ["/buildflow-cover.jpg"],
    liveUrl: "https://web-builder-nu-ten.vercel.app/",
    githubUrl: "https://github.com/mohamedhabib102/buildflow",
    githubPrivate: true,
    status: "in_development",
    tags: ["SaaS Platform", "Next.js", "TypeScript", "Tailwind CSS", "Canvas Builder", "Web Development", "UI/UX", "State Management"],
    featured: true,
    order: 1,
    featuresEn: [
      "Visual Drag & Drop Canvas: Intuitive layout construction with live reordering and element snapping",
      "Real-time Styling Inspector: Granular CSS control over typography, colors, layout grids, and padding",
      "Multi-Device Responsive Previews: Instant switching between Desktop, Tablet, and Mobile viewports",
      "Clean Code Export & Publishing: Generates clean semantic code ready for instant production deployment",
      "Reusable Component Architecture: Modular design blocks designed for rapid prototyping and scale"
    ],
    featuresAr: [
      "محرر بصري تفاعلي بالسحب والإفلات: بناء صفحات متكاملة وتنسيق العناصر وترتيبها بكل سلاسة ودقة",
      "مفتش تنسيقات وتصميم فوري: تحكم دقيق في الألوان، الخطوط، المسافات، وتوزيع شبكات Grid و Flexbox",
      "معاينة متجاوبة لكافة الأجهزة: تبديل فوري بين أوضاع سطح المكتب، التابلت، وشاشات الهواتف الذكية",
      "تصدير كود نظيف ونشر سحابي: توليد كود نظيف عالي الأداء مع إمكانية نشر الموقع بنقرة زر",
      "بنية مكونات برمجية قابلة لإعادة الاستخدام: مكتبة بلوكات وعناصر معيارية لتسريع وتيرة بناء المواقع"
    ]
  },
  {
    id: "proj-serv5-optimization",
    slug: "serv5-platform-optimization",
    titleEn: "Serv5 Corporate Platform & Performance Revamp",
    titleAr: "منصة Serv5 - تحسين الأداء وإعادة الهيكلة الشاملة",
    company: "Serv5",
    descriptionEn: "Developed and contributed to during my tenure with Serv5. My role focused on frontend performance engineering, UI optimization, and modern web architecture. Key contributions included optimizing Core Web Vitals and load times, engineering an intuitive rich typography engine for content and blogs, refining responsive layouts across all device form factors, and integrating seamless micro-interactions using Next.js and Framer Motion.",
    descriptionAr: "تم تطويره والمساهمة البرمجية فيه خلال فترة عملي مع شركة Serv5؛ حيث ركز دوري كـ Front-End Developer على رفع كفاءة وأداء الواجهات الرقمية وتطوير حلول متقدمة لتجربة المستخدم. شمل العمل تحسين سرعة استجابة الصفحات وتطبيق أفضل ممارسات Core Web Vitals، وإعادة هيكلة وتطوير نظام تنسيقات المدونات والمقالات التفاعلية بتنسيق احترافي شبيه بمحررات النصوص، مع ضبط التصميم المتجاوب بدقة متناهية لكافة الشاشات، واستخدام مكون Next.js Image لمعالجة الصور وحركات Framer Motion الانسيابية.",
    videoUrl: "/serv5.mp4",
    liveUrl: "https://serv5.com.eg/",
    githubUrl: null,
    githubPrivate: true,
    status: "production",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Framer Motion", "Performance Optimization", "Next Image", "Responsive Design", "Rich Text Blogs"],
    featured: true,
    order: 2,
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
    company: "Serv5",
    descriptionEn: "Developed during my tenure with Serv5, where I engineered the complete frontend architecture from the ground up using Vue.js along with custom UI/UX design. The platform is a comprehensive real estate solution featuring role-based workflows for buyers, property owners, brokers, real estate developers, and administrators, equipped with advanced property discovery and streamlined unit listings.",
    descriptionAr: "تم العمل على هذا المشروع وتطويره خلال فترة عملي مع شركة Serv5؛ حيث توليت بناء وهندسة الواجهة الأمامية للمنصة بالكامل من الصفر (Frontend from scratch) بالاعتماد على Vue.js وتصميم تجربة المستخدم التفاعلية. تتميز المنصة بنظام متكامل لإدارة العقارات يدعم أدواراً وصلاحيات متعددة (المشتري، المالك، الوسيط العقاري، المطورين العقاريين، ولوحة التحكم الإدارية)، مع واجهات مرنة ومتقدمة لإدراج وتصفح المشاريع والوحدات العقارية بدقة وسلاسة.",
    videoUrl: "/aqaratonline.mp4",
    liveUrl: "http://aqaratonline.net/",
    githubUrl: null,
    githubPrivate: true,
    status: "production",
    tags: ["Vue.js", "UI/UX Design", "Figma", "Tailwind CSS", "JavaScript", "Real Estate Platform", "Multi-Role RBAC", "Super-Admin Dashboard"],
    featured: true,
    order: 3,
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
    status: "production",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "ASP.NET Core", "REST APIs", "UI/UX Design"],
    featured: true,
    order: 4,
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
    status: "production",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth", "Context API", "Framer Motion", "Audio Streaming"],
    featured: true,
    order: 5,
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
