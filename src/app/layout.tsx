import type { Metadata } from "next";
import { Cairo, Alexandria } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { LoadingProvider } from "@/components/providers/LoadingContext";
import SmoothScroll from "@/components/providers/SmoothScroll";
import GlobalLoader from "@/components/ui/GlobalLoader";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["latin", "arabic"],
  variable: "--font-alexandria",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamedmowafy.dev"),
  title: {
    default: "Mohamed H. Mowafy | Senior Frontend Engineer & UI Specialist",
    template: "%s | Mohamed H. Mowafy",
  },
  description:
    "Senior Frontend Engineer specializing in Next.js 16, React 19, TypeScript, Vue.js, GSAP animations, Tailwind CSS, and Web Performance Optimization. Crafting fast, responsive, and pixel-perfect web experiences.",
  keywords: [
    "Mohamed H. Mowafy",
    "Mohamed Habib Mowafy",
    "Frontend Engineer",
    "Senior Frontend Developer",
    "مطور واجهات أمامية",
    "مهندس برمجيات",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Vue.js",
    "Tailwind CSS",
    "GSAP Animations",
    "Framer Motion",
    "Web Performance Optimization",
    "Core Web Vitals",
    "UI/UX Design",
    "Software Engineer Egypt",
  ],
  authors: [{ name: "Mohamed H. Mowafy", url: "https://github.com/mohamedhabib102" }],
  creator: "Mohamed H. Mowafy",
  publisher: "Mohamed H. Mowafy",
  icons: {
    icon: [{ url: "/avatar.png" }],
    apple: [{ url: "/avatar.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/avatar.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "https://mohamedmowafy.dev",
    siteName: "Mohamed H. Mowafy - Frontend Engineer Portfolio",
    title: "Mohamed H. Mowafy | Senior Frontend Engineer & UI Specialist",
    description:
      "Senior Frontend Engineer crafting high-performance, visually striking digital web experiences with Next.js, React, TypeScript, and modern standards.",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "Mohamed H. Mowafy - Frontend Engineer Logo & Avatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed H. Mowafy | Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer crafting high-performance, visually striking digital web experiences.",
    images: ["/avatar.png"],
    creator: "@mohamedhabib102",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mohamedmowafy.dev/#person",
      name: "Mohamed H. Mowafy",
      alternateName: "محمد حبيب موافي",
      jobTitle: "Senior Frontend Engineer & UI/UX Specialist",
      description:
        "Senior Frontend Developer with expertise in Next.js, React, TypeScript, Vue.js, Tailwind CSS, performance optimization, and fluid web animations.",
      url: "https://mohamedmowafy.dev",
      image: "https://mohamedmowafy.dev/avatar.png",
      sameAs: [
        "https://github.com/mohamedhabib102",
        "https://www.linkedin.com/in/habib-mowafy",
      ],
      knowsAbout: [
        "Frontend Development",
        "Next.js",
        "React",
        "TypeScript",
        "Vue.js",
        "Tailwind CSS",
        "Performance Optimization",
        "Web Vitals",
        "GSAP",
        "Framer Motion",
        "UI/UX Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://mohamedmowafy.dev/#website",
      url: "https://mohamedmowafy.dev",
      name: "Mohamed H. Mowafy - Portfolio",
      publisher: {
        "@id": "https://mohamedmowafy.dev/#person",
      },
      inLanguage: ["en-US", "ar-EG"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${alexandria.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased bg-white text-neutral-900">
        <LoadingProvider>
          <GlobalLoader />
          <QueryProvider>
            <LanguageProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </LanguageProvider>
          </QueryProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
