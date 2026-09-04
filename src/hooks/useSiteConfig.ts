"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/axios";

export interface SiteConfig {
  heroTitleEn: string;
  heroTitleAr: string;
  heroQuoteEn: string;
  heroQuoteAr: string;
  heroImage: string;
  aboutBioEn: string;
  aboutBioAr: string;
  githubUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  footerHeadlineEn?: string;
  footerHeadlineAr?: string;
  footerSubEn?: string;
  footerSubAr?: string;
}

const defaultConfig: SiteConfig = {
  heroTitleEn: "Creative Developer &",
  heroTitleAr: "مطور",
  heroQuoteEn: "I'm trying to make something. Not just for you. Maybe not even for me.",
  heroQuoteAr: "أحاول أن أصنع شيئاً. ليس فقط من أجلك. وربما ليس حتى من أجلي.",
  heroImage: "/me.png",
  aboutBioEn:
    "I'm a 23-year-old Front-End Developer from Egypt focused on building modern, fast, and responsive web applications. I enjoy turning ideas and designs into smooth, interactive user experiences with attention to detail and performance.\n\nOver the past few years, I've worked on personal and freelance projects, mainly using React, Next.js, and TypeScript. I focus on writing clean, maintainable code and building well-structured interfaces.\n\nOutside of coding, I work on side projects and explore new ideas that help me grow as a developer. I'm always open to collaborating and contributing to products that create real value.",
  aboutBioAr:
    "أنا مطور واجهات أمامية مصري أبلغ من العمر 23 عاماً، أركز على بناء تطبيقات ويب حديثة، سريعة ومتجاوبة. أستمتع بتحويل الأفكار والتصميمات إلى تجارب مستخدم تفاعلية وسلسة مع الاهتمام بأدق التفاصيل والأداء العالي.\n\nعلى مدار السنوات الماضية، عملت على مشاريع شخصية ومشاريع عمل حر، معتمداً بشكل أساسي على React و Next.js و TypeScript. أركز على كتابة كود نظيف وسهل الصيانة، وبناء واجهات ذات بنية محكمة.\n\nخارج أوقات البرمجة، أعمل على مشاريع جانبية وأستكشف أفكاراً جديدة تساعدني على التطور المستمر كمطور. أنا دائماً منفتح على التعاون والمساهمة في بناء منتجات تقدم قيمة حقيقية للمستخدمين.",
  githubUrl: "https://github.com/mowafy-dev",
  linkedinUrl: "https://www.linkedin.com/in/habib-mowafy",
  whatsappNumber: "201027227796",
  footerHeadlineEn: "Let's build something great together",
  footerHeadlineAr: "دعنا نصنع شيئاً عظيماً معاً",
  footerSubEn: "Have an ambitious idea or project in mind? Let's turn your vision into an impactful digital reality.",
  footerSubAr: "هل لديك فكرة أو مشروع طموح؟ دعنا نحول الرؤية إلى واقع رقمي مبهر.",
};

export function useSiteConfig(initialData?: SiteConfig) {
  const [config, setConfig] = useState<SiteConfig>(initialData || defaultConfig);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  useEffect(() => {
    let isMounted = true;

    async function fetchConfig() {
      try {
        const res = await apiClient.get<{ success: boolean; data: SiteConfig }>("/api/site-config");
        if (isMounted && res.data?.data) {
          setConfig(res.data.data);
        }
      } catch (err) {
        console.warn("Could not fetch dynamic site config, using defaults:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  return { config, isLoading };
}
