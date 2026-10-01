import React from "react";
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Resume & Career Profile",
  description:
    "Official Curriculum Vitae and technical profile of Mohamed H. Mowafy, Frontend Engineer specializing in Next.js 16, React 19, TypeScript, and high-performance interactive architectures.",
  keywords: [
    "Mohamed H. Mowafy Resume",
    "Frontend Engineer CV",
    "سيرة ذاتية محمد حبيب موافي",
    "React Developer CV",
    "Next.js Developer Resume",
  ],
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    title: "Resume & Career Profile | Mohamed H. Mowafy",
    description:
      "Explore Mohamed H. Mowafy's technical CV, career highlights at Serv5, production web architectures, and verified skills.",
    url: `${siteUrl}/resume`,
    type: "profile",
    siteName: "Mohamed H. Mowafy Portfolio",
    images: [
      {
        url: `${siteUrl}/me.png`,
        width: 1200,
        height: 630,
        alt: "Mohamed H. Mowafy - Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Career Profile | Mohamed H. Mowafy",
    description:
      "Explore Mohamed H. Mowafy's technical CV, career highlights at Serv5, production web architectures, and verified skills.",
    images: [`${siteUrl}/me.png`],
    creator: "@mohamedhabib102",
  },
};

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Mohamed H. Mowafy - Resume & Career Profile",
    url: `${siteUrl}/resume`,
    mainEntity: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      jobTitle: "Frontend Engineer & UI Specialist",
      worksFor: {
        "@type": "Organization",
        name: "Serv5",
      },
      sameAs: [
        "https://www.linkedin.com/in/mohamedhabibmowafy-dev/",
        "https://github.com/mohamedhabib102",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeClient />
    </>
  );
}
