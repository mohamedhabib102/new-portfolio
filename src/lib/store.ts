import fs from "fs";
import path from "path";
import { supabase } from "./supabase";
import { initialProjects } from "@/app/api/projects/route";
import { blogsData } from "@/features/blogs/data/blogsData";

const DATA_FILE = path.join(process.cwd(), "portfolio-data.json");

export interface SiteConfigData {
  heroTitleEn: string;
  heroTitleAr: string;
  heroQuoteEn: string;
  heroQuoteAr: string;
  heroImage: string;
  aboutBioEn: string;
  aboutBioAr: string;
  githubUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
  footerHeadlineEn: string;
  footerHeadlineAr: string;
  footerSubEn: string;
  footerSubAr: string;
}

export interface ExperienceData {
  id: string;
  period: string;
  roleEn: string;
  roleAr: string;
  company: string;
  descEn: string;
  descAr: string;
  skills: string[];
}

export interface SkillItemData {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icons: string[]; // List of icon identifiers (e.g., 'SiHtml5', 'SiReact', 'SiTailwindcss')
  badges: string[];
  order?: number;
}

export interface ClientMessageData {
  id: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string;
}

const defaultExperiences: ExperienceData[] = [
  {
    id: "exp-1",
    period: "2024 - Present",
    roleEn: "Frontend Engineer",
    roleAr: "مهندس واجهات أمامية",
    company: "serv5",
    descEn:
      "Leading UI development for highly interactive web projects to boost user engagement and retention. Designing advanced custom scroll animations and micro-interactions with GSAP, while optimizing site performance to achieve a 95+ score on Google Lighthouse across core pages.",
    descAr:
      "قيادة تطوير واجهات المستخدم للمشاريع التفاعلية المتقدمة لتعزيز تجربة المستخدم ومعدل التفاعل. تصميم وتطوير حركات سكرول تفاعلية مخصصة باستخدام GSAP و Framer Motion، مع تحسين أداء المواقع لتحقيق معدل 95+ على Google Lighthouse في جميع الصفحات الرئيسية.",
    skills: ["Next.js", "React", "GSAP", "TypeScript", "Tailwind CSS", "Performance Optimization"],
  },
  {
    id: "exp-2",
    period: "2024 - Present",
    roleEn: "Freelance Frontend Developer",
    roleAr: "مطور واجهات أمامية مستقل",
    company: "Independent / Saudi Clients",
    descEn:
      "Developing bespoke web systems for Saudi clients, directly aligning tech stacks with business requirements. Managing full project lifecycles from requirement gathering and UI coding to cloud hosting and maintenance, ensuring fully responsive, high-performance designs.",
    descAr:
      "تطوير أنظمة ويب وحلول رقمية مخصصة لعملاء في المملكة العربية السعودية، مع مواءمة التقنيات المستخدمة مع متطلبات الأعمال. إدارة دورة حياة المشاريع بالكامل بدءاً من تحليل المتطلبات وتكويد الواجهات وحتى الاستضافة السحابية والصيانة، وضمان تصميمات متجاوبة وعالية الأداء.",
    skills: ["Next.js", "Tailwind CSS", "Supabase", "Prisma", "Client Collaboration"],
  },
];

