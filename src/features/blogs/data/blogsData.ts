import { BlogPost } from "../types";

export const blogsData: BlogPost[] = [
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
