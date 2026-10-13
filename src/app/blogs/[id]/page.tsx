import React from "react";
import type { Metadata } from "next";
import { portfolioStore } from "@/lib/store";
import BlogDetailClient from "./BlogDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app").replace(/\/$/, "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cleanId = decodeURIComponent(id).trim().toLowerCase();
  const blogs = await portfolioStore.getBlogs();
  const blog = blogs.find((b: any) => {
    const bId = (b.id || "").toLowerCase().trim();
    const bSlug = (b.slug || "").toLowerCase().trim();
    return bId === cleanId || bSlug === cleanId;
  });

  if (!blog) {
    return {
      title: "Article Not Found | Mohamed H. Mowafy",
      description: "The requested article could not be found in Mohamed H. Mowafy's engineering blog.",
      robots: { index: false, follow: true },
    };
  }

  const pageTitle = blog.titleAr
    ? `${blog.titleAr} | Mohamed H. Mowafy`
    : `${blog.titleEn} | Mohamed H. Mowafy`;
  const description =
    blog.excerptAr ||
    blog.excerptEn ||
    `Read ${blog.titleEn}, an engineering article by Mohamed H. Mowafy covering modern web technologies.`;
  const canonicalUrl = `${siteUrl}/blogs/${blog.slug || id}`;
  const keywords = Array.isArray(blog.tags)
    ? [...blog.tags, blog.categoryEn, blog.categoryAr, "Frontend Engineering", "Web Development", "Mohamed H. Mowafy", "محمد حبيب موافي"].filter(Boolean)
    : ["Frontend Engineering", "Web Development"];

  const previewImage = blog.coverImage?.startsWith("http")
    ? blog.coverImage
    : blog.coverImage
    ? `${siteUrl}${blog.coverImage}`
    : `${siteUrl}/avatar.png`;

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
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
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: ["Mohamed H. Mowafy"],
      tags: blog.tags,
      siteName: "Mohamed H. Mowafy Blog",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: blog.titleAr || blog.titleEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [previewImage],
      creator: "@mohamedhabib102",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const cleanId = decodeURIComponent(id).trim().toLowerCase();
  const blogs = await portfolioStore.getBlogs();
  const blog = blogs.find((b: any) => {
    const bId = (b.id || "").toLowerCase().trim();
    const bSlug = (b.slug || "").toLowerCase().trim();
    return bId === cleanId || bSlug === cleanId;
  });

  const canonicalUrl = `${siteUrl}/blogs/${blog?.slug || id}`;
  const previewImage = blog?.coverImage?.startsWith("http")
    ? blog.coverImage
    : blog?.coverImage
    ? `${siteUrl}${blog.coverImage}`
    : `${siteUrl}/avatar.png`;

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: blog.titleAr || blog.titleEn,
        alternativeHeadline: blog.titleEn,
        description: blog.excerptAr || blog.excerptEn,
        image: previewImage ? [previewImage] : [`${siteUrl}/avatar.png`],
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt || blog.publishedAt,
        inLanguage: ["ar", "en"],
        articleSection: blog.categoryAr || blog.categoryEn,
        author: {
          "@type": "Person",
          name: "Mohamed H. Mowafy",
          jobTitle: "Front-End Developer",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Mohamed H. Mowafy",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/avatar.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailClient id={id} initialBlog={blog} />
    </>
  );
}