const defaultSkills: SkillItemData[] = [
  {
    id: "frontend-core",
    titleEn: "Front-End Core & Frameworks",
    titleAr: "تطوير واجهات المستخدم وأطر العمل",
    descEn: "Building fast, reactive, and user-friendly web interfaces using Next.js 16, React 19, TypeScript, and modern standards.",
    descAr: "بناء واجهات ويب تفاعلية وسريعة وفائقة الاستجابة بالاعتماد على Next.js 16 و React 19 و TypeScript ومعايير الويب العالمية.",
    icons: ["SiHtml5", "SiCss", "SiJavascript", "SiTypescript", "SiReact", "SiNextdotjs"],
    badges: ["Next.js 16", "React 19", "TypeScript", "ES6+"],
    order: 1,
  },
  {
    id: "styling",
    titleEn: "Styling, UI Frameworks & Elegant UI",
    titleAr: "التنسيق وأنظمة التصميم والواجهات الأنيقة",
    descEn:
      "Crafting responsive, pixel-perfect, and elegant UIs with Tailwind CSS, Bootstrap, modern CSS standards, and customized design systems.",
    descAr:
      "صياغة واجهات مستخدم متجاوبة وأنيقة (Elegant UI) وفائقة الدقة باستخدام Tailwind CSS و Bootstrap وتصميمات Responsive Design وأنظمة التصميم الحديثة.",
    icons: ["SiTailwindcss", "SiBootstrap", "SiCss", "SiSass", "SiMui"],
    badges: ["Tailwind CSS", "Bootstrap", "Responsive Design", "Elegant UI", "Mobile-First", "Dark Mode", "Custom Themes"],
    order: 2,
  },
  {
    id: "animations",
    titleEn: "Web Animations & Interactions",
    titleAr: "التحريك وتفاعلات الويب المتقدمة",
    descEn: "Creating 60FPS fluid animations, scroll-driven choreographies, and magnetic micro-interactions that elevate brand feel.",
    descAr: "صناعة حركات انتقالية وتفاعلات حركية فائقة السلاسة بمعدل 60 إطار مع مؤثرات سكرول تجذب المستخدم وترفع قيمة البراند.",
    icons: ["SiGreensock", "SiFramer"],
    badges: ["ScrollTrigger", "Micro-Interactions", "Spring Physics", "Page Transitions"],
    order: 3,
  },
  {
    id: "ai-tools",
    titleEn: "AI Development Tools & Intelligent Workflows",
    titleAr: "أدوات التطوير بالذكاء الاصطناعي والإنتاجية",
    descEn:
      "Leveraging next-generation AI coding assistants including Claude (Claude Code), Google Stitch / Jules, and Gemini Pro alongside Cursor to build, refactor, and review code with superhuman velocity.",
    descAr:
      "تسخير أحدث وأقوى نماذج وأدوات الذكاء الاصطناعي مثل كلود (Claude & Claude Code)، جوجل ستيشت / جولز (Google Stitch / Jules)، وجيميني برو (Gemini Pro) بالإضافة إلى Cursor AI لتسريع بناء الواجهات وإعادة الهيكلة ومراجعة الجودة.",
    icons: ["SiClaude", "SiGooglegemini", "SiGooglejules", "SiCursor", "SiGithubcopilot", "SiAnthropic"],
    badges: ["Claude 3.7 / Sonnet", "Gemini Pro", "Google Stitch", "Google Jules", "Cursor AI", "Prompt Engineering", "Context-Aware Dev", "Smart Refactoring"],
    order: 4,
  },
  {
    id: "dev-tools",
    titleEn: "Development Tools & Version Control",
    titleAr: "أدوات التطوير وإدارة الإصدارات",
    descEn:
      "Mastering modern developer tooling including Git version control, GitHub workflows, Vite, Webpack bundlers, and npm package ecosystem.",
    descAr:
      "إتقان أدوات بيئة التطوير الاحترافية والتحكم في الإصدارات باستخدام Git و GitHub، وحزم البناء السريعة Vite و Webpack وإدارة الحزم عبر npm.",
    icons: ["SiGit", "SiGithub", "SiVite", "SiWebpack", "SiNpm", "VscCode", "SiGooglechrome", "SiPostman"],
    badges: ["Git", "GitHub", "Vite", "Webpack", "npm", "VS Code", "DevTools", "Git Workflow"],
    order: 5,
  },
  {
    id: "state-management",
    titleEn: "State Management & Data Fetching",
    titleAr: "إدارة الحالة وجلب البيانات",
    descEn: "Architecting predictable client/server state with modern cache invalidation, optimistic updates, and clean hooks.",
    descAr: "بناء معمارية بيانات مستقرة وسريعة مع تحديثات متفائلة وتخزين مؤقت ذكي واستعلامات غير متزامنة.",
    icons: ["SiRedux", "SiReactquery"],
    badges: ["Zustand", "Context API", "Axios", "Optimistic UI", "SWR"],
    order: 6,
  },
  {
    id: "build-performance",
    titleEn: "Performance Optimization & Modern Rendering",
    titleAr: "تحسين الأداء ومعمارية الرندرة الحديثة",
    descEn:
      "Accelerating web experiences with Lazy Loading, API Caching, Server-Side Rendering (SSR), Static Site Generation (SSG), and sub-second Core Web Vitals.",
    descAr:
      "تحسين سرعة التصفح وتجربة المستخدم عبر التحميل الكسول (Lazy Loading)، التخزين المؤقت للبيانات (API Caching)، والمعالجة عبر الخادم (SSR) والتوليد الثابت (SSG) لتحقيق أعلى تقييم على Google Lighthouse.",
    icons: ["SiLighthouse", "SiNextdotjs", "SiVite", "SiWebpack", "SiVercel"],
    badges: ["Lazy Loading", "API Caching", "Server-Side Rendering (SSR)", "Static Site Generation (SSG)", "Core Web Vitals", "95+ Lighthouse", "Code Splitting"],
    order: 7,
  },
  {
    id: "testing",
    titleEn: "Testing & Code Quality",
    titleAr: "الاختبارات وضمان جودة الكود",
    descEn: "Writing comprehensive unit, integration, and linting rules to maintain a bug-free, scalable codebase.",
    descAr: "كتابة اختبارات شاملة وقواعد تدقيق قياسية للحفاظ على استقرار الكود البرمجي وسهولة صيانته.",
    icons: ["SiJest", "SiTestinglibrary", "SiEslint", "SiPrettier"],
    badges: ["Unit Testing", "Code Quality", "CI/CD Tests"],
    order: 8,
  },
  {
    id: "uiux-design",
    titleEn: "UI/UX & Design Collaboration",
    titleAr: "تصميم الواجهات وتجربة المستخدم",
    descEn: "Translating complex Figma mockups into accessible, pixel-perfect digital experiences with high visual polish.",
    descAr: "تحويل تصميمات فيجما المعقدة إلى واجهات برمجية حية تطابق التصميم بالبكسل مع مراعاة أدق التفاصيل الجمالية.",
    icons: ["SiFigma"],
    badges: ["Prototyping", "Wireframing", "Design Handoff", "Atomic Design"],
    order: 9,
  },
  {
    id: "mobile-crossplatform",
    titleEn: "Mobile Web & Cross-Platform",
    titleAr: "تطبيقات الهواتف والويب المتجاوب",
    descEn: "Creating sleek cross-platform web and mobile experiences with touch gestures and adaptive viewports.",
    descAr: "تطوير تطبيقات ويب وهواتف ذكية متوافقة مع شاشات اللمس والمنصات المختلفة بأعلى درجات الانسيابية.",
    icons: ["TbBrandReactNative"],
    badges: ["Progressive Web Apps (PWA)", "Touch Gestures", "Adaptive Layouts"],
    order: 10,
  },
  {
    id: "deployment-hosting",
    titleEn: "Deployment & Modern Hosting",
    titleAr: "النشر والاستضافة السحابية",
    descEn: "Deploying high-availability frontend applications using Vercel, edge serverless functions, and CI/CD automation.",
    descAr: "نشر تطبيقات الويب بسرعة فائقة عبر Vercel والشبكات الطرفية Edge مع أتمتة دورة البناء والنشر المستمر.",
    icons: ["SiVercel", "SiGithub"],
    badges: ["CI/CD", "Serverless Edge", "DNS & SSL", "Environment Management"],
    order: 11,
  },
  {
    id: "frontend-concepts",
    titleEn: "Core Frontend Concepts",
    titleAr: "المفاهيم البرمجية الأساسية للواجهات",
    descEn: "Strong command of DOM mechanics, event loop, asynchronous JavaScript, Web Accessibility (a11y), and semantic HTML.",
    descAr: "فهم عميق لآليات شجرة الـ DOM، دورة الأحداث البرمجية، إمكانية الوصول لذوي الاحتياجات الخاصة (a11y) والـ SEO المتقدم.",
    icons: ["SiHtml5", "SiTypescript"],
    badges: ["Accessibility (a11y)", "Technical SEO", "Event Loop", "DOM Tree Optimization"],
    order: 12,
  },
];

