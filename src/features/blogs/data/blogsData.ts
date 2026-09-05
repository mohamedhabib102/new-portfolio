import { BlogPost } from "../types";

export const blogsData: BlogPost[] = [
  {
    id: "blog-rendering-techniques-csr-ssr-ssg-isr",
    slug: "nextjs-rendering-techniques-csr-ssr-ssg-isr",
    titleEn: "Next.js Rendering Strategies: Complete Guide to CSR, SSR, SSG & ISR",
    titleAr: "تقنيات تصيير الويب في React و Next.js: المقارنة الشاملة بين CSR و SSR و SSG و ISR",
    excerptEn: "A deep dive into Next.js & React rendering techniques (CSR, SSR, SSG, and ISR). Discover how each strategy works under the hood, its direct impact on Googlebot crawling and SEO, and real TypeScript code examples.",
    excerptAr: "دليل شامل ومفصل يشرح تقنيات تصيير الويب في React و Next.js مع مقارنة عملية بين CSR و SSR و SSG و ISR، وتأثير كل استراتيجية على عناكب بحث جوجل (SEO) والأداء مع الأكواد البرمجية.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    categoryEn: "Next.js & Architecture",
    categoryAr: "نكست جي إس ومعمارية الويب",
    tags: ["Next.js", "React", "CSR", "SSR", "SSG", "ISR", "SEO", "TypeScript", "Performance"],
    author: {
      name: "Mohamed H. Mowafy",
      roleEn: "Front-End Developer",
      roleAr: "مطور واجهات أمامية",
      avatar: "/me.png",
    },
    readTimeEn: "7 min read",
    readTimeAr: "7 دقائق قراءة",
    publishedAt: "2026-09",
    contentEn: {
      intro: "Hello, my friend! If you are building with Next.js or React.js, this post is specifically crafted for you. We will break down the essential rendering techniques that define modern web architecture: CSR, SSR, SSG, and ISR. You have probably heard of them, but together we will uncover how each mechanism works under the hood, how search engine crawlers interact with your pages, and how to choose the ideal strategy for your application.",
      sections: [
        {
          heading: "1. Client-Side Rendering (CSR): Mechanics & SEO Pitfalls",
          body: "In Client-Side Rendering, the user's browser is entirely responsible for generating HTML and executing UI logic. When a visitor requests your page, the server returns an almost bare HTML file with a root element (e.g., <div id='root'></div>) and a bundle of JavaScript. The browser downloads the scripts, compiles the code, fetches data, and injects elements into the DOM.\n\nDoes CSR deliver good SEO? Absolutely not. Search engine crawlers (like Googlebot) crawl the web to index page content. When a crawler hits a pure CSR application, it initially sees a blank white page because JavaScript has not yet executed. Consequently, the crawler cannot parse headings, semantic text, or internal links, resulting in poor ranking and indexing delays.\n\nIn Next.js 14 and above (App Router), components are Server Components by default. To opt into CSR, you declare the 'use client' directive at the very top of the file. You use this when dealing with React hooks (useState, useEffect), DOM events, and browser APIs.",
          codeSnippet: `"use client";
import { useEffect, useState } from "react";

interface Project {
  sectionID: number;
  name: string;
}

const ClientSide: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections");
      if (!res.ok) {
        console.warn("API returned an error:", res.status);
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">CSR Technique</h2>
      <p className="text-black/70 leading-6 text-lg mb-5">
        Client-Side Rendering: Data fetching and DOM rendering occur entirely inside the browser.
      </p>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSide;`,
        },
        {
          heading: "2. Server-Side Rendering (SSR): Full On-Demand HTML",
          body: "Server-Side Rendering flips the equation: the server assumes full responsibility for generating the complete HTML document on every single request. When a user or crawler visits the URL, the server executes backend logic, queries databases or REST APIs, constructs the ready HTML markup, and streams it back.\n\nThis guarantees stellar SEO. Search engine crawlers immediately index fully formed markup, semantic headings, and rich meta tags without waiting for client-side JavaScript execution.\n\nIn Next.js App Router, any Server Component fetching data with cache: 'no-store' triggers on-demand SSR on every incoming request.",
          codeSnippet: `// Server-Side Rendering (SSR) in Next.js Server Component
// Runs on every incoming request on the server (Dynamic On-Demand Rendering)

interface Project {
  sectionID: number;
  name: string;
}

const getProjectsSSR = async (): Promise<Project[]> => {
  const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
    cache: "no-store", // SSR: No caching, fetches fresh data on every request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch fresh data on server");
  }

  return res.json();
};

export default async function SSRBlog() {
  const projects = await getProjectsSSR();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-500 font-bold mb-2">SSR Technique</h2>
      <p className="text-neutral-700 mb-4">
        Pre-rendered HTML ready for instant crawlers with fresh real-time data.
      </p>
      <div className="bg-white p-4 rounded-lg space-y-3">
        {projects.map((item) => (
          <h3 key={item.sectionID} className="text-xl bg-[#EEE] p-2 rounded">
            {item.name}
          </h3>
        ))}
      </div>
    </div>
  );
}`,
        },
        {
          heading: "3. Static Site Generation (SSG): Maximum Speed at Build-Time",
          body: "Static Site Generation pre-renders all HTML pages ahead of time during the application build phase (next build). The resulting HTML and JSON files are cached statically and served worldwide via Global Edge Content Delivery Networks (CDNs).\n\nThe primary advantages are blazing fast load times (<100ms TTFB), 100/100 Core Web Vitals scores, and zero server CPU load under high traffic. However, the tradeoff is freshness: if content changes in your database, visitors will not see the updates until you trigger a completely new build and deployment of the entire project.\n\nIn Next.js, SSG is achieved using cache: 'force-cache' in fetch requests.",
          codeSnippet: `// Static Site Generation (SSG) in Next.js Server Component
// Pre-rendered once at build time and cached across Edge CDNs

interface Project {
  sectionID: number;
  name: string;
}

const getProjectsSSG = async (): Promise<Project[]> => {
  try {
    const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
      cache: "force-cache", // SSG: Cached permanently until next application build
    });

    if (!res.ok) {
      console.warn("API returned an error:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function SSGBlog() {
  const projects = await getProjectsSSG();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">SSG Technique</h2>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele: Project) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        },
        {
          heading: "4. Incremental Static Regeneration (ISR): The Best of Both Worlds",
          body: "This is where Next.js truly shines. Incremental Static Regeneration combines the blistering speed of SSG with the dynamism of SSR without requiring a full site rebuild.\n\nWith ISR, you define a revalidation interval in seconds. Next.js delivers the ultra-fast static cached page from the CDN. Once the revalidation timer elapses and a new request arrives, Next.js triggers a background regeneration of that specific page, invalidates the old cache, and serves the updated page to subsequent visitors seamlessly.\n\nHere is the complete comparison snippet highlighting SSG, ISR, and SSR cache controls in a Next.js Server Component:",
          codeSnippet: `// static site generation => ssg/ssr/isr techniques comparison
interface Project {
  sectionID: number;
  name: string;
}

const getProjects = async () => {
  try {
    const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
      // 1. SSG: Pre-rendered at build time
      // cache: "force-cache", 

      // 2. ISR: Background revalidation every 30 seconds without rebuilding entire site
      next: { revalidate: 30 }, 

      // 3. SSR: Fetched fresh on every single client request
      // cache: "no-store", 
    });

    if (!res.ok) {
      console.warn("API returned an error:", res.status);
      return []; // fallback data
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Blog: React.FC = async () => {
  const projects = await getProjects();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">ISR Technique</h2>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele: Project) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;`,
        },
      ],
      conclusion: "Summary: If you are building authenticated user dashboards or highly interactive widgets, CSR with Client Components is the natural choice. If you have real-time dynamic data that requires instant SEO indexing, use SSR. For marketing pages and documentation, SSG provides unmatched speed. And for high-traffic blogs, e-commerce stores, and catalogs, ISR provides the ultimate balance between performance and freshness.",
    },
    contentAr: {
      intro: "ازيك يا صديقي العزيز! لو أنت شغال بـ Next.js أو React.js فالبوست ده ليك خصيصاً. هنتكلم فيه عن أهم تقنيات التصيير (Rendering Techniques) اللي بتشكل معمارية تطبيقات الويب الحديثة: CSR و SSR و SSG و ISR. أكيد سمعت بيهم وعارفهم، ولكن في السطور دي هنشرحهم مع بعض خطوة بخطوة، ونفهم كواليس كل تقنية، إزاي عناكب جوجل ومحركات البحث بتتعامل معاها، ومتى تختار كل واحدة في مشروعك. يلا بينا نبدأ في أول technique!",
      sections: [
        {
          heading: "1. التصيير من جانب العميل: Client-Side Rendering (CSR)",
          body: "باختصار، التقنية دي أنت أكيد عارفها: المتصفح (Browser) هو المسؤول الأول والأخير عن عملية الـ Rendering. يعني بالبساطة كده كود الـ JavaScript هو اللي بيولد عناصر الـ HTML وبيشغل الموقع على جهاز المستخدم.\n\nطب هل الـ technique ده هيحقق الـ SEO المطلوب؟ لا طبعاً! وتعال نعرف ليه:\nفي محركات البحث عندك حاجة اسمها 'عناكب جوجل' (Googlebot / Web Crawlers) ودي اللي بتحقق مبدأ وفهرسة الـ SEO. ولما بتيجي العناكب دي تعمل Crawl للموقع بتاعك لو أنت شغال بالـ CSR البحت، بتستلم ملف HTML فاضي تقريباً (مجرد <div id='root'></div>)، فبتلاقي صفحة بيضاااااا! فمش هتعرف تفهرس أو تقرأ محتوى الموقع بتاعك، وبكده موقعك هيكون الـ SEO بتاعه ضعيف جداً.\n\nطب لو محتاج أشغل الـ technique ده في Next.js (سواء الإصدار 14 أو أحدث) هعمل إيه؟\nبص يا سيدي: في Next.js المكونات افتراضياً Server Components، وعشان تشغل الـ technique ده هتحط الـ Directive ده في بداية الصفحة 'use client'. وطبعاً استخداماته الأساسية بتكون مع الـ Hooks التفاعلية زي useEffect و useState وغيرهم للتعامل المباشر مع المتصفح والـ DOM كما في الكود التالي:",
          codeSnippet: `"use client";
import { useEffect, useState } from "react";

interface Project {
  sectionID: number;
  name: string;
}

const ClientSide: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections");
      if (!res.ok) {
        console.warn("API returned an error:", res.status);
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">CSR Technique</h2>
      <p className="text-black/70 leading-6 text-lg mb-5">
        Client-Side Rendering: يتم جلب البيانات وبناء عناصر الواجهة بالكامل داخل متصفح المستخدم.
      </p>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSide;`,
        },
        {
          heading: "2. التصيير من جانب الخادم: Server-Side Rendering (SSR)",
          body: "الـ technique ده بقى بيعمل العكس خالص وهو إن السيرفر هو المسؤول عن عملية الـ Rendering. يعني السيرفر بيعالج الكود وبيجلب البيانات من الـ API أو قاعدة البيانات وبيعمل Render للـ HTML ويبعتها للمتصفح جاهزة تماماً. المتصفح بيعرضها على طول وبكده الـ SEO بتاعك هيكون عالي جداااا لأن عناكب جوجل هتقدر تـ crawl الموقع بتاعك بسهولة لأن الـ HTML جاهز ومكتمل بدون أي انتظار لجافا سكريبت.\n\nطب لو محتاج أشغل الـ technique ده في Next.js هعمل إيه؟\nفي Next.js في الـ App Router أي Server Component يعتبر افتراضياً شغال على السيرفر. ولو بتعمل fetch لبيانات وعايزها تطلب في كل Request مباشرة من غير كاش بنحدد خيار الكاش cache: 'no-store' كالتالي:",
          codeSnippet: `// Server-Side Rendering (SSR) in Next.js Server Component
// يتم جلب البيانات في كل طلب يرسله المستخدم مباشرة من السيرفر بدون كاش

interface Project {
  sectionID: number;
  name: string;
}

const getProjectsSSR = async (): Promise<Project[]> => {
  const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
    cache: "no-store", // SSR: Runs on request in the case of SSR (No Store)
  });

  if (!res.ok) {
    throw new Error("فشل في جلب البيانات من الخادم");
  }

  return res.json();
};

export default async function SSRBlogPage() {
  const projects = await getProjectsSSR();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-500 font-bold mb-2">SSR Technique</h2>
      <p className="text-neutral-700 mb-4">
        HTML جاهز بالكامل من السيرفر - ممتاز لأرشفة عناكب جوجل ومثالي للبيانات المتغيرة لحظياً.
      </p>
      <div className="bg-white p-4 rounded-lg space-y-3">
        {projects.map((item) => (
          <h3 key={item.sectionID} className="text-xl bg-[#EEE] p-2 rounded">
            {item.name}
          </h3>
        ))}
      </div>
    </div>
  );
}`,
        },
        {
          heading: "3. التوليد الثابت للموقع: Static Site Generation (SSG)",
          body: "تالت تقنية معانا هي Static Site Generation (SSG). التقنية دي بقى بتعمل render لصفحات الـ HTML وقت الـ Build للمشروع! يعني الصفحات بتتولد مرة واحدة بس وتتخزن كملفات Static في السيرفر أو على شبكات الـ CDN العالمية.\n\nالميزة الجبارة هنا هي السرعة الخارقة والـ SEO الممتاز وتحقيق علامة 100% في Core Web Vitals لأن السيرفر بيبعت الملفات الجاهزة فوراً، لكن عيبها إن لو البيانات اتغيرت في الـ Database، الصفحة مش هتحدث غير لو عملت Build جديد للموقع بالكامل!\n\nوفي Next.js عشان نستخدم الـ SSG بنعمل fetch مع خيار الكاش force-cache كالتالي:",
          codeSnippet: `// Static Site Generation (SSG) in Next.js Server Component
// يتم توليد صفحات الـ HTML مسبقاً وقت الـ Build وتخزينها على الـ CDN

interface Project {
  sectionID: number;
  name: string;
}

const getProjectsSSG = async (): Promise<Project[]> => {
  try {
    const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
      cache: "force-cache", // SSG: Runs at build time and cached statically
    });

    if (!res.ok) {
      console.warn("API returned an error:", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function SSGBlogPage() {
  const projects = await getProjectsSSG();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">SSG Technique</h2>
      <p className="text-black/70 leading-6 text-lg mb-5">
        أسرع استجابة ممكنة مع كاش دائم للصفحات الجاهزة.
      </p>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele: Project) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        },
        {
          heading: "4. إعادة التوليد الثابت التدريجي: Incremental Static Regeneration (ISR)",
          body: "رابع تقنية معانا هي الـ Incremental Static Regeneration (ISR). وهنا يجي دور التقنية العبقرية دي اللي جمعت بين مميزات الـ SSG وسرعته الخارقة، وبين قدرة الـ SSR على تحديث البيانات!\n\nالـ ISR بتخليك تحدد وقت معين (بالثواني) للصفحة، فـ Next.js يولد الصفحة كـ Static وتفضل سريعة، وأول ما الوقت ده يعدي وحد يطلب الصفحة، بيتعمل لها Revalidation وإعادة بناء في الخلفية وتحديث للبيانات بدون ما تحتاج تعمل Build كامل للمشروع!\n\nوفي الكود المرفق بالأسفل، يظهر الكود المشترك الذي يوضح الفروقات بين خيارات الـ fetch الثلاثة (SSG و ISR و SSR):",
          codeSnippet: `// static site generation => ssg/ssr/isr techniques
interface Project {
  sectionID: number;
  name: string;
}

const getProjects = async () => {
  try {
    const res = await fetch("https://example.runasp.net/api/Donations/GetAllSections", {
      // 1. SSG: Runs at build-time (Static Site Generation)
      // cache: "force-cache", 

      // 2. ISR: Revalidates on request in the background every 30s
      next: { revalidate: 30 }, 

      // 3. SSR: Runs on every single request in the case of SSR
      // cache: "no-store", 
    });

    if (!res.ok) {
      console.warn("API returned an error:", res.status);
      return []; // fallback data
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Blog: React.FC = async () => {
  const projects = await getProjects();

  return (
    <div className="bg-[#EEE] p-4 rounded-lg">
      <h2 className="text-2xl text-blue-400 font-semibold mb-1">ISR Technique</h2>
      <div className="bg-white p-4 rounded-lg">
        {projects.map((ele: Project) => (
          <div key={ele.sectionID} className="mb-3">
            <h3 className="text-2xl text-right bg-[#EEE] p-2 rounded-sm">{ele.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;`,
        },
      ],
      conclusion: "خلاصة القول يا صديقي: إذا كانت الصفحة لوحة تحكم خاصة (Dashboard) أو تحتاج تفاعلات معقدة مع المتصفح، فـ CSR مع 'use client' هي الخيار الطبيعي. أما إذا كانت صفحة تتغير بياناتها في كل لحظة وتحتاج SEO قوي وفوري، فـ SSR هو الحل. وإذا كانت مقالات مدونة أو صفحات هبوط شبه ثابتة، فـ SSG هو الأسرع والأوفر في الموارد. ولتحقيق المعادلة الذهبية بين السرعة الخارقة وتحديث المحتوى، فإن ISR هو الاختيار الأذكى في Next.js.",
    },
  },
  {
    id: "blog-1",
    slug: "mastering-web-animations-gsap-framer-motion",
    titleEn: "Building 60FPS Fluid Web Animations with GSAP & Framer Motion",
    titleAr: "بناء أنيميشن وحركات ويب فائقة السلاسة بمعدل 60 إطار باستخدام GSAP و Framer Motion",
    excerptEn: "A deep dive into choreographing scroll-triggered animations, GPU acceleration, and micro-interactions that captivate users without sacrificing performance.",
    excerptAr: "دليل عملي متقدم لبرمجة حركات السكرول التفاعلية، تسريع العتاد عبر كارت الشاشة GPU، وصناعة تفاعلات حركية مبهرة تحافظ على سرعة الموقع القصوى.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    categoryEn: "Web Animations",
    categoryAr: "تحريك الويب",
    tags: ["GSAP", "Framer Motion", "WebGL", "UX Design"],
    author: {
      name: "Mohamed H. Mowafy",
      roleEn: "Front-End Developer",
      roleAr: "مطور واجهات أمامية",
      avatar: "/me.png",
    },
    readTimeEn: "5 min read",
    readTimeAr: "5 دقائق قراءة",
    publishedAt: "2026-03",
    contentEn: {
      intro: "Web animations are no longer just eye candy—when implemented with intentionality, they establish visual hierarchy, guide user attention, and elevate brand perception to an elite tier.",
      sections: [
        {
          heading: "1. The Anatomy of 60FPS: Transform & Opacity Only",
          body: "The golden rule of browser rendering is avoiding Layout recalculations and Paint cycles inside animation loops. Always animate GPU-composited CSS properties: transform (translate3d, scale, rotate) and opacity. Avoid animating top, left, width, or margin.",
          codeSnippet: `// High-performance Framer Motion config
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
/>`,
        },
        {
          heading: "2. Combining GSAP ScrollTrigger with Virtual Smooth Scrolling",
          body: "When using libraries like Lenis for momentum scrolling, synchronize your GSAP tickers with Lenis's requestAnimationFrame cycle. This guarantees zero frame jitter and fluid interpolation across high-refresh-rate displays.",
          codeSnippet: `lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});`,
        },
        {
          heading: "3. Magnetic Micro-Interactions",
          body: "Buttons that gently pull towards the mouse cursor make interfaces feel tactile and responsive. Using spring physics damping creates organic inertia that users instinctively appreciate.",
        },
      ],
      conclusion: "Great animations don't scream for attention—they whisper elegance and enhance every interaction with precision.",
    },
    contentAr: {
      intro: "لم تعد حركات الويب مجرد عناصر جمالية تزيينية، بل أصبحت لغة تفاعلية تؤسس التسلسل الهرمي للمعلومات، وتوجه انتباه المستخدمين، وتضفي على العلامة التجارية طابعاً استثنائياً وفخماً.",
      sections: [
        {
          heading: "1. سرعة 60 إطار في الثانية: الاعتماد فقط على Transform و Opacity",
          body: "القاعدة الذهبية في محركات تصفح الويب هي تجنب إعادة حساب المخطط (Layout Thrashing) ودورات الرسم (Repaints) أثناء تشغيل الأنيميشن. احرص دائماً على تحريك الخصائص التي يتعامل معها كارت الشاشة (GPU) مباشرة مثل transform و opacity وتجنب تماماً تحريك width أو margin.",
          codeSnippet: `// إعداد Framer Motion عالي الكفاءة
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
/>`,
        },
        {
          heading: "2. دمج GSAP ScrollTrigger مع السكرول الناعم",
          body: "عند استخدام مكتبات مثل Lenis للتحكم في سلاسة التمرير، يجب مزامنة ساعة GSAP مع حلقة requestAnimationFrame الخاصة بـ Lenis، مما يمنع أي تقطيع أو تداخل في الإطارات على الشاشات ذات التردد العالي (120Hz+).",
          codeSnippet: `lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});`,
        },
        {
          heading: "3. التفاعلات المغناطيسية للأزرار",
          body: "الأزرار التي تتحرك بنعومة وتنجذب نحو مؤشر الماوس عند الاقتراب منها تمنح المستخدم شعوراً بالحيوية واللمس الواقعي، مما يرفع معدل التفاعل والنقر بشكل ملحوظ.",
        },
      ],
      conclusion: "الحركات الاستثنائية لا تصرخ لجذب الانتباه، بل تهمس بالأناقة والدقة في كل تفصيل تفاعلي داخل الموقع.",
    },
  },
  {
    id: "blog-2",
    slug: "nextjs-app-router-performance-guide",
    titleEn: "Next.js App Router: Performance, SSR & Server Components",
    titleAr: "معمارية Next.js App Router: أسرار الأداء العالي ومكونات الخادم",
    excerptEn: "How to properly leverage React Server Components, streaming SSR, and edge caching to deliver instantaneous page transitions and sub-second load times.",
    excerptAr: "كيف تستفيد بالشكل الأمثل من مكونات الخادم React Server Components، التدفق الفوري للنصوص، والتخزين المؤقت لتحقيق تحميل فوري وسرعة تصفح فائقة.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    categoryEn: "Next.js",
    categoryAr: "نكست جي إس",
    tags: ["Next.js", "React 19", "Server Components", "Performance"],
    author: {
      name: "Mohamed H. Mowafy",
      roleEn: "Front-End Developer",
      roleAr: "مطور واجهات أمامية",
      avatar: "/me.png",
    },
    readTimeEn: "6 min read",
    readTimeAr: "6 دقائق قراءة",
    publishedAt: "2026-02",
    contentEn: {
      intro: "The transition from Pages router to App router revolutionized how we structure production React applications. Understanding when to render on the server vs. client is the key differentiator for top-tier frontend engineers.",
      sections: [
        {
          heading: "1. The Boundary Between Server and Client Components",
          body: "Keep interactive client components as leaves at the edge of your component tree. The vast majority of layouts, data-fetching components, and SEO wrappers should remain pure Server Components to minimize JavaScript bundle size sent to the client.",
          codeSnippet: `// Server Component by default: zero client JS overhead
export default async function ProjectsFeed() {
  const projects = await getProjects();
  return <ProjectsGrid items={projects} />;
}`,
        },
        {
          heading: "2. Streaming with Suspense",
          body: "Don't let slow database queries block the initial HTML response. Wrap data-heavy widgets in React Suspense boundaries to stream the shell immediately while async chunks load progressively.",
        },
        {
          heading: "3. Image Optimization with Next/Image",
          body: "Always define responsive sizes and modern formats (WebP/AVIF). Leveraging proper dimensions eliminates Cumulative Layout Shift (CLS) and preserves pristine Core Web Vitals.",
        },
      ],
      conclusion: "By designing with server-first principles, your web apps stay lightning-fast regardless of project complexity.",
    },
    contentAr: {
      intro: "مثل الانتقال إلى معمارية App Router في Next.js نقلة نوعية في هندسة تطبيقات React الحديثة. فهم الحدود الفاصلة بين المعالجة على الخادم والتفاعل في المتصفح هو الفارق الحقيقي بين المطور المحترف وغيره.",
      sections: [
        {
          heading: "1. الحدود الدقيقة بين Server و Client Components",
          body: "اجعل مكونات العميل (Client Components) تقتصر فقط على الأطراف التفاعلية (كالأزرار والنماذج). احتفظ بباقي الهيكل وجلب البيانات كـ Server Components لتقليص حجم حزمة كود الجافاسكريبت المرسلة للمستخدم إلى الصفر تقريباً.",
          codeSnippet: `// مكون خادم تلقائياً بدون أي حمولة جافاسكريبت إضافية
export default async function ProjectsFeed() {
  const projects = await getProjects();
  return <ProjectsGrid items={projects} />;
}`,
        },
        {
          heading: "2. تقنية البث المباشر التدريجي مع Suspense",
          body: "لا تجعل استعلامات قواعد البيانات تعطل إرسال هيكل الصفحة الأولي للمتصفح. استخدم React Suspense لبث الهيكل فوراً في أجزاء من الثانية بينما يتم استكمال جلب البيانات في الخلفية بسلاسة.",
        },
        {
          heading: "3. تحسين الصور ومنع تذبذب الواجهة",
          body: "تطبيق قواعد Next/Image مع تحديد الأحجام الصحيحة يمنع ظاهرة انزياح التصميم التراكمي (CLS) ويضمن اجتياز مؤشرات الأداء الحيوية لكبرى محركات البحث.",
        },
      ],
      conclusion: "التفكير بمنطق الخادم أولاً يضمن أن تظل تطبيقاتك فائقة السرعة والاستجابة مهما زاد حجم المشروع والبيانات.",
    },
  },
  {
    id: "blog-3",
    slug: "frontend-ai-tools-workflow-2026",
    titleEn: "Supercharging Frontend Workflows with AI: Cursor, Copilot & Modern Tools",
    titleAr: "مضاعفة إنتاجية مطور الواجهات باستخدام أدوات الذكاء الاصطناعي الحديثة",
    excerptEn: "Practical workflows and prompt engineering strategies using Cursor, Copilot, and LLMs to accelerate component scaffolding, testing, and debugging.",
    excerptAr: "استراتيجيات عملية لتسخير أدوات مثل Cursor AI و GitHub Copilot لكتابة واجهات معقدة، كتابة اختبارات شاملة، وحل المشكلات البرمجية في دقائق معدودة.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    categoryEn: "AI Tools",
    categoryAr: "أدوات الذكاء الاصطناعي",
    tags: ["Cursor", "Copilot", "Claude", "Productivity"],
    author: {
      name: "Mohamed H. Mowafy",
      roleEn: "Front-End Developer",
      roleAr: "مطور واجهات أمامية",
      avatar: "/me.png",
    },
    readTimeEn: "4 min read",
    readTimeAr: "4 دقائق قراءة",
    publishedAt: "2026-01",
    contentEn: {
      intro: "AI won't replace frontend engineers, but engineers leveraging AI effectively will replace those who don't. Here is how I integrate modern AI tools into daily production workflows.",
      sections: [
        {
          heading: "1. Context-Aware Code Generation with Cursor & Claude",
          body: "The superpower of Cursor is referencing relevant files (@file) and types directly in your queries. Instead of vague prompts, feed the exact TypeScript interfaces and design tokens to generate production-ready components instantly.",
        },
        {
          heading: "2. Rapid Prototyping & Edge Cases Detection",
          body: "Use AI to think through boundary conditions: empty states, network error recoveries, RTL layout flipping, and accessible aria-labels that are often overlooked during initial sprints.",
        },
        {
          heading: "3. Automated Test Suites Generation",
          body: "Generating unit tests with Jest and React Testing Library is one of the highest-ROI use cases. AI accurately maps props permutations and user interaction flows.",
        },
      ],
      conclusion: "Embracing AI as an intelligent copilot allows you to focus 90% of your mental energy on architecture, UX aesthetics, and business value.",
    },
    contentAr: {
      intro: "الذكاء الاصطناعي لن يحل محل مهندسي الواجهات المبدعين، ولكن المطورين الذين يتقنون توظيف أدوات الذكاء الاصطناعي سيتفوقون بفارق هائل على من يتجاهلونها.",
      sections: [
        {
          heading: "1. التوليد البرمجي الواعي بالسياق مع Cursor و Claude",
          body: "القوة الحقيقية في محرر مثل Cursor تكمن في قدرته على قراءة سياق المشروع بالكامل (@file) وواجهات TypeScript، مما يمكنك من توليد كود نظيف ومتوافق بنسبة 100% مع معايير مشروعك في ثوان.",
        },
        {
          heading: "2. اكتشاف الحالات الاستثنائية ودعم إمكانية الوصول",
          body: "يمكنك استخدام نماذج الذكاء الاصطناعي لمراجعة حالات الخطأ (Network Errors)، الشاشات الفارغة (Empty States)، وانعكاس النصوص في وضع اللغة العربية (RTL) دون إغفال أي تفصيلة.",
        },
        {
          heading: "3. كتابة اختبارات الجودة بشكل مؤتمت",
          body: "إنتاج اختبارات الوحدة باستخدام Jest و React Testing Library يعتبر من أفضل الاستخدامات التي توفر ساعات طويلة من العمل الروتيني وتضمن استقرار النظام.",
        },
      ],
      conclusion: "استخدام الذكاء الاصطناعي كمساعد ذكي يحرر طاقتك الذهنية للتركيز على المعمارية، جماليات التصميم، وتقديم قيمة حقيقية للمستخدم.",
    },
  },
  {
    id: "blog-4",
    slug: "achieving-95-google-lighthouse-score",
    titleEn: "Achieving a 95+ Google Lighthouse Score on Core Web Pages",
    titleAr: "كيفية تحقيق تقييم 95+ على Google Lighthouse وتحسين سرعة المواقع",
    excerptEn: "Actionable engineering techniques implemented to optimize Core Web Vitals (LCP, INP, CLS) and deliver blazing-fast web experiences.",
    excerptAr: "تقنيات هندسية عملية طبقتها لتحسين مؤشرات الأداء الحيوية والوصول لعلامة 95+ في سرعة وتجربة المستخدم.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    categoryEn: "Performance",
    categoryAr: "الأداء والسرعة",
    tags: ["Lighthouse", "Web Vitals", "Optimization", "SEO"],
    author: {
      name: "Mohamed H. Mowafy",
      roleEn: "Front-End Developer",
      roleAr: "مطور واجهات أمامية",
      avatar: "/me.png",
    },
    readTimeEn: "5 min read",
    readTimeAr: "5 دقائق قراءة",
    publishedAt: "2025-12",
    contentEn: {
      intro: "Every 100ms delay in website response time reduces conversion rates by up to 7%. Here is the exact performance playbook we used to maintain consistent 95+ scores on Google Lighthouse.",
      sections: [
        {
          heading: "1. Eliminating Largest Contentful Paint (LCP) Delays",
          body: "Preload your hero resources, utilize modern WebP/AVIF compression with strict quality settings (80%), and inline critical CSS to ensure the above-the-fold content paints under 1.2s.",
        },
        {
          heading: "2. Optimizing Interaction to Next Paint (INP)",
          body: "Break down long-running JavaScript execution tasks using scheduler.yield() or requestIdleCallback. Never block the main thread with heavy computation during user inputs.",
        },
        {
          heading: "3. Zero Cumulative Layout Shift (CLS)",
          body: "Always reserve explicit aspect-ratio boxes for images, video embeds, and dynamic widgets to prevent sudden jarring page shifts while resources stream in.",
        },
      ],
      conclusion: "Speed is a feature and a brand statement. Exceptional performance paired with beautiful aesthetics creates unforgettable user journeys.",
    },
    contentAr: {
      intro: "كل تأخير مقداره 100 ميلي ثانية في تحميل الموقع يكلف فقدان ما يصل إلى 7% من تفاعل العملاء. إليك الدليل الهندسي الذي طبقته للحفاظ على تقييم 95+ في مؤشرات Google Lighthouse العالمية.",
      sections: [
        {
          heading: "1. تسريع ظهور المحتوى الرئيسي (LCP)",
          body: "التحميل المسبق (Preload) لخطوط الهيرو وصوره الأساسية، استخدام صيغ حديثة مثل WebP مع ضغط ذكي بنسبة 80%، وتضمين الـ CSS الحرج يضمن رسم الصفحة الأولى للمستخدم في أقل من ثانية واحدة.",
        },
        {
          heading: "2. استجابة التفاعل الفورية (INP)",
          body: "تقسيم المهام البرمجية الثقيلة عبر requestIdleCallback أو خيوط معالجة فرعية، وتجنب تعطيل الـ Main Thread لضمان استجابة سريعة جداً لنقرات وتمرير المستخدم.",
        },
        {
          heading: "3. استقرار الواجهة ومنع التذبذب (CLS)",
          body: "تحديد نسب أبعاد صريحة (aspect-ratio) للصور ومقاطع الفيديو قبل تحميلها يمنع أي انزياح مفاجئ في موضع العناصر أثناء التصفح.",
        },
      ],
      conclusion: "السرعة الفائقة ليست تفصيلاً ثانوياً، بل هي ميزة أساسية ورسالة واضحة لجودة واحترافية علامتك التجارية.",
    },
  },
];
