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
  messages: ClientMessageData[];
}

function readLocalStore(): LocalStoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        siteConfig: { ...defaultSiteConfig, ...(parsed.siteConfig || {}) },
        experiences: parsed.experiences && parsed.experiences.length > 0 ? parsed.experiences : defaultExperiences,
        projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : initialProjects,
        blogs: parsed.blogs && parsed.blogs.length > 0 ? parsed.blogs : blogsData,
        messages: parsed.messages || [],
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
        if (!error && data && data.length > 0) {
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
        if (!error && data && data.length > 0) {
          const store = readLocalStore();
          store.projects = data as any;
          writeLocalStore(store);
          return data as any;
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
    const slug = projectData.slug || projectData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const fullProject = {
      ...projectData,
      id,
      slug,
      tags: Array.isArray(projectData.tags) ? projectData.tags : (projectData.tags || "").split(",").map((s: string) => s.trim()).filter(Boolean),
    };

    const existingIdx = store.projects.findIndex((p) => p.id === id);
    if (existingIdx >= 0) {
      store.projects[existingIdx] = fullProject;
    } else {
      store.projects.push(fullProject);
    }
    writeLocalStore(store);

    if (supabase) {
      try {
        await supabase.from("Project").upsert({
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
          featured: fullProject.featured ?? true,
          order: fullProject.order ?? 0,
          updatedAt: new Date().toISOString(),
        });
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
        if (!error && data && data.length > 0) {
          const formatted = data.map((b) => ({
            ...b,
            author: {
              name: b.authorName || "Mohamed H. Mowafy",
              roleEn: b.authorRole || "Front-End Developer",
              roleAr: "مطور واجهات أمامية",
              avatar: "/me.png",
            },
          }));
          const store = readLocalStore();
          store.blogs = formatted as any;
          writeLocalStore(store);
          return formatted as any;
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
    const slug = blogData.slug || blogData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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

  // 5. Contact Messages
  getMessages: async (): Promise<ClientMessageData[]> => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from("ContactMessage").select("*").order("createdAt", { ascending: false });
        if (!error && data && data.length > 0) {
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
};