const defaultSiteConfig: SiteConfigData = {
  heroTitleEn: "Creative Developer &",
  heroTitleAr: "مطور",
  heroQuoteEn: "I'm trying to make something. Not just for you. Maybe not even for me.",
  heroQuoteAr: "أحاول أن أصنع شيئاً. ليس فقط من أجلك. وربما ليس حتى من أجلي.",
  heroImage: "/me.png",
  aboutBioEn:
    "I'm a 23-year-old Front-End Developer from Egypt focused on building modern, fast, and responsive web applications. I enjoy turning ideas and designs into smooth, interactive user experiences with attention to detail and performance.\n\nOver the past few years, I've worked on personal and freelance projects, mainly using React, Next.js, and TypeScript. I focus on writing clean, maintainable code and building well-structured interfaces.\n\nOutside of coding, I work on side projects and explore new ideas that help me grow as a developer. I'm always open to collaborating and contributing to products that create real value.",
  aboutBioAr:
    "أنا مطور واجهات أمامية مصري أبلغ من العمر 23 عاماً، أركز على بناء تطبيقات ويب حديثة، سريعة ومتجاوبة. أستمتع بتحويل الأفكار والتصميمات إلى تجارب مستخدم تفاعلية وسلسة مع الاهتمام بأدق التفاصيل والأداء العالي.\n\nعلى مدار السنوات الماضية، عملت على مشاريع شخصية ومشاريع عمل حر، معتمداً بشكل أساسي على React و Next.js و TypeScript. أركز على كتابة كود نظيف وسهل الصيانة، وبناء واجهات ذات بنية محكمة.\n\nخارج أوقات البرمجة، أعمل على مشاريع جانبية وأستكشف أفكاراً جديدة تساعدني على التطور المستمر كمطور. أنا دائماً منفتح على التعاون والمساهمة في بناء منتجات تقدم قيمة حقيقية للمستخدمين.",
  githubUrl: "https://github.com/mohamedhabib102",
  linkedinUrl: "https://www.linkedin.com/in/habib-mowafy",
  whatsappNumber: "201027227796",
  footerHeadlineEn: "Let's build something great together",
  footerHeadlineAr: "دعنا نصنع شيئاً عظيماً معاً",
  footerSubEn: "Have an ambitious idea or project in mind? Let's turn your vision into an impactful digital reality.",
  footerSubAr: "هل لديك فكرة أو مشروع طموح؟ دعنا نحول الرؤية إلى واقع رقمي مبهر.",
};

