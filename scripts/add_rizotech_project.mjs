import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const rizoTechProject = {
  id: "proj-rizotech-edtech",
  slug: "rizotech-agricultural-edtech",
  titleEn: "RizoTech - Agricultural EdTech & Learning Platform",
  titleAr: "منصة ريزوتيك (RizoTech) - المنصة التعليمية المتخصصة في العلوم الزراعية",
  descriptionEn: "A comprehensive vertical EdTech platform dedicated to agricultural sciences, smart farming, and agribusiness education. Engineered to bridge the gap between academic theory and practical field execution, RizoTech features a multi-tiered Role-Based Access Control (RBAC) architecture serving three distinct personas: Agricultural Experts & Instructors (course authoring, syllabus structuring, lecture uploads, pricing controls, and student progress tracking), Learners & Agronomists (curriculum discovery, seamless course enrollment, video playback, and localized payment processing via Vodafone Cash and mobile wallets, with an adaptable gateway architecture ready for automated merchant integrations), and Super Administrators (full platform governance, instructor credential vetting, course review workflows, and platform analytics). Built with Next.js App Router, TypeScript, and Tailwind CSS, powered by TanStack React Query for responsive server-state caching, Zustand for lean client state management, and Framer Motion for polished interactive transitions.",
  descriptionAr: "منصة تعليمية متخصصة ورائدة (EdTech) في مجال العلوم والتقنيات الزراعية الحديثة وسوق العمل الزراعي. صُممت المنصة لسد الفجوة بين المعرفة الأكاديمية والتطبيق الميداني العملي عبر بنية برمجية متطورة متعددة الأدوار (Role-Based Access Control) تخدم 3 فئات رئيسية: الخبراء والمهندسون الزراعيون (استوديو متكامل لإعداد الكورسات، رفع المحاضرات، إدارة المناهج، تحديد الأسعار، ومتابعة تقدم المتدربين)، الطلاب والباحثون الزراعيون (استكشاف الدورات، الالتحاق السلس، والدفع الإلكتروني المباشر عبر فودافون كاش والمحافظ الرقمية مع بنية معمارية مهيأة للربط المستقبلي مع بوابات الدفع البنكية)، ولوحة تحكم مركزية للإدارة (Admin) للتحكم الكامل في المنصة، اعتماد الدورات، والتحقق من حسابات المدربين والتقارير المالية. تم بناء المشروع بأعلى معايير الأداء والسرعة باستخدام Next.js و TypeScript و Tailwind CSS، مع TanStack Query للمزامنة اللحظية والـ Caching، و Zustand لإدارة الحالة العامة، و Framer Motion لتقديم تجربة مستخدم تفاعلية وجذابة.",
  videoUrl: "/rizotech.mp4",
  coverImage: "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/rizotech-cover.jpg",
  images: [
    "https://dibrssekkpsbyhvwwzln.supabase.co/storage/v1/object/public/portfolio-media/rizotech-cover.jpg"
  ],
  liveUrl: "https://www.rizotech.online/",
  githubUrl: null,
  githubPrivate: true,
  company: "RizoTech",
  status: "production",
  tags: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "TanStack Query",
    "Zustand",
    "Framer Motion",
    "EdTech Platform",
    "Vodafone Cash",
    "RBAC Multi-Role",
    "Responsive UI"
  ],
  featured: true,
  order: 1,
  isHidden: false,
  featuresEn: [
    "Multi-Role Architecture (RBAC): Dedicated dashboards and permissions tailored for Agricultural Experts, Students, and Super Administrators",
    "Comprehensive Course Studio: Instructor portal for syllabus structuring, video lecture management, curriculum resources, and pricing controls",
    "Localized Mobile Wallet Payments: Integrated checkout workflow supporting Vodafone Cash with architectural readiness for multi-gateway expansion",
    "Server-State Synchronization: Engineered with TanStack React Query for intelligent caching, background refetching, and instant optimistic updates",
    "Global Client State with Zustand: Lightweight, reactive state management orchestrating user authentication, shopping carts, and enrollment stages",
    "Production-Grade UI/UX: Polished design system built with Tailwind CSS and fluid micro-interactions powered by Framer Motion"
  ],
  featuresAr: [
    "هيكلية برمجية متعددة الأدوار (RBAC): بوابات وصلاحيات مخصصة لكل من الخبراء الزراعيين، المتدربين، وإدارة المنصة العليا",
    "استوديو تعليمي متكامل للمحاضرين: لوحة تحكم مخصصة لبناء المناهج، رفع الدروس، تنظيم الوحدات التعليمية وتحديد خطط الأسعار",
    "دفع إلكتروني محلي بالمحافظ الرقمية: تجربة شراء سهلة تدعم فودافون كاش مع بنية معمارية جاهزة للتوسع مع بوابات دفع إلكترونية متعددة",
    "مزامنة بيانات فائقة السرعة بـ TanStack Query: كاشينج ذكي للبيانات واستدعاء تلقائي في الخلفية مع استجابة فورية (Optimistic Updates)",
    "إدارة حالة عامة رشيقة عبر Zustand: متجر حالة خفيف لإدارة تسجيل الدخول، سلة المشتريات، وتدفق عمليات الالتحاق بالكورسات",
    "واجهات عصرية وتجربة مستخدم تفاعلية: تصميم متجاوب فائق الدقة بـ Tailwind CSS مع حركات وانتقالات انسيابية بـ Framer Motion"
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

async function main() {
  console.log("1. Updating local portfolio-data.json...");
  const dataPath = path.join(__dirname, '../portfolio-data.json');
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(fileContent);

  const existingIndex = data.projects.findIndex(p => p.id === rizoTechProject.id || p.slug === rizoTechProject.slug);
  if (existingIndex >= 0) {
    data.projects[existingIndex] = {
      ...data.projects[existingIndex],
      ...rizoTechProject,
      createdAt: data.projects[existingIndex].createdAt || rizoTechProject.createdAt,
      updatedAt: new Date().toISOString()
    };
    console.log("Updated existing project in local JSON.");
  } else {
    // Insert at front or according to order
    data.projects.unshift(rizoTechProject);
    console.log("Added new project to local JSON.");
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("portfolio-data.json successfully updated!");

  console.log("2. Upserting project directly to Supabase Database...");
  const { data: dbData, error: dbError } = await supabase.from('Project').upsert({
    id: rizoTechProject.id,
    slug: rizoTechProject.slug,
    titleEn: rizoTechProject.titleEn,
    titleAr: rizoTechProject.titleAr,
    descriptionEn: rizoTechProject.descriptionEn,
    descriptionAr: rizoTechProject.descriptionAr,
    videoUrl: rizoTechProject.videoUrl,
    coverImage: rizoTechProject.coverImage,
    images: rizoTechProject.images,
    liveUrl: rizoTechProject.liveUrl,
    githubUrl: rizoTechProject.githubUrl,
    githubPrivate: rizoTechProject.githubPrivate,
    status: rizoTechProject.status,
    tags: [
      ...rizoTechProject.tags,
      ...(rizoTechProject.company ? [`__company__:${rizoTechProject.company}`] : [])
    ],
    featured: rizoTechProject.featured,
    order: rizoTechProject.order,
    isHidden: rizoTechProject.isHidden,
    featuresEn: rizoTechProject.featuresEn,
    featuresAr: rizoTechProject.featuresAr,
    updatedAt: new Date().toISOString()
  }).select();

  if (dbError) {
    console.error("Supabase upsert error:", dbError);
  } else {
    console.log("Successfully upserted to Supabase Project table!", dbData);
  }

  console.log("3. Verifying all projects from Supabase Database...");
  const { data: allProjects, error: verifyError } = await supabase.from('Project').select('id, slug, titleEn, liveUrl, order, coverImage').order('order', { ascending: true });
  if (verifyError) {
    console.error("Verification error:", verifyError);
  } else {
    console.log("Current projects in DB:", allProjects);
  }
}

main().catch(console.error);
