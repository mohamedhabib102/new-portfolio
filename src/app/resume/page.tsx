import React from "react";
import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume & Career Profile | Mohamed H. Mowafy",
  description:
    "Official Curriculum Vitae and technical profile of Mohamed H. Mowafy, Front-End Engineer specializing in Next.js 16, React 19, TypeScript, and high-performance interactive architectures.",
  alternates: {
    canonical: "https://mohamedmowafydev.vercel.app/resume",
  },
  openGraph: {
    title: "Resume & Career Profile | Mohamed H. Mowafy",
    description:
      "Explore Mohamed H. Mowafy's technical CV, career highlights at Serv5, production web architectures, and verified skills.",
    url: "https://mohamedmowafydev.vercel.app/resume",
    type: "profile",
    images: [
      {
        url: "https://mohamedmowafydev.vercel.app/me.png",
        width: 1200,
        height: 630,
        alt: "Mohamed H. Mowafy - Front-End Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & Career Profile | Mohamed H. Mowafy",
    description:
      "Explore Mohamed H. Mowafy's technical CV, career highlights at Serv5, production web architectures, and verified skills.",
    images: ["https://mohamedmowafydev.vercel.app/me.png"],
    creator: "@mohamedhabib102",
  },
};

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Mohamed H. Mowafy - Resume & Career Profile",
    url: "https://mohamedmowafydev.vercel.app/resume",
    mainEntity: {
      "@type": "Person",
      name: "Mohamed H. Mowafy",
      jobTitle: "Front-End Developer & Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Serv5",
      },
      sameAs: [
        "https://www.linkedin.com/in/habib-mowafy",
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
