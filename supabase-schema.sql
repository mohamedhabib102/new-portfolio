-- =========================================================================
-- Supabase SQL Schema for Mohamed H. Mowafy Portfolio & Admin Dashboard
-- Run this script in your Supabase SQL Editor (the >_ icon on the left menu)
-- 100% Idempotent: Can be run multiple times safely without throwing errors.
-- =========================================================================

-- 1. Site Configuration Table
CREATE TABLE IF NOT EXISTS public."SiteConfig" (
    "id" TEXT PRIMARY KEY DEFAULT 'default',
    "heroTitleEn" TEXT NOT NULL DEFAULT 'Developer &',
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
    "githubPrivate" BOOLEAN DEFAULT false,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public."Project" ADD COLUMN IF NOT EXISTS "githubPrivate" BOOLEAN DEFAULT false;

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
    "likes" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public."Blog" ADD COLUMN IF NOT EXISTS "likes" INTEGER DEFAULT 0;

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

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public."Skill" (
    "id" TEXT PRIMARY KEY,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descAr" TEXT NOT NULL,
    "icons" JSONB DEFAULT '[]'::jsonb,
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS public."ContactMessage" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public."SiteConfig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Blog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Skill" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ContactMessage" ENABLE ROW LEVEL SECURITY;

-- 8. Drop Existing Policies (if any) to prevent duplicate errors
DROP POLICY IF EXISTS "Public Read SiteConfig" ON public."SiteConfig";
DROP POLICY IF EXISTS "Public Read Project" ON public."Project";
DROP POLICY IF EXISTS "Public Read Blog" ON public."Blog";
DROP POLICY IF EXISTS "Public Read Experience" ON public."Experience";
DROP POLICY IF EXISTS "Public Read Skill" ON public."Skill";

DROP POLICY IF EXISTS "Allow All SiteConfig" ON public."SiteConfig";
DROP POLICY IF EXISTS "Allow All Project" ON public."Project";
DROP POLICY IF EXISTS "Allow All Blog" ON public."Blog";
DROP POLICY IF EXISTS "Allow All Experience" ON public."Experience";
DROP POLICY IF EXISTS "Allow All Skill" ON public."Skill";
DROP POLICY IF EXISTS "Allow All ContactMessage" ON public."ContactMessage";

-- 9. Create Policies safely
CREATE POLICY "Public Read SiteConfig" ON public."SiteConfig" FOR SELECT USING (true);
CREATE POLICY "Public Read Project" ON public."Project" FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON public."Blog" FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public."Experience" FOR SELECT USING (true);
CREATE POLICY "Public Read Skill" ON public."Skill" FOR SELECT USING (true);

CREATE POLICY "Allow All SiteConfig" ON public."SiteConfig" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Project" ON public."Project" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Blog" ON public."Blog" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Experience" ON public."Experience" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Skill" ON public."Skill" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All ContactMessage" ON public."ContactMessage" FOR ALL USING (true) WITH CHECK (true);

-- 10. Supabase Storage Bucket & Direct Upload Policy
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Read Storage" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Storage" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Storage" ON storage.objects;

CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Public Upload Storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');
CREATE POLICY "Public Update Storage" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-media');