interface LocalStoreData {
  siteConfig: SiteConfigData;
  experiences: ExperienceData[];
  projects: typeof initialProjects;
  blogs: typeof blogsData;
  skills: SkillItemData[];
  messages: ClientMessageData[];
}

function readLocalStore(): LocalStoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        siteConfig: { ...defaultSiteConfig, ...(parsed.siteConfig || {}) },
        experiences: Array.isArray(parsed.experiences) ? parsed.experiences : defaultExperiences,
        projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : initialProjects,
        blogs: Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : blogsData,
        skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : defaultSkills,
        messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      };
    }
  } catch (e) {
    console.warn("Could not read portfolio-data.json, returning defaults", e);
  }

  const initial: LocalStoreData = {
    siteConfig: defaultSiteConfig,
    experiences: defaultExperiences,
    projects: initialProjects,
    blogs: blogsData,
    skills: defaultSkills,
    messages: [
      {
        id: "msg-welcome",
        name: "Client Inquirer",
        email: "client@example.com",
        phone: "+201000000000",
        message: "Hi Mohamed, I loved your portfolio and would like to discuss an upcoming React project with you!",
        createdAt: new Date().toISOString(),
      },
    ],
  };

  writeLocalStore(initial);
  return initial;
}

function writeLocalStore(data: LocalStoreData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write portfolio-data.json", e);
  }
}

