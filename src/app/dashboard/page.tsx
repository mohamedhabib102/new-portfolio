"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/axios";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import {
  FiLayout,
  FiFileText,
  FiFolder,
  FiUser,
  FiMail,
  FiSave,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiExternalLink,
  FiLock,
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiUploadCloud,
  FiVideo,
  FiImage,
  FiBriefcase,
  FiGlobe,
  FiCode,
  FiMinus,
} from "react-icons/fi";

interface BlogSection {
  heading: string;
  body: string;
  code?: string;
}

export default function DashboardPage() {
  const { isRtl } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "experiences" | "projects" | "blogs" | "footer" | "messages"
  >("hero");

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState<string | null>(null);

  // File Input Refs
  const heroFileRef = useRef<HTMLInputElement | null>(null);
  const projectVideoFileRef = useRef<HTMLInputElement | null>(null);
  const blogCoverFileRef = useRef<HTMLInputElement | null>(null);

  // Site Config State
  const [siteConfig, setSiteConfig] = useState({
    heroTitleEn: "e Developer &",
    heroTitleAr: "مطور",
    heroQuoteEn: "I'm trying to make something. Not just for you. Maybe not even for me.",
    heroQuoteAr: "أحاول أن أصنع شيئاً. ليس فقط من أجلك. وربما ليس حتى من أجلي.",
    heroImage: "/me.png",
    aboutBioEn: "",
    aboutBioAr: "",
    githubUrl: "https://github.com/mowafy-dev",
    linkedinUrl: "https://www.linkedin.com/in/habib-mowafy",
    whatsappNumber: "201027227796",
    footerHeadlineEn: "Let's build something great together",
    footerHeadlineAr: "دعنا نصنع شيئاً عظيماً معاً",
    footerSubEn: "Have an ambitious idea or project in mind? Let's turn your vision into an impactful digital reality.",
    footerSubAr: "هل لديك فكرة أو مشروع طموح؟ دعنا نحول الرؤية إلى واقع رقمي مبهر.",
  });

  const [experiences, setExperiences] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Experience Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<any>({
    id: "",
    period: "2024 - Present",
    roleEn: "",
    roleAr: "",
    company: "",
    descEn: "",
    descAr: "",
    skills: "React, Next.js, TypeScript",
  });

  // Project Modal State (With Rich Highlights & Architecture Sections)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>({
    id: "",
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    videoUrl: "", // Never force /test.mp4 on new projects
    liveUrl: "",
    githubUrl: "",
    tags: "",
    featuresEn: "",
    featuresAr: "",
    sectionsEn: [{ heading: "", body: "", code: "" }],
    sectionsAr: [{ heading: "", body: "", code: "" }],
  });

  // Blog Modal State (With Rich Sections and Code Blocks)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>({
    id: "",
    titleEn: "",
    titleAr: "",
    excerptEn: "",
    excerptAr: "",
    coverImage: "",
    categoryEn: "Frontend",
    categoryAr: "واجهات أمامية",
    tags: "React, Next.js",
    introEn: "",
    introAr: "",
    conclusionEn: "",
    conclusionAr: "",
    sectionsEn: [{ heading: "", body: "", code: "" }],
    sectionsAr: [{ heading: "", body: "", code: "" }],
  });

  // 1. Check Authentication on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth =
        localStorage.getItem("mowafy_admin_logged_in") === "true" ||
        sessionStorage.getItem("mowafy_admin_authenticated") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "mowafy@admin2026") {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("mowafy_admin_logged_in", "true");
        sessionStorage.setItem("mowafy_admin_authenticated", "true");
      }
      loadDashboardData();
    } else {
      setAuthError(isRtl ? "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى." : "Incorrect admin password. Please try again.");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mowafy_admin_logged_in");
      sessionStorage.removeItem("mowafy_admin_authenticated");
    }
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/api/admin/data");
      if (res.data?.data) {
        setSiteConfig(res.data.data.siteConfig || {});
        setExperiences(res.data.data.experiences || []);
        setProjects(res.data.data.projects || []);
        setBlogs(res.data.data.blogs || []);
        setMessages(res.data.data.messages || []);
      }
    } catch (e) {
      console.warn("Could not load admin data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // Generic File Upload Handler (Supabase Storage Direct)
  const uploadFile = async (file: File): Promise<string | null> => {
    setUploadingStatus(isRtl ? "جاري رفع الملف سحابياً إلى Supabase Storage..." : "Uploading to Supabase Storage...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();

      if (res?.success && res?.url) {
        triggerToast(
          res.storage === "supabase"
            ? (isRtl ? "تم الرفع والتخزين في Supabase بنجاح!" : "Uploaded to Supabase Storage!")
            : (isRtl ? "تم حفظ الملف بنجاح!" : "File uploaded successfully!")
        );
        return res.url;
      } else {
        throw new Error(res?.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      triggerToast(isRtl ? "فشل رفع الملف إلى Supabase" : "Failed to upload file");
    } finally {
      setUploadingStatus(null);
    }
    return null;
  };

  // Upload Handlers
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      setSiteConfig((prev) => ({ ...prev, heroImage: url }));
    }
  };

  const handleProjectVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      setEditingProject((prev: any) => ({ ...prev, videoUrl: url }));
    }
  };

  const handleBlogCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      setEditingBlog((prev: any) => ({ ...prev, coverImage: url }));
    }
  };

  // 2. Save Site Config (Hero, About & Footer)
  const handleSaveSiteConfig = async () => {
    try {
      await apiClient.post("/api/admin/site-config", siteConfig);
      triggerToast(isRtl ? "تم حفظ الإعدادات بنجاح!" : "Configuration updated successfully!");
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ الإعدادات" : "Failed to update configuration");
    }
  };

  // 3. Save Experience
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/admin/experiences", editingExp);
      setIsExpModalOpen(false);
      triggerToast(isRtl ? "تم حفظ الخبرة بنجاح!" : "Experience saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ الخبرة" : "Failed to save experience");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذه الخبرة؟" : "Are you sure you want to delete this experience?")) return;
    try {
      await apiClient.delete(`/api/admin/experiences?id=${id}`);
      triggerToast(isRtl ? "تم حذف الخبرة!" : "Experience deleted!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف الخبرة" : "Failed to delete experience");
    }
  };

  // 4. Save Project (With Rich Features & Sections)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingProject,
        featuresEn: typeof editingProject.featuresEn === "string"
          ? editingProject.featuresEn.split("\n").map((s: string) => s.trim()).filter(Boolean)
          : (editingProject.featuresEn || []),
        featuresAr: typeof editingProject.featuresAr === "string"
          ? editingProject.featuresAr.split("\n").map((s: string) => s.trim()).filter(Boolean)
          : (editingProject.featuresAr || []),
      };
      await apiClient.post("/api/admin/projects", payload);
      setIsProjectModalOpen(false);
      triggerToast(isRtl ? "تم حفظ المشروع وتفاصيله بنجاح!" : "Project and details saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ المشروع" : "Failed to save project");
    }
  };

  const addProjectSection = () => {
    setEditingProject((prev: any) => ({
      ...prev,
      sectionsEn: [...(prev.sectionsEn || []), { heading: "", body: "", code: "" }],
      sectionsAr: [...(prev.sectionsAr || []), { heading: "", body: "", code: "" }],
    }));
  };

  const removeProjectSection = (idx: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      sectionsEn: prev.sectionsEn.filter((_: any, i: number) => i !== idx),
      sectionsAr: prev.sectionsAr.filter((_: any, i: number) => i !== idx),
    }));
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المشروع؟" : "Are you sure you want to delete this project?")) return;
    try {
      await apiClient.delete(`/api/admin/projects?id=${id}`);
      triggerToast(isRtl ? "تم حذف المشروع!" : "Project deleted!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف المشروع" : "Failed to delete project");
    }
  };

  // 5. Save Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/admin/blogs", editingBlog);
      setIsBlogModalOpen(false);
      triggerToast(isRtl ? "تم حفظ المقال بنجاح!" : "Blog post saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ المقال" : "Failed to save blog post");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المقال؟" : "Are you sure you want to delete this blog post?")) return;
    try {
      await apiClient.delete(`/api/admin/blogs?id=${id}`);
      triggerToast(isRtl ? "تم حذف المقال!" : "Blog post deleted!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف المقال" : "Failed to delete blog post");
    }
  };

  // Blog Sections Helpers
  const addBlogSection = () => {
    setEditingBlog((prev: any) => ({
      ...prev,
      sectionsEn: [...(prev.sectionsEn || []), { heading: "", body: "", code: "" }],
      sectionsAr: [...(prev.sectionsAr || []), { heading: "", body: "", code: "" }],
    }));
  };

  const removeBlogSection = (idx: number) => {
    setEditingBlog((prev: any) => ({
      ...prev,
      sectionsEn: prev.sectionsEn.filter((_: any, i: number) => i !== idx),
      sectionsAr: prev.sectionsAr.filter((_: any, i: number) => i !== idx),
    }));
  };

  // If not authenticated, show password challenge modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090b0e] text-white flex items-center justify-center p-6" dir={isRtl ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#13151c] border border-white/10 shadow-2xl flex flex-col gap-6 text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FiLock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-2xl font-normal text-white mb-2">
              {isRtl ? "لوحة التحكم الرئيسية" : "Admin Dashboard"}
            </h1>
            <p className="text-xs text-neutral-400">
              {isRtl
                ? "أدخل كلمة المرور السرية للمدير، أو يمكنك الدخول عبر كتابة كلمة المرور في رسالة نموذج Get in touch."
                : "Enter admin passcode, or access via the website's 'Get in touch' contact form."}
            </p>
          </div>

          <form onSubmit={handleDirectLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs text-neutral-400 mb-1 font-medium text-right sm:text-left">
                {isRtl ? "كلمة المرور السرية" : "Admin Password"}
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={isRtl ? "أدخل كلمة المرور..." : "Enter admin password..."}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-sm"
              />
              {authError && <p className="text-xs text-red-400 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md mt-2 cursor-pointer"
            >
              {isRtl ? "تسجيل الدخول" : "Unlock Dashboard"}
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <Link href="/" className="text-xs text-neutral-400 hover:text-white transition-colors">
              {isRtl ? "← العودة إلى الموقع" : "← Return to Portfolio"}
            </Link>
            <LanguageToggle />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-neutral-200 selection:bg-blue-600 selection:text-white dashboard-root" dir={isRtl ? "rtl" : "ltr"}>
      {/* Toast Notifications */}
      <AnimatePresence>
        {(saveStatus || uploadingStatus) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 ${isRtl ? "left-6" : "right-6"} z-50 px-5 py-3 rounded-xl ${
              uploadingStatus ? "bg-blue-600 text-white" : "bg-emerald-500 text-black"
            } font-medium text-xs shadow-2xl flex items-center gap-2`}
          >
            <FiCheckCircle className="w-4 h-4" />
            <span>{uploadingStatus || saveStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Header Bar */}
      <header className="w-full border-b border-white/10 bg-[#0e1017]/90 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Left: Complete Uncropped Avatar & Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-cyan-400/50 bg-[#151821] shrink-0 relative shadow-md">
            <Image
              src="/me.png"
              alt="Mohamed H. Mowafy"
              fill
              className="object-cover object-top"
              sizes="44px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-medium text-white tracking-tight">
              Mohamed H. Mowafy
            </h2>
            <p className="text-[11px] text-cyan-300 font-light">
              {isRtl ? "لوحة التحكم والإدارة الفورية" : "Portfolio Control Center"}
            </p>
          </div>
        </div>

        {/* Right: Language Toggle, Live Portfolio Link, and Logout */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 transition-colors"
          >
            <span>{isRtl ? "معاينة الموقع" : "Live Portfolio"}</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-400 transition-colors cursor-pointer"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>{isRtl ? "خروج" : "Logout"}</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2 select-none overflow-x-hidden">
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "hero" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <FiLayout className="w-4 h-4" />
            <span>{isRtl ? "الهيرو والهوية" : "Hero & Identity"}</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "about" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <FiUser className="w-4 h-4" />
            <span>{isRtl ? "نبذة عني (About Me)" : "About Me Bio"}</span>
          </button>

          <button
            onClick={() => setActiveTab("experiences")}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "experiences" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <FiBriefcase className="w-4 h-4" />
              <span>{isRtl ? "الخبرات العملية" : "Work Experience"}</span>
            </div>
            <span className="text-[11px] opacity-70">({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "projects" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <FiFolder className="w-4 h-4" />
              <span>{isRtl ? "المشاريع" : "Projects"}</span>
            </div>
            <span className="text-[11px] opacity-70">({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "blogs" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <FiFileText className="w-4 h-4" />
              <span>{isRtl ? "المدونة والمقالات" : "Blogs"}</span>
            </div>
            <span className="text-[11px] opacity-70">({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("footer")}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "footer" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <FiGlobe className="w-4 h-4" />
            <span>{isRtl ? "الفوتر وروابط التواصل" : "Footer & Socials"}</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "messages" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <FiMail className="w-4 h-4" />
              <span>{isRtl ? "رسائل العملاء" : "Client Messages"}</span>
            </div>
            {messages.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500 text-white font-semibold">
                {messages.length}
              </span>
            )}
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-1">
          {/* TAB 1: HERO & IDENTITY */}
          {activeTab === "hero" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#12141c] border border-white/10 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-1">
                  {isRtl ? "إعدادات الهيرو والصورة" : "Hero Section Settings"}
                </h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل نصوص الهيرو واقتباس الهيرو ورفع صورة الهيرو كملف مباشر."
                    : "Update edge-to-edge headlines, top quote, and upload background hero photo."}
                </p>
              </div>

              {/* Current Hero Image Preview & File Upload */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-black">
                  <Image
                    src={siteConfig.heroImage || "/me.png"}
                    alt="Hero Preview"
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left w-full">
                  <span className="text-xs font-medium text-white">
                    {isRtl ? "صورة الهيرو الحالية" : "Current Hero Image"}
                  </span>
                  <p className="text-[11px] text-neutral-400">
                    {isRtl
                      ? "يمكنك رفع صورة جديدة كملف مباشرة (PNG, JPG, WebP). سيتم رفعها وحفظها وتحديث الهيرو فوراً."
                      : "Upload an image file directly (PNG, JPG, WebP). It will be saved and update the hero instantly."}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="file"
                      ref={heroFileRef}
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => heroFileRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 text-xs font-medium transition-all cursor-pointer"
                    >
                      <FiUploadCloud className="w-4 h-4" />
                      <span>{isRtl ? "اختر صورة لرفعها" : "Upload Image File"}</span>
                    </button>
                    <span className="text-[11px] text-neutral-500 truncate max-w-xs">{siteConfig.heroImage}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان الهيرو (إنجليزي)" : "Hero Title (English)"}</label>
                  <input
                    type="text"
                    value={siteConfig.heroTitleEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">{isRtl ? "النص يظهر كما هو في الهيرو تماماً" : "Text displays exactly as written across the hero"}</p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان الهيرو (عربي)" : "Hero Title (Arabic)"}</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={siteConfig.heroTitleAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">{isRtl ? "المعروض في وضع العربي كـ: مطور" : "Displayed in Arabic mode: مطور"}</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "اقتباس الهيرو العلوي (إنجليزي)" : "Top Right Quote (English)"}</label>
                  <textarea
                    rows={2}
                    value={siteConfig.heroQuoteEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroQuoteEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "اقتباس الهيرو العلوي (عربي)" : "Top Right Quote (Arabic)"}</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={siteConfig.heroQuoteAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroQuoteAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isRtl ? "حفظ التغييرات" : "Save Changes"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ABOUT ME BIO */}
          {activeTab === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#12141c] border border-white/10 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-1">
                  {isRtl ? "وصف صفحة عني (About Me Bio)" : "About Me Description"}
                </h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل النص الشامل الموحد الذي يظهر في كارت صفحة About Me."
                    : "Update your unified biography block displayed on the About Me page."}
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "السيرة الذاتية (بالإنجليزية)" : "English Biography"}</label>
                  <textarea
                    rows={7}
                    value={siteConfig.aboutBioEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, aboutBioEn: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "السيرة الذاتية (بالعربية)" : "Arabic Biography"}</label>
                  <textarea
                    rows={7}
                    dir="rtl"
                    value={siteConfig.aboutBioAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, aboutBioAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 leading-relaxed font-light"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isRtl ? "حفظ السيرة الذاتية" : "Save Changes"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EXPERIENCES (الخبرات العملية) */}
          {activeTab === "experiences" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {isRtl ? "الخبرات المهنية وسجل العمل" : "Work Experience Timeline"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "إضافة وتعديل وحذف محطات الخبرة التي تظهر على الخط الزمني في صفحة About."
                      : "Add, edit, or delete experience timeline nodes on the About page."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingExp({
                      id: "",
                      period: "2024 - Present",
                      roleEn: "",
                      roleAr: "",
                      company: "",
                      descEn: "",
                      descAr: "",
                      skills: "Next.js, React, TypeScript",
                    });
                    setIsExpModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>{isRtl ? "إضافة خبرة جديدة" : "Add Experience"}</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col sm:flex-row items-start justify-between gap-4 shadow-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 font-medium">
                          {exp.period}
                        </span>
                        <span className="text-sm font-semibold text-white">{exp.company}</span>
                      </div>
                      <h4 className="text-lg font-medium text-white">
                        {isRtl ? exp.roleAr : exp.roleEn}
                      </h4>
                      <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                        {isRtl ? exp.descAr : exp.descEn}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(Array.isArray(exp.skills) ? exp.skills : (exp.skills || "").split(",")).map((s: string, i: number) => (
                          <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingExp({
                            ...exp,
                            skills: Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills,
                          });
                          setIsExpModalOpen(true);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PROJECTS (Wider Modal, Smooth Mouse Wheel Scroll, Empty videoUrl on new) */}
          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "إدارة المشاريع" : "Projects Showcase"}</h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "استعراض الفيديو الحالي لكل مشروع ورفع فيديوهات جديدة كملفات."
                      : "Preview current videos and upload new MP4/WebM video files directly."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject({
                      id: "",
                      titleEn: "",
                      titleAr: "",
                      descriptionEn: "",
                      descriptionAr: "",
                      videoUrl: "", // EMPTY BY DEFAULT - NO FORCED VIDEO!
                      liveUrl: "",
                      githubUrl: "",
                      tags: "",
                      featuresEn: "",
                      featuresAr: "",
                      sectionsEn: [{ heading: "", body: "", code: "" }],
                      sectionsAr: [{ heading: "", body: "", code: "" }],
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>{isRtl ? "إضافة مشروع جديد" : "Add Project"}</span>
                </button>
              </div>

              {/* Projects Grid with Video Player Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col justify-between gap-4 shadow-xl"
                  >
                    {/* Current Video Preview */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                      {proj.videoUrl ? (
                        <video
                          src={proj.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          {isRtl ? "لا يوجد فيديو بعد" : "No video uploaded"}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">
                        {isRtl ? proj.titleAr : proj.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {isRtl ? proj.descriptionAr : proj.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[11px] text-neutral-500 truncate max-w-[200px]">
                        {Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject({
                              ...proj,
                              tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : (proj.tags || ""),
                              featuresEn: Array.isArray(proj.featuresEn) ? proj.featuresEn.join("\n") : (proj.featuresEn || ""),
                              featuresAr: Array.isArray(proj.featuresAr) ? proj.featuresAr.join("\n") : (proj.featuresAr || ""),
                              sectionsEn: proj.sectionsEn && proj.sectionsEn.length > 0 
                                ? proj.sectionsEn.map((s: any) => ({ heading: s.heading || "", body: s.body || "", code: s.code || "" }))
                                : [{ heading: "", body: "", code: "" }],
                              sectionsAr: proj.sectionsAr && proj.sectionsAr.length > 0 
                                ? proj.sectionsAr.map((s: any) => ({ heading: s.heading || "", body: s.body || "", code: s.code || "" }))
                                : [{ heading: "", body: "", code: "" }],
                            });
                            setIsProjectModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: BLOGS (Rich Sections, Headings, Paragraphs & Code Blocks) */}
          {activeTab === "blogs" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "إدارة المدونة والمقالات" : "Articles & Blogs"}</h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "اسم الكاتب محدد باسم Mohamed H. Mowafy مع إمكانية إضافة أقسام وعناوين وفقرات وكود برمجي."
                      : "Author is set to Mohamed H. Mowafy with rich section builder, headings, paragraphs, and code snippets."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingBlog({
                      id: "",
                      titleEn: "",
                      titleAr: "",
                      excerptEn: "",
                      excerptAr: "",
                      coverImage: "",
                      categoryEn: "Frontend",
                      categoryAr: "واجهات أمامية",
                      tags: "",
                      introEn: "",
                      introAr: "",
                      conclusionEn: "",
                      conclusionAr: "",
                      sectionsEn: [{ heading: "", body: "", code: "" }],
                      sectionsAr: [{ heading: "", body: "", code: "" }],
                    });
                    setIsBlogModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>{isRtl ? "كتابة مقال جديد" : "Write Article"}</span>
                </button>
              </div>

              {/* Blogs Grid with Image Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col justify-between gap-4 shadow-xl"
                  >
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                      {b.coverImage ? (
                        <Image
                          src={b.coverImage}
                          alt={b.titleEn}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          {isRtl ? "لا توجد صورة غلاف" : "No cover image"}
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] bg-black/80 text-white border border-white/10">
                        {isRtl ? b.categoryAr : b.categoryEn}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-1 leading-snug">
                        {isRtl ? b.titleAr : b.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {isRtl ? b.excerptAr : b.excerptEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[11px] text-cyan-300 font-medium">Mohamed H. Mowafy</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const rawSecsEn = b.contentEn?.sections || [];
                            const rawSecsAr = b.contentAr?.sections || [];
                            setEditingBlog({
                              ...b,
                              tags: Array.isArray(b.tags) ? b.tags.join(", ") : b.tags,
                              sectionsEn: rawSecsEn.length > 0 
                                ? rawSecsEn.map((s: any) => ({ heading: s.heading || "", body: s.body || "", code: s.code || s.codeSnippet || "" }))
                                : [{ heading: "", body: "", code: "" }],
                              sectionsAr: rawSecsAr.length > 0 
                                ? rawSecsAr.map((s: any) => ({ heading: s.heading || "", body: s.body || "", code: s.code || s.codeSnippet || "" }))
                                : [{ heading: "", body: "", code: "" }],
                              introEn: b.contentEn?.intro || b.excerptEn || "",
                              introAr: b.contentAr?.intro || b.excerptAr || "",
                              conclusionEn: b.contentEn?.conclusion || "",
                              conclusionAr: b.contentAr?.conclusion || "",
                            });
                            setIsBlogModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 6: FOOTER & SOCIAL LINKS */}
          {activeTab === "footer" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#12141c] border border-white/10 shadow-xl flex flex-col gap-6"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-1">
                  {isRtl ? "إعدادات الفوتر وروابط التواصل" : "Footer & Social Media Settings"}
                </h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل روابط GitHub و LinkedIn ورقم الواتساب وعناوين الفوتر التي تظهر في جميع الصفحات."
                    : "Update your GitHub, LinkedIn, WhatsApp number, and footer CTA headlines."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={siteConfig.githubUrl}
                    onChange={(e) => setSiteConfig({ ...siteConfig, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={siteConfig.linkedinUrl}
                    onChange={(e) => setSiteConfig({ ...siteConfig, linkedinUrl: e.target.value })}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "رقم الواتساب (مع كود الدولة)" : "WhatsApp Phone Number (with country code)"}</label>
                  <input
                    type="text"
                    value={siteConfig.whatsappNumber}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsappNumber: e.target.value })}
                    placeholder="201027227796"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">{isRtl ? "مثال: 201027227796 بدون علامة +" : "e.g. 201027227796 without +"}</p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان الفوتر الكبير (إنجليزي)" : "Footer Headline (English)"}</label>
                  <input
                    type="text"
                    value={siteConfig.footerHeadlineEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerHeadlineEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان الفوتر الكبير (عربي)" : "Footer Headline (Arabic)"}</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={siteConfig.footerHeadlineAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerHeadlineAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "النص الفرعي للفوتر (إنجليزي)" : "Footer Subtitle (English)"}</label>
                  <textarea
                    rows={2}
                    value={siteConfig.footerSubEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerSubEn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "النص الفرعي للفوتر (عربي)" : "Footer Subtitle (Arabic)"}</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={siteConfig.footerSubAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerSubAr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isRtl ? "حفظ الفوتر والروابط" : "Save Footer Settings"}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 7: CLIENT MESSAGES */}
          {activeTab === "messages" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "رسائل واستفسارات العملاء" : "Inquiries & Messages"}</h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "الرسائل المستلمة من زوار وعملاء الموقع عبر نموذج 'Get in touch'."
                    : "Client messages submitted through the 'Get in touch' contact modal."}
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#12141c] border border-white/10 text-neutral-400 text-sm">
                  {isRtl ? "لا توجد رسائل واردة حتى الآن." : "No messages yet."}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-6 rounded-2xl bg-[#12141c] border border-white/10 shadow-lg flex flex-col gap-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white text-sm">{m.name || "Anonymous Client"}</span>
                          <span className="text-xs text-blue-400">{m.email}</span>
                          {m.phone && <span className="text-xs text-neutral-400">{m.phone}</span>}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <FiClock className="w-3 h-3" />
                          <span>{new Date(m.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* ===================== EXPERIENCE ADD / EDIT MODAL ===================== */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#14161f] border border-white/15 shadow-2xl flex flex-col gap-4 max-h-[88vh] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20"
            >
              <h3 className="text-lg font-medium text-white">
                {editingExp.id ? (isRtl ? "تعديل الخبرة" : "Edit Experience") : (isRtl ? "إضافة خبرة جديدة" : "Add New Experience")}
              </h3>

              <form onSubmit={handleSaveExperience} className="flex flex-col gap-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الفترة الزمنية" : "Period"}</label>
                    <input
                      type="text"
                      required
                      value={editingExp.period}
                      onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                      placeholder="2024 - Present"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "اسم الشركة أو الجهة" : "Company / Client"}</label>
                    <input
                      type="text"
                      required
                      value={editingExp.company}
                      onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                      placeholder="serv5"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "المسمى الوظيفي (إنجليزي)" : "Role Title (English)"}</label>
                    <input
                      type="text"
                      required
                      value={editingExp.roleEn}
                      onChange={(e) => setEditingExp({ ...editingExp, roleEn: e.target.value })}
                      placeholder="Frontend Engineer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "المسمى الوظيفي (عربي)" : "Role Title (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={editingExp.roleAr}
                      onChange={(e) => setEditingExp({ ...editingExp, roleAr: e.target.value })}
                      placeholder="مهندس واجهات أمامية"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "تفاصيل الخبرة والمسؤوليات (إنجليزي)" : "Responsibilities & Impact (English)"}</label>
                  <textarea
                    rows={3}
                    value={editingExp.descEn}
                    onChange={(e) => setEditingExp({ ...editingExp, descEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "تفاصيل الخبرة والمسؤوليات (عربي)" : "Responsibilities & Impact (Arabic)"}</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={editingExp.descAr}
                    onChange={(e) => setEditingExp({ ...editingExp, descAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "المهارات والتقنيات (مفصولة بفواصل)" : "Skills & Tech (comma separated)"}</label>
                  <input
                    type="text"
                    value={editingExp.skills}
                    onChange={(e) => setEditingExp({ ...editingExp, skills: e.target.value })}
                    placeholder="Next.js, React, GSAP, TypeScript, Tailwind CSS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsExpModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md cursor-pointer"
                  >
                    {isRtl ? "حفظ الخبرة" : "Save Experience"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== PROJECT EDIT / ADD MODAL (Wide 2-Column, Mouse Wheel Scroll, data-lenis-prevent) ===================== */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              data-lenis-prevent="true"
              className="w-full max-w-5xl p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/15 shadow-2xl flex flex-col gap-6 max-h-[88vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {editingProject.id ? (isRtl ? "تعديل تفاصيل المشروع" : "Edit Project Details") : (isRtl ? "إضافة مشروع جديد" : "Add New Project")}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? "تحكم في كل تفاصيل المشروع، الروابط، وفيديو العرض المباشر." : "Customize all project fields, live URLs, repository, and media showcase."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex flex-col gap-6 text-left" data-lenis-prevent="true">
                {/* 2-Column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column (7 cols): Titles, Descriptions, Links, Tags */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                        <input
                          type="text"
                          required
                          value={editingProject.titleEn}
                          onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                          placeholder="e.g. Next-Gen Dashboard"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                        <input
                          type="text"
                          dir="rtl"
                          required
                          value={editingProject.titleAr}
                          onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                          placeholder="مثال: لوحة تحكم عصرية"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                        <textarea
                          rows={4}
                          value={editingProject.descriptionEn}
                          onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                          placeholder="Full project description in English..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors resize-none font-light leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                        <textarea
                          rows={4}
                          dir="rtl"
                          value={editingProject.descriptionAr}
                          onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                          placeholder="وصف تفصيلي كامل للمشروع بالعربية..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors resize-none font-light leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "رابط المعاينة المباشرة" : "Live Demo URL"}</label>
                        <input
                          type="text"
                          value={editingProject.liveUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "رابط الكود على GitHub" : "GitHub Repository URL"}</label>
                        <input
                          type="text"
                          value={editingProject.githubUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">{isRtl ? "التقنيات والوسوم (مفصولة بفواصل)" : "Tags / Technologies (Comma Separated)"}</label>
                      <input
                        type="text"
                        value={editingProject.tags}
                        onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                        placeholder="React, Next.js, Tailwind CSS, TypeScript, Socket.io"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Right Column (5 cols): Media & Direct Video File Upload */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-neutral-200 font-semibold flex items-center gap-2">
                          <FiVideo className="w-4 h-4 text-cyan-400" />
                          <span>{isRtl ? "فيديو المشروع (رفع ملف مباشر)" : "Project Video Showcase"}</span>
                        </label>
                        <span className="text-[11px] text-neutral-400 font-mono">MP4, WebM</span>
                      </div>

                      {/* Video Player or Empty State */}
                      {editingProject.videoUrl ? (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-xl">
                          <video
                            src={editingProject.videoUrl}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-video rounded-2xl bg-black/40 border border-dashed border-white/15 flex flex-col items-center justify-center p-6 text-center text-xs text-neutral-400 gap-2">
                          <FiUploadCloud className="w-8 h-8 text-neutral-500" />
                          <p>{isRtl ? "لم يتم رفع فيديو بعد لهذا المشروع" : "No video uploaded yet for this project"}</p>
                          <span className="text-[10px] text-neutral-500">{isRtl ? "اختر ملف فيديو لرفعه مباشرة من جهازك" : "Upload an MP4/WebM file directly"}</span>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={projectVideoFileRef}
                        accept="video/*"
                        onChange={handleProjectVideoUpload}
                        className="hidden"
                      />

                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => projectVideoFileRef.current?.click()}
                          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                        >
                          <FiUploadCloud className="w-4 h-4" />
                          <span>{isRtl ? "رفع ملف فيديو من الجهاز" : "Upload Video File"}</span>
                        </button>
                        {editingProject.videoUrl && (
                          <button
                            type="button"
                            onClick={() => setEditingProject((prev: any) => ({ ...prev, videoUrl: "" }))}
                            className="px-3.5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer border border-red-500/20"
                          >
                            {isRtl ? "إزالة" : "Clear"}
                          </button>
                        )}
                      </div>

                      <div className="mt-2">
                        <label className="block text-[11px] text-neutral-500 mb-1">{isRtl ? "مسار الفيديو أو الرابط المباشر:" : "Direct Video Path / URL:"}</label>
                        <input
                          type="text"
                          value={editingProject.videoUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                          placeholder={isRtl ? "رابط الفيديو المرفوع يظهر هنا تلقائياً" : "Uploaded video URL appears here automatically"}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] text-neutral-300 font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Project Highlights / Core Features (Bullet Points) */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-semibold text-white flex items-center gap-2">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{isRtl ? "أبرز الميزات والخصائص التقنية (ميزة في كل سطر)" : "Key Highlights & Core Features (One feature per line)"}</span>
                    </label>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {isRtl ? "اكتب كل ميزة في سطر منفصل لتظهر كبطاقات ونقاط بارزة في صفحة المشروع." : "Type each highlight on a new line to display as key feature cards on the project page."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "الميزات (إنجليزي - سطر لكل نقطة)" : "Highlights (EN - one per line)"}</label>
                      <textarea
                        rows={3}
                        value={editingProject.featuresEn}
                        onChange={(e) => setEditingProject({ ...editingProject, featuresEn: e.target.value })}
                        placeholder={`Real-time WebSocket bidirectional messaging\nZero CLS layout architecture\nOptimized 60FPS micro-interactions`}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 font-mono resize-none leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "الميزات (عربي - سطر لكل نقطة)" : "Highlights (AR - one per line)"}</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={editingProject.featuresAr}
                        onChange={(e) => setEditingProject({ ...editingProject, featuresAr: e.target.value })}
                        placeholder={`اتصال لحظي ثنائي الاتجاه عبر WebSocket\nهندسة واجهات تمنع تذبذب العناصر\nتحريك سلس بمعدل 60 إطار بالثانية`}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 font-mono resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Structured Technical Sections & Code Architecture */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <FiCode className="w-4 h-4 text-cyan-400" />
                        <span>{isRtl ? "أقسام تفاصيل المشروع والمعمارية البرمجية" : "Project Technical Deep-Dive & Architecture Sections"}</span>
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {isRtl ? "أضف عناوين، فقرات شرح، وأكواد برمجية تظهر داخل صفحة تفاصيل المشروع." : "Add formatted headings, explanations, and code snippets to showcase in the project case study."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addProjectSection}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs transition-all cursor-pointer"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                      <span>{isRtl ? "إضافة قسم تفصيلي" : "Add Section"}</span>
                    </button>
                  </div>

                  {editingProject.sectionsEn?.map((sec: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#10121a] border border-white/10 flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-xs font-semibold text-cyan-300">
                          {isRtl ? `القسم التفصيلي #${idx + 1}` : `Technical Section #${idx + 1}`}
                        </span>
                        {editingProject.sectionsEn.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProjectSection(idx)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                            <span>{isRtl ? "حذف القسم" : "Remove"}</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "عنوان القسم (إنجليزي)" : "Section Heading (EN)"}</label>
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) => {
                              const newSecs = [...editingProject.sectionsEn];
                              newSecs[idx].heading = e.target.value;
                              setEditingProject({ ...editingProject, sectionsEn: newSecs });
                            }}
                            placeholder="e.g. 1. High-Performance WebSocket Architecture"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "عنوان القسم (عربي)" : "Section Heading (AR)"}</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={editingProject.sectionsAr?.[idx]?.heading || ""}
                            onChange={(e) => {
                              const newSecs = [...(editingProject.sectionsAr || [])];
                              if (!newSecs[idx]) newSecs[idx] = { heading: "", body: "", code: "" };
                              newSecs[idx].heading = e.target.value;
                              setEditingProject({ ...editingProject, sectionsAr: newSecs });
                            }}
                            placeholder="مثال: ١. معمارية اتصال WebSocket الفوري عالي الأداء"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "شرح تفاصيل القسم (إنجليزي)" : "Section Details (EN)"}</label>
                          <textarea
                            rows={3}
                            value={sec.body}
                            onChange={(e) => {
                              const newSecs = [...editingProject.sectionsEn];
                              newSecs[idx].body = e.target.value;
                              setEditingProject({ ...editingProject, sectionsEn: newSecs });
                            }}
                            placeholder="Technical description and engineering tradeoffs..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "شرح تفاصيل القسم (عربي)" : "Section Details (AR)"}</label>
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={editingProject.sectionsAr?.[idx]?.body || ""}
                            onChange={(e) => {
                              const newSecs = [...(editingProject.sectionsAr || [])];
                              if (!newSecs[idx]) newSecs[idx] = { heading: "", body: "", code: "" };
                              newSecs[idx].body = e.target.value;
                              setEditingProject({ ...editingProject, sectionsAr: newSecs });
                            }}
                            placeholder="شرح تقني للحلول البرمجية وتحديات البناء..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none font-light"
                          />
                        </div>
                      </div>

                      {/* Code Snippet for this section */}
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 flex items-center gap-1.5">
                          <FiCode className="w-3 h-3 text-cyan-400" />
                          <span>{isRtl ? "كود برمجي اختياري لهذا القسم (TS, JSX, SQL, Docker)" : "Optional Architecture Code Snippet (TS, JSX, SQL, Docker)"}</span>
                        </label>
                        <textarea
                          rows={3}
                          dir="ltr"
                          value={sec.code || ""}
                          onChange={(e) => {
                            const newSecs = [...editingProject.sectionsEn];
                            newSecs[idx].code = e.target.value;
                            setEditingProject({ ...editingProject, sectionsEn: newSecs });
                          }}
                          placeholder={`// Core logic or implementation snippet:\nexport const streamHandler = async (req, res) => { ... }`}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg transition-all cursor-pointer"
                  >
                    {isRtl ? "حفظ المشروع وتحديثه" : "Save Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== BLOG EDIT / ADD MODAL (Rich Sections & Code Blocks) ===================== */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            data-lenis-prevent="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              data-lenis-prevent="true"
              className="w-full max-w-5xl p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/15 shadow-2xl flex flex-col gap-6 max-h-[88vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {editingBlog.id ? (isRtl ? "تعديل تفاصيل المقال" : "Edit Blog Article") : (isRtl ? "كتابة مقال جديد" : "Write New Article")}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? "تحكم في أقسام المقال، الأكواد البرمجية، العناوين، والترقيم." : "Manage structured sections, headings, formatted code snippets, and explanations."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="flex flex-col gap-6 text-left" data-lenis-prevent="true">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.titleEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, titleEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={editingBlog.titleAr}
                      onChange={(e) => setEditingBlog({ ...editingBlog, titleAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الموجز (إنجليزي)" : "Excerpt (English)"}</label>
                    <textarea
                      rows={2}
                      value={editingBlog.excerptEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerptEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الموجز (عربي)" : "Excerpt (Arabic)"}</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={editingBlog.excerptAr}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerptAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                  <label className="text-xs text-neutral-200 font-medium">
                    {isRtl ? "صورة غلاف المقال (رفع ملف مباشر)" : "Cover Image (Direct File Upload)"}
                  </label>

                  {editingBlog.coverImage && (
                    <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-black border border-white/10">
                      <Image
                        src={editingBlog.coverImage}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    ref={blogCoverFileRef}
                    accept="image/*"
                    onChange={handleBlogCoverUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => blogCoverFileRef.current?.click()}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FiImage className="w-4 h-4" />
                      <span>{isRtl ? "اختر صورة الغلاف لرفعها" : "Choose Cover Image File"}</span>
                    </button>
                    {editingBlog.coverImage && (
                      <button
                        type="button"
                        onClick={() => setEditingBlog((prev: any) => ({ ...prev, coverImage: "" }))}
                        className="px-3 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer"
                      >
                        {isRtl ? "إزالة الصورة" : "Clear"}
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={editingBlog.coverImage}
                    onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                    placeholder="Cover image url"
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-neutral-400 focus:outline-none"
                  />
                </div>

                {/* Categories & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "التصنيف (إنجليزي)" : "Category (English)"}</label>
                    <input
                      type="text"
                      value={editingBlog.categoryEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, categoryEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "التصنيف (عربي)" : "Category (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={editingBlog.categoryAr}
                      onChange={(e) => setEditingBlog({ ...editingBlog, categoryAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Tags</label>
                    <input
                      type="text"
                      value={editingBlog.tags}
                      onChange={(e) => setEditingBlog({ ...editingBlog, tags: e.target.value })}
                      placeholder="React, Next.js, Performance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Rich Sections Builder (Headings, Paragraphs, Code Blocks) */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white flex items-center gap-2">
                        <FiCode className="w-4 h-4 text-cyan-400" />
                        <span>{isRtl ? "أقسام المقال، الفقرات والأكواد البرمجية" : "Article Sections, Paragraphs & Code Blocks"}</span>
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {isRtl ? "يمكنك إضافة عناوين وفقرات وأكواد كود برمجي منسقة تظهر داخل المقال." : "Add formatted headings, explanatory text, and code snippets."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addBlogSection}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs transition-all cursor-pointer"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                      <span>{isRtl ? "إضافة قسم" : "Add Section"}</span>
                    </button>
                  </div>

                  {editingBlog.sectionsEn?.map((sec: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#10121a] border border-white/10 flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-xs font-semibold text-cyan-300">
                          {isRtl ? `القسم #${idx + 1}` : `Section #${idx + 1}`}
                        </span>
                        {editingBlog.sectionsEn.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBlogSection(idx)}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                            <span>{isRtl ? "حذف القسم" : "Remove"}</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "عنوان القسم (إنجليزي)" : "Section Heading (EN)"}</label>
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) => {
                              const newSecs = [...editingBlog.sectionsEn];
                              newSecs[idx].heading = e.target.value;
                              setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                            }}
                            placeholder="e.g. 1. Optimizing React Re-renders"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "عنوان القسم (عربي)" : "Section Heading (AR)"}</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={editingBlog.sectionsAr?.[idx]?.heading || ""}
                            onChange={(e) => {
                              const newSecs = [...(editingBlog.sectionsAr || [])];
                              if (!newSecs[idx]) newSecs[idx] = { heading: "", body: "", code: "" };
                              newSecs[idx].heading = e.target.value;
                              setEditingBlog({ ...editingBlog, sectionsAr: newSecs });
                            }}
                            placeholder="مثال: ١. تحسين عمليات إعادة الرسم في React"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "نص الشرح (إنجليزي)" : "Section Paragraph (EN)"}</label>
                          <textarea
                            rows={3}
                            value={sec.body}
                            onChange={(e) => {
                              const newSecs = [...editingBlog.sectionsEn];
                              newSecs[idx].body = e.target.value;
                              setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                            }}
                            placeholder="Detailed technical explanation..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">{isRtl ? "نص الشرح (عربي)" : "Section Paragraph (AR)"}</label>
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={editingBlog.sectionsAr?.[idx]?.body || ""}
                            onChange={(e) => {
                              const newSecs = [...(editingBlog.sectionsAr || [])];
                              if (!newSecs[idx]) newSecs[idx] = { heading: "", body: "", code: "" };
                              newSecs[idx].body = e.target.value;
                              setEditingBlog({ ...editingBlog, sectionsAr: newSecs });
                            }}
                            placeholder="شرح تقني مفصل بالعربية..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none font-light"
                          />
                        </div>
                      </div>

                      {/* Code Block Snippet */}
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1 flex items-center gap-1.5">
                          <FiCode className="w-3 h-3 text-cyan-400" />
                          <span>{isRtl ? "كود برمجي اختياري لهذا القسم (JSX, TS, CSS)" : "Optional Code Snippet for this section (JSX, TS, CSS)"}</span>
                        </label>
                        <textarea
                          rows={3}
                          dir="ltr"
                          value={sec.code || ""}
                          onChange={(e) => {
                            const newSecs = [...editingBlog.sectionsEn];
                            newSecs[idx].code = e.target.value;
                            setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                          }}
                          placeholder={`// Example Code Snippet:\nconst memoizedValue = useMemo(() => computeHeavyValue(a, b), [a, b]);`}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md cursor-pointer"
                  >
                    {isRtl ? "نشر المقال" : "Publish Article"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
