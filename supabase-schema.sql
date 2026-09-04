-- =========================================================================
-- Supabase SQL Schema for Mohamed H. Mowafy Portfolio & Admin Dashboard
-- Run this script in your Supabase SQL Editor (the >_ icon on the left menu)
-- =========================================================================

-- 1. Site Configuration Table
CREATE TABLE IF NOT EXISTS public."SiteConfig" (
    "id" TEXT PRIMARY KEY DEFAULT 'default',
    "heroTitleEn" TEXT NOT NULL DEFAULT 'Creative Developer &',
    "heroTitleAr" TEXT NOT NULL DEFAULT 'مطور',
    "heroQuoteEn" TEXT NOT NULL DEFAULT 'I''m trying to make something. Not just for you. Maybe not even for me.',
    "heroQuoteAr" TEXT NOT NULL DEFAULT 'أحاول أن أصنع شيئاً. ليس فقط من أجلك. وربما ليس حتى من أجلي.',
    "heroImage" TEXT NOT NULL DEFAULT '/me.png',
    "aboutBioEn" TEXT NOT NULL,
    "aboutBioAr" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL DEFAULT 'https://github.com/mohamedhabib102',
    "linkedinUrl" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/habib-mowafy',
    "whatsappNumber" TEXT NOT NULL DEFAULT '201027227796',
    "footerHeadlineEn" TEXT NOT NULL DEFAULT 'Let''s build something great together',
    "footerHeadlineAr" TEXT NOT NULL DEFAULT 'دعنا نصنع شيئاً عظيماً معاً',
    "footerSubEn" TEXT NOT NULL DEFAULT 'Have an ambitious idea or project in mind? Let''s turn your vision into an impactful digital reality.',
    "footerSubAr" TEXT NOT NULL DEFAULT 'هل لديك فكرة أو مشروع طموح؟ دعنا نحول الرؤية إلى واقع رقمي مبهر.',
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public."Project" (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT UNIQUE NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Blogs Table
CREATE TABLE IF NOT EXISTS public."Blog" (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT UNIQUE NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptAr" TEXT NOT NULL,
    "contentEn" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "contentAr" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "coverImage" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "categoryAr" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "authorName" TEXT DEFAULT 'Mohamed H. Mowafy',
    "authorRole" TEXT DEFAULT 'Front-End Developer',
    "readTimeEn" TEXT DEFAULT '5 min read',
    "readTimeAr" TEXT DEFAULT '5 دقائق قراءة',
    "publishedAt" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Experience Table
CREATE TABLE IF NOT EXISTS public."Experience" (
    "id" TEXT PRIMARY KEY,
    "period" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "roleAr" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descAr" TEXT NOT NULL,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Contact Messages Table
CREATE TABLE IF NOT EXISTS public."ContactMessage" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS) and Public Read Access
ALTER TABLE public."SiteConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Blog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ContactMessage" ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public Read SiteConfig" ON public."SiteConfig" FOR SELECT USING (true);
CREATE POLICY "Public Read Project" ON public."Project" FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON public."Blog" FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public."Experience" FOR SELECT USING (true);

-- Allow full access for service role and anon insert for contact
CREATE POLICY "Allow All SiteConfig" ON public."SiteConfig" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Project" ON public."Project" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Blog" ON public."Blog" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Experience" ON public."Experience" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All ContactMessage" ON public."ContactMessage" FOR ALL USING (true) WITH CHECK (true);