export const portfolioStore = {
  // 1. Site Config
  getSiteConfig: async (): Promise<SiteConfigData> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("SiteConfig").select("*").eq("id", "default").maybeSingle();
        if (!error && data) {
          const config: SiteConfigData = {
            heroTitleEn: data.heroTitleEn || defaultSiteConfig.heroTitleEn,
            heroTitleAr: data.heroTitleAr || defaultSiteConfig.heroTitleAr,
            heroQuoteEn: data.heroQuoteEn || defaultSiteConfig.heroQuoteEn,
            heroQuoteAr: data.heroQuoteAr || defaultSiteConfig.heroQuoteAr,
            heroImage: data.heroImage || defaultSiteConfig.heroImage,
            aboutBioEn: data.aboutBioEn || defaultSiteConfig.aboutBioEn,
            aboutBioAr: data.aboutBioAr || defaultSiteConfig.aboutBioAr,
            githubUrl: data.githubUrl || defaultSiteConfig.githubUrl,
            linkedinUrl: data.linkedinUrl || defaultSiteConfig.linkedinUrl,
            whatsappNumber: data.whatsappNumber || defaultSiteConfig.whatsappNumber,
            footerHeadlineEn: data.footerHeadlineEn || defaultSiteConfig.footerHeadlineEn,
            footerHeadlineAr: data.footerHeadlineAr || defaultSiteConfig.footerHeadlineAr,
            footerSubEn: data.footerSubEn || defaultSiteConfig.footerSubEn,
            footerSubAr: data.footerSubAr || defaultSiteConfig.footerSubAr,
          };
          const store = readLocalStore();
          store.siteConfig = config;
          writeLocalStore(store);
          return config;
        }
      } catch (err) {
        console.warn("[Supabase] getSiteConfig fallback to local:", err);
      }
    }
    return readLocalStore().siteConfig;
  },

  updateSiteConfig: async (updates: Partial<SiteConfigData>): Promise<SiteConfigData> => {
    const store = readLocalStore();
    store.siteConfig = { ...store.siteConfig, ...updates };
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("SiteConfig").upsert({
          id: "default",
          ...store.siteConfig,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("[Supabase] updateSiteConfig error:", err);
      }
    }
    return store.siteConfig;
  },

  // 2. Experiences
  getExperiences: async (): Promise<ExperienceData[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("Experience").select("*").order("createdAt", { ascending: false });
        if (!error && Array.isArray(data)) {
          const formatted: ExperienceData[] = data.map((d) => ({
            id: d.id,
            period: d.period,
            roleEn: d.roleEn,
            roleAr: d.roleAr,
            company: d.company,
            descEn: d.descEn,
            descAr: d.descAr,
            skills: Array.isArray(d.skills) ? d.skills : [],
          }));
          const store = readLocalStore();
          store.experiences = formatted;
          writeLocalStore(store);
          return formatted;
        }
      } catch (err) {
        console.warn("[Supabase] getExperiences fallback:", err);
      }
    }
    return readLocalStore().experiences;
  },

  saveExperience: async (expData: any): Promise<ExperienceData> => {
    const store = readLocalStore();
    const id = expData.id || `exp-${Date.now()}`;
    const skills = Array.isArray(expData.skills)
      ? expData.skills
      : (expData.skills || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const fullExp: ExperienceData = {
      ...expData,
      id,
      skills,
    };

    const existingIdx = store.experiences.findIndex((e) => e.id === id);
    if (existingIdx >= 0) {
      store.experiences[existingIdx] = fullExp;
    } else {
      store.experiences.push(fullExp);
    }
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Experience").upsert({
          id: fullExp.id,
          period: fullExp.period,
          roleEn: fullExp.roleEn,
          roleAr: fullExp.roleAr,
          company: fullExp.company,
          descEn: fullExp.descEn,
          descAr: fullExp.descAr,
          skills: fullExp.skills,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("[Supabase] saveExperience error:", err);
      }
    }

    return fullExp;
  },

  deleteExperience: async (id: string): Promise<boolean> => {
    const store = readLocalStore();
    store.experiences = store.experiences.filter((e) => e.id !== id);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Experience").delete().eq("id", id);
      } catch (err) {
        console.warn("[Supabase] deleteExperience error:", err);
      }
    }
    return true;
  },

  // 3. Projects
  getProjects: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("Project").select("*").order("order", { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          const store = readLocalStore();
          // Merge Supabase projects with any local-only metadata (like githubPrivate or features)
          const merged = data.map((d: any) => {
            const local = store.projects.find((p: any) => p.id === d.id || p.slug === d.slug);
            return {
              ...d,
              githubPrivate: d.githubPrivate ?? local?.githubPrivate ?? false,
              featuresEn: d.featuresEn || local?.featuresEn,
              featuresAr: d.featuresAr || local?.featuresAr,
            };
          });

          // Also include any local projects that are not yet in Supabase
          const nonSupabase = store.projects.filter(
            (lp: any) => !data.some((sp: any) => sp.id === lp.id || sp.slug === lp.slug)
          );
          const fullList = [...merged, ...nonSupabase].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

          store.projects = fullList as any;
          writeLocalStore(store);
          return fullList as any;
        }
      } catch (err) {
        console.warn("[Supabase] getProjects fallback:", err);
      }
    }
    return readLocalStore().projects;
  },

  saveProject: async (projectData: any) => {
    const store = readLocalStore();
    const id = projectData.id || `proj-${Date.now()}`;
    const slug = projectData.slug || (projectData.titleEn ? projectData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `project-${Date.now()}`);

    const fullProject = {
      ...projectData,
      id,
      slug,
      githubPrivate: Boolean(projectData.githubPrivate),
      tags: Array.isArray(projectData.tags) ? projectData.tags : (projectData.tags || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      featured: projectData.featured ?? true,
      order: projectData.order ?? 0,
    };

    const existingIdx = store.projects.findIndex((p) => p.id === id || p.slug === slug);
    if (existingIdx >= 0) {
      store.projects[existingIdx] = fullProject;
    } else {
      store.projects.push(fullProject);
    }
    writeLocalStore(store);

    if (supabase) {
      try {
        const payload: any = {
          id: fullProject.id,
          slug: fullProject.slug,
          titleEn: fullProject.titleEn,
          titleAr: fullProject.titleAr,
          descriptionEn: fullProject.descriptionEn,
          descriptionAr: fullProject.descriptionAr,
          videoUrl: fullProject.videoUrl || "",
          liveUrl: fullProject.liveUrl || null,
          githubUrl: fullProject.githubUrl || null,
          tags: fullProject.tags,
          featured: fullProject.featured,
          order: fullProject.order,
          updatedAt: new Date().toISOString(),
        };

        const { error: upsertErr } = await supabase.from("Project").upsert({
          ...payload,
          githubPrivate: fullProject.githubPrivate,
        });

        if (upsertErr) {
          // If githubPrivate column is not in schema cache, fallback to base payload
          await supabase.from("Project").upsert(payload);
        }
      } catch (err) {
        console.warn("[Supabase] saveProject error:", err);
      }
    }

    return fullProject;
  },

  deleteProject: async (id: string) => {
    const store = readLocalStore();
    store.projects = store.projects.filter((p) => p.id !== id);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Project").delete().eq("id", id);
      } catch (err) {
        console.warn("[Supabase] deleteProject error:", err);
      }
    }
    return true;
  },

  // 4. Blogs
  getBlogs: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("Blog").select("*").order("createdAt", { ascending: false });
        if (!error && Array.isArray(data)) {
          const formatted = data.map((b) => ({
            ...b,
            author: {
              name: b.authorName || "Mohamed H. Mowafy",
              roleEn: b.authorRole || "Front-End Developer",
              roleAr: "مطور واجهات أمامية",
              avatar: "/me.png",
            },
          }));
          const defaultList = blogsData;
          const nonSupabase = defaultList.filter(
            (lb: any) => !formatted.some((sb: any) => sb.id === lb.id || sb.slug === lb.slug)
          );
          const fullList = [...formatted, ...nonSupabase];
          const store = readLocalStore();
          store.blogs = fullList as any;
          writeLocalStore(store);
          return fullList as any;
        }
      } catch (err) {
        console.warn("[Supabase] getBlogs fallback:", err);
      }
    }
    return readLocalStore().blogs;
  },

  saveBlog: async (blogData: any) => {
    const store = readLocalStore();
    const id = blogData.id || `blog-${Date.now()}`;
    const slug = blogData.slug || (blogData.titleEn ? blogData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `blog-${Date.now()}`);

    const fullBlog = {
      ...blogData,
      id,
      slug,
      author: {
        name: "Mohamed H. Mowafy",
        roleEn: "Front-End Developer",
        roleAr: "مطور واجهات أمامية",
        avatar: "/me.png",
      },
      tags: Array.isArray(blogData.tags) ? blogData.tags : (blogData.tags || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      publishedAt: blogData.publishedAt || new Date().toISOString().slice(0, 7),
      contentEn: blogData.contentEn || {
        intro: blogData.introEn || blogData.excerptEn || "",
        sections: blogData.sectionsEn || [],
        conclusion: blogData.conclusionEn || "",
      },
      contentAr: blogData.contentAr || {
        intro: blogData.introAr || blogData.excerptAr || "",
        sections: blogData.sectionsAr || [],
        conclusion: blogData.conclusionAr || "",
      },
    };

    const existingIdx = store.blogs.findIndex((b) => b.id === id);
    if (existingIdx >= 0) {
      store.blogs[existingIdx] = fullBlog;
    } else {
      store.blogs.unshift(fullBlog);
    }
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Blog").upsert({
          id: fullBlog.id,
          slug: fullBlog.slug,
          titleEn: fullBlog.titleEn,
          titleAr: fullBlog.titleAr,
          excerptEn: fullBlog.excerptEn,
          excerptAr: fullBlog.excerptAr,
          contentEn: fullBlog.contentEn,
          contentAr: fullBlog.contentAr,
          coverImage: fullBlog.coverImage,
          categoryEn: fullBlog.categoryEn,
          categoryAr: fullBlog.categoryAr,
          tags: fullBlog.tags,
          authorName: "Mohamed H. Mowafy",
          authorRole: "Front-End Developer",
          readTimeEn: fullBlog.readTimeEn || "5 min read",
          readTimeAr: fullBlog.readTimeAr || "5 دقائق قراءة",
          publishedAt: fullBlog.publishedAt,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("[Supabase] saveBlog error:", err);
      }
    }

    return fullBlog;
  },

  deleteBlog: async (id: string) => {
    const store = readLocalStore();
    store.blogs = store.blogs.filter((b) => b.id !== id);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Blog").delete().eq("id", id);
      } catch (err) {
        console.warn("[Supabase] deleteBlog error:", err);
      }
    }
    return true;
  },

  // 5. Skills
  getSkills: async (): Promise<SkillItemData[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("Skill").select("*").order("order", { ascending: true });
        if (!error && Array.isArray(data)) {
          const formatted: SkillItemData[] = data.map((s) => ({
            id: s.id,
            titleEn: s.titleEn,
            titleAr: s.titleAr,
            descEn: s.descEn,
            descAr: s.descAr,
            icons: Array.isArray(s.icons) ? s.icons : [],
            badges: Array.isArray(s.badges) ? s.badges : [],
            order: s.order ?? 0,
          }));
          const store = readLocalStore();
          store.skills = formatted;
          writeLocalStore(store);
          return formatted;
        }
      } catch (err) {
        console.warn("[Supabase] getSkills fallback:", err);
      }
    }
    return readLocalStore().skills;
  },

  saveSkill: async (skillData: any): Promise<SkillItemData> => {
    const store = readLocalStore();
    const id = skillData.id || `skill-${Date.now()}`;
    const icons = Array.isArray(skillData.icons)
      ? skillData.icons
      : (skillData.icons || "").split(",").map((s: string) => s.trim()).filter(Boolean);
    const badges = Array.isArray(skillData.badges)
      ? skillData.badges
      : (skillData.badges || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    const fullSkill: SkillItemData = {
      id,
      titleEn: skillData.titleEn || "",
      titleAr: skillData.titleAr || "",
      descEn: skillData.descEn || "",
      descAr: skillData.descAr || "",
      icons,
      badges,
      order: skillData.order ?? store.skills.length + 1,
    };

    const existingIdx = store.skills.findIndex((s) => s.id === id);
    if (existingIdx >= 0) {
      store.skills[existingIdx] = fullSkill;
    } else {
      store.skills.push(fullSkill);
    }
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Skill").upsert({
          id: fullSkill.id,
          titleEn: fullSkill.titleEn,
          titleAr: fullSkill.titleAr,
          descEn: fullSkill.descEn,
          descAr: fullSkill.descAr,
          icons: fullSkill.icons,
          badges: fullSkill.badges,
          order: fullSkill.order,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("[Supabase] saveSkill error:", err);
      }
    }

    return fullSkill;
  },

  deleteSkill: async (id: string): Promise<boolean> => {
    const store = readLocalStore();
    store.skills = store.skills.filter((s) => s.id !== id);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Skill").delete().eq("id", id);
      } catch (err) {
        console.warn("[Supabase] deleteSkill error:", err);
      }
    }
    return true;
  },

  // 6. Contact Messages
  getMessages: async (): Promise<ClientMessageData[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("ContactMessage").select("*").order("createdAt", { ascending: false });
        if (!error && Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn("[Supabase] getMessages fallback:", err);
      }
    }
    return readLocalStore().messages;
  },

  addMessage: async (msg: { name?: string; email: string; phone?: string; message: string }): Promise<ClientMessageData> => {
    const store = readLocalStore();
    const newMsg: ClientMessageData = {
      id: `msg-${Date.now()}`,
      name: msg.name || null,
      email: msg.email,
      phone: msg.phone || null,
      message: msg.message,
      createdAt: new Date().toISOString(),
    };
    store.messages.unshift(newMsg);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("ContactMessage").insert({
          id: newMsg.id,
          name: newMsg.name,
          email: newMsg.email,
          phone: newMsg.phone,
          message: newMsg.message,
          createdAt: newMsg.createdAt,
        });
      } catch (err) {
        console.warn("[Supabase] addMessage error:", err);
      }
    }

    return newMsg;
  },

  deleteMessage: async (id: string): Promise<boolean> => {
    const store = readLocalStore();
    store.messages = store.messages.filter((m) => m.id !== id);
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("ContactMessage").delete().eq("id", id);
      } catch (err) {
        console.warn("[Supabase] deleteMessage error:", err);
      }
    }
    return true;
  },
};

