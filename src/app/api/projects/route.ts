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
    titleEn: "Serv5 Platform - Frontend Development & Modernization",
    titleAr: "منصة Serv5 - تطوير وتحسين الواجهات الأمامية",
    company: "Serv5",
    descriptionEn: "Contributed to during my tenure with Serv5, focusing on front-end development, modernizing user interface components, fine-tuning article reading layouts, and optimizing rendering performance to deliver a polished digital presence and responsive user experience.",
    descriptionAr: "مشروع تمت المساهمة فيه خلال فترة العمل مع شركة Serv5؛ حيث انصب التركيز على تطوير وتحسين الواجهات الأمامية (Front-End)، وتحديث عناصر تجربة المستخدم وضبط وتنسيق صفحات المقالات، مع تطبيق أفضل ممارسات تحسين الأداء وتسريع التصفح لتقديم مظهر رقمي متناسق وسريع الاستجابة.",
    videoUrl: "/serv5.mp4",
    liveUrl: "https://serv5.com.eg/",
    githubUrl: null,
    githubPrivate: true,
    status: "production",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Performance Optimization", "Responsive Design", "UI Modernization"],
    featured: true,
    order: 2,
    featuresEn: [
      "Implemented modern front-end optimization techniques to enhance responsiveness and load speed",
      "Refined and unified UI design components for a cohesive, professional appearance",
      "Structured and refined article layouts for optimal readability and professional content presentation",
      "Optimized asset loading and media handling to ensure efficient resource utilization",
      "Integrated subtle micro-interactions and transitions to enrich user engagement seamlessly"
    ],
    featuresAr: [
      "تطبيق معايير حديثة لتحسين سرعة تحميل الصفحات ورفع كفاءة استجابة الواجهات الرقمية",
      "تحديث وتنسيق عناصر التصميم لضمان مظهر بصري متناسق واحترافي عبر المنصة",
      "ضبط وتنسيق قوالب صفحات المقالات لتوفير تجربة قراءة وعرض محتوى سلسة واحترافية",
      "تحسين إدارة الوسائط الرقمية واستدعاء الموارد لتسريع التفاعل وتقليل استهلاك البيانات",
      "دمج تأثيرات حركية خفيفة وانتقالات ناعمة لتعزيز حيوية التفاعل دون التأثير على السرعة"
    ]
  },
  {
    id: "proj-aqarat-online",
    slug: "aqarat-online-platform",
    titleEn: "Aqarat Online - Modern Web Interface",
    titleAr: "منصة عقارات أونلاين - واجهة مستخدم تفاعلية",
    company: "Serv5",
    descriptionEn: "Developed during my tenure with Serv5, where I engineered the front-end interface and crafted the interactive user experience from scratch using Vue.js. The focus was on delivering intuitive navigation, seamless interactions, and a clean, responsive layout across all devices.",
    descriptionAr: "مشروع تم تنفيذه خلال فترة العمل مع شركة Serv5، حيث توليت تطوير وهندسة واجهة المستخدم (Front-End) وتصميم تجربة الاستخدام التفاعلية بالاعتماد على Vue.js وأحدث تقنيات الويب الحديثة، مع التركيز على تقديم تجربة تصفح مرنة وسلسة وتصميم عصري متجاوب مع مختلف الشاشات.",
    videoUrl: "/aqaratonline.mp4",
    liveUrl: "http://aqaratonline.net/",
    githubUrl: null,
    githubPrivate: true,
    status: "production",
    tags: ["Vue.js", "JavaScript", "Tailwind CSS", "UI/UX Design", "Responsive Design", "Frontend Architecture"],
    featured: true,
    order: 3,
    featuresEn: [
      "Engineered a scalable front-end architecture using Vue.js with modular, reusable components",
      "Designed intuitive and accessible user interfaces focused on clean user experience (UI/UX)",
      "Developed interactive, responsive components for seamless content discovery and browsing",
      "Ensured high responsiveness and visual consistency across desktop, tablet, and mobile devices",
      "Maintained clean, maintainable code following modern front-end best practices"
    ],
    featuresAr: [
      "بناء وتأسيس بنية الواجهة الأمامية بالاعتماد على Vue.js وهيكلية المكونات المعيارية القابلة لإعادة الاستخدام",
      "تصميم وتنفيذ واجهات تفاعلية تركز على سهولة الاستخدام وانسيابية تجربة المستخدم (UI/UX)",
      "تطوير عناصر بحث وتصفح ذكية لعرض المحتوى وتسهيل وصول المستخدمين للمعلومات بسلاسة",
      "تحقيق أعلى معايير التوافق والتجاوب التام عبر جميع الشاشات والأجهزة الذكية",
      "كتابة كود نظيف وعالي الجودة وفق أفضل الممارسات المعمارية للواجهات الأمامية"
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
  const visibleProjects = allProjects.filter((p: any) => !p.isHidden);
  const filtered = featured
    ? visibleProjects.filter((p: any) => p.featured)
    : visibleProjects;

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}
