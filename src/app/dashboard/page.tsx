"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/axios";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import TechIcon, { AVAILABLE_TECH_ICONS, getTechIconInfo } from "@/components/ui/TechIcon";
import { directSupabaseUpload } from "@/lib/supabase-client";
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
  FiLayers,
  FiSearch,
  FiCheck,
  FiX,
  FiTag,
} from "react-icons/fi";

export default function DashboardPage() {
  const { isRtl } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "skills" | "experiences" | "projects" | "blogs" | "footer" | "messages"
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
    heroTitleEn: "Developer &",
    heroTitleAr: "مطور",
    heroQuoteEn: "I'm trying to make something. Not just for you. Maybe not even for me.",
    heroQuoteAr: "أحاول أن أصنع شيئاً. ليس فقط من أجلك. وربما ليس حتى من أجلي.",
    heroImage: "/me.png",
    aboutBioEn: "",
    aboutBioAr: "",
    githubUrl: "https://github.com/mohamedhabib102",
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
  const [skills, setSkills] = useState<any[]>([]);
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

  // Skills Modal State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillIconSearch, setSkillIconSearch] = useState("");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("All");
  const [customIconInput, setCustomIconInput] = useState("");
  const [editingSkill, setEditingSkill] = useState<any>({
    id: "",
    titleEn: "",
    titleAr: "",
    descEn: "",
    descAr: "",
    icons: ["SiHtml5", "SiCss", "SiJavascript", "SiReact"],
    badges: "Responsive Design, Clean Code",
    order: 1,
  });

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>({
    id: "",
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    videoUrl: "",
    liveUrl: "",
    githubUrl: "",
    githubPrivate: false,
    tags: "",
    featured: true,
    order: 0,
    featuresEn: [""],
    featuresAr: [""],
    sectionsEn: [{ heading: "", body: "", code: "" }],
    sectionsAr: [{ heading: "", body: "", code: "" }],
  });

  // Blog Modal State
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
        setSkills(res.data.data.skills || []);
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
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Fast Direct Supabase Upload Handler (Bypasses Vercel 4.5MB Serverless Limit)
  const uploadFile = async (file: File): Promise<string | null> => {
    setUploadingStatus(isRtl ? "جاري رفع الملف سحابياً إلى Supabase Storage..." : "Uploading directly to Supabase Storage...");
    try {
      // 1. First attempt: Direct client upload to Supabase (Supports large files & fast)
      const directResult = await directSupabaseUpload(file);
      if (directResult.success && directResult.url) {
        triggerToast(isRtl ? "تم الرفع والتخزين في Supabase بنجاح!" : "Uploaded to Supabase Storage!");
        return directResult.url;
      }

      console.warn("[Upload] Direct upload notice, trying server route fallback...", directResult.error);

      // 2. Fallback attempt via /api/upload
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
        throw new Error(res?.error || directResult.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      triggerToast(isRtl ? "فشل رفع الملف إلى Supabase" : "Failed to upload file");
    } finally {
      setUploadingStatus(null);
    }
    return null;
  };

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

  const [isSaving, setIsSaving] = useState(false);

  // 2. Save Site Config
  const handleSaveSiteConfig = async () => {
    setIsSaving(true);
    try {
      await apiClient.post("/api/admin/site-config", siteConfig);
      triggerToast(isRtl ? "تم حفظ الإعدادات بنجاح!" : "Configuration saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ الإعدادات" : "Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Save Experience
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.post("/api/admin/experiences", editingExp);
      setIsExpModalOpen(false);
      triggerToast(isRtl ? "تم حفظ الخبرة بنجاح!" : "Experience saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ الخبرة" : "Failed to save experience");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذه الخبرة؟" : "Are you sure you want to delete this experience?")) return;
    try {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      await apiClient.delete(`/api/admin/experiences?id=${id}`);
      triggerToast(isRtl ? "تم حذف الخبرة بنجاح!" : "Experience deleted successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف الخبرة" : "Failed to delete experience");
      loadDashboardData();
    }
  };

  // 4. Save Skill
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...editingSkill,
        icons: Array.isArray(editingSkill.icons) ? editingSkill.icons : (editingSkill.icons || "").split(",").map((s: string) => s.trim()).filter(Boolean),
        badges: typeof editingSkill.badges === "string" ? editingSkill.badges.split(",").map((s: string) => s.trim()).filter(Boolean) : editingSkill.badges,
      };
      await apiClient.post("/api/admin/skills", payload);
      setIsSkillModalOpen(false);
      triggerToast(isRtl ? "تم حفظ المهارة بنجاح!" : "Skill group saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ المهارة" : "Failed to save skill group");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذه المجموعة المهارية؟" : "Are you sure you want to delete this skill group?")) return;
    try {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      await apiClient.delete(`/api/admin/skills?id=${id}`);
      triggerToast(isRtl ? "تم حذف المهارة بنجاح!" : "Skill group deleted successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف المهارة" : "Failed to delete skill group");
      loadDashboardData();
    }
  };

  const toggleSkillIcon = (iconId: string) => {
    setEditingSkill((prev: any) => {
      const currentIcons: string[] = Array.isArray(prev.icons) ? prev.icons : [];
      if (currentIcons.includes(iconId)) {
        return { ...prev, icons: currentIcons.filter((i) => i !== iconId) };
      } else {
        return { ...prev, icons: [...currentIcons, iconId] };
      }
    });
  };

  const addCustomIcon = () => {
    if (!customIconInput.trim()) return;
    setEditingSkill((prev: any) => {
      const currentIcons: string[] = Array.isArray(prev.icons) ? prev.icons : [];
      if (!currentIcons.includes(customIconInput.trim())) {
        return { ...prev, icons: [...currentIcons, customIconInput.trim()] };
      }
      return prev;
    });
    setCustomIconInput("");
  };

  // Feature Bullet Helper Functions
  const addFeatureEn = () => {
    setEditingProject((prev: any) => ({
      ...prev,
      featuresEn: [...(Array.isArray(prev.featuresEn) ? prev.featuresEn : []), ""],
    }));
  };

  const removeFeatureEn = (index: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      featuresEn: (prev.featuresEn || []).filter((_: any, i: number) => i !== index),
    }));
  };

  const updateFeatureEn = (index: number, val: string) => {
    setEditingProject((prev: any) => {
      const arr = [...(prev.featuresEn || [])];
      arr[index] = val;
      return { ...prev, featuresEn: arr };
    });
  };

  const addFeatureAr = () => {
    setEditingProject((prev: any) => ({
      ...prev,
      featuresAr: [...(Array.isArray(prev.featuresAr) ? prev.featuresAr : []), ""],
    }));
  };

  const removeFeatureAr = (index: number) => {
    setEditingProject((prev: any) => ({
      ...prev,
      featuresAr: (prev.featuresAr || []).filter((_: any, i: number) => i !== index),
    }));
  };

  const updateFeatureAr = (index: number, val: string) => {
    setEditingProject((prev: any) => {
      const arr = [...(prev.featuresAr || [])];
      arr[index] = val;
      return { ...prev, featuresAr: arr };
    });
  };

  // 5. Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const cleanedProject = {
        ...editingProject,
        featuresEn: (Array.isArray(editingProject.featuresEn) ? editingProject.featuresEn : [])
          .map((f: string) => f.trim())
          .filter(Boolean),
        featuresAr: (Array.isArray(editingProject.featuresAr) ? editingProject.featuresAr : [])
          .map((f: string) => f.trim())
          .filter(Boolean),
      };
      await apiClient.post("/api/admin/projects", cleanedProject);
      setIsProjectModalOpen(false);
      triggerToast(isRtl ? "تم حفظ المشروع بنجاح!" : "Project saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ المشروع" : "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المشروع؟" : "Are you sure you want to delete this project?")) return;
    try {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      await apiClient.delete(`/api/admin/projects?id=${id}`);
      triggerToast(isRtl ? "تم حذف المشروع بنجاح!" : "Project deleted successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف المشروع" : "Failed to delete project");
      loadDashboardData();
    }
  };

  // 6. Save Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.post("/api/admin/blogs", editingBlog);
      setIsBlogModalOpen(false);
      triggerToast(isRtl ? "تم حفظ المقال بنجاح!" : "Blog post saved successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حفظ المقال" : "Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المقال؟" : "Are you sure you want to delete this blog post?")) return;
    try {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      await apiClient.delete(`/api/admin/blogs?id=${id}`);
      triggerToast(isRtl ? "تم حذف المقال بنجاح!" : "Blog post deleted successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف المقال" : "Failed to delete blog post");
      loadDashboardData();
    }
  };

  // 7. Delete Client Message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذه الرسالة؟" : "Are you sure you want to delete this message?")) return;
    try {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      await apiClient.delete(`/api/admin/messages?id=${id}`);
      triggerToast(isRtl ? "تم حذف الرسالة بنجاح!" : "Message deleted successfully!");
      loadDashboardData();
    } catch (e) {
      triggerToast(isRtl ? "فشل حذف الرسالة" : "Failed to delete message");
      loadDashboardData();
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

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-[#12141c] border border-white/10 shadow-2xl flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
            <FiLock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
            {isRtl ? "لوحة تحكم الموقع" : "Admin Dashboard"}
          </h1>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            {isRtl
              ? "يرجى إدخال كلمة المرور السرية للإدارة والتعديل على قاعدة البيانات مباشرة."
              : "Enter your admin security passcode to manage all portfolio database records."}
          </p>

          <form onSubmit={handleDirectLogin} className="w-full flex flex-col gap-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError("");
                }}
                placeholder={isRtl ? "أدخل كلمة المرور..." : "Enter admin password..."}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-blue-500 transition-colors text-center font-mono tracking-widest"
              />
              {authError && <p className="text-xs text-red-400 mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg hover:shadow-blue-600/25 cursor-pointer"
            >
              {isRtl ? "تسجيل الدخول" : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-between items-center text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isRtl ? "← العودة للرئيسية" : "← Back to Portfolio"}
            </Link>
            <LanguageToggle />
          </div>
        </motion.div>
      </main>
    );
  }

  // Filtered Tech Icons for the Skill Icon Picker
  const filteredTechIcons = AVAILABLE_TECH_ICONS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(skillIconSearch.toLowerCase()) ||
                          item.id.toLowerCase().includes(skillIconSearch.toLowerCase());
    const matchesCat = skillCategoryFilter === "All" || item.category === skillCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const iconCategories = ["All", "Frontend", "Styling", "AI & Productivity", "DevOps & Tools", "Testing & Performance", "Backend"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-200 selection:bg-blue-600 selection:text-white">
      {/* Top Admin Navigation */}
      <header className="w-full border-b border-white/10 bg-[#0d0e15]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              H
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Habib Portfolio Dashboard</h2>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Supabase Connected
              </span>
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-3">
            {saveStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30"
              >
                <FiCheckCircle className="w-4 h-4" />
                <span>{saveStatus}</span>
              </motion.div>
            )}

            {uploadingStatus && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30 animate-pulse">
                <FiUploadCloud className="w-4 h-4 animate-bounce" />
                <span>{uploadingStatus}</span>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 transition-colors border border-white/10"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              <span>{isRtl ? "معاينة الموقع" : "Live View"}</span>
            </Link>

            <LanguageToggle />

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
              title="Logout"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
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
            onClick={() => setActiveTab("skills")}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "skills" ? "bg-white text-black shadow-lg scale-[1.02]" : "bg-white/5 text-neutral-400 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <FiLayers className="w-4 h-4" />
              <span>{isRtl ? "المهارات والتقنيات" : "Skills & Tech Stack"}</span>
            </div>
            <span className="text-[11px] opacity-70">({skills.length})</span>
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

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: HERO CONFIG */}
          {activeTab === "hero" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "قسم الهيرو والصورة الشخصية" : "Hero Section & Profile"}</h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل النصوص الرئيسية والصورة الشخصية التي تظهر في الصفحة الرئيسية."
                    : "Update your main hero titles, quotes, and profile picture."}
                </p>
              </div>

              {/* Hero Image Section */}
              <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 shrink-0">
                  {siteConfig.heroImage ? (
                    <Image
                      src={siteConfig.heroImage}
                      alt="Hero Profile"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      <FiImage className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 flex-1 text-left">
                  <div>
                    <h4 className="text-sm font-medium text-white">{isRtl ? "صورة الهيرو الشخصية" : "Hero Profile Picture"}</h4>
                    <p className="text-xs text-neutral-400">
                      {isRtl
                        ? "يمكنك رفع صورة جديدة مباشرة ليتم تخزينها في Supabase Storage."
                        : "Upload a high-res image stored directly on Supabase Storage."}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={heroFileRef}
                      onChange={handleHeroImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => heroFileRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer border border-white/10"
                    >
                      <FiUploadCloud className="w-4 h-4" />
                      <span>{isRtl ? "رفع صورة جديدة" : "Upload New Image"}</span>
                    </button>
                    <input
                      type="text"
                      value={siteConfig.heroImage}
                      onChange={(e) => setSiteConfig({ ...siteConfig, heroImage: e.target.value })}
                      placeholder="/me.png or Supabase URL"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Titles & Quotes Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "العنوان الأول (إنجليزي)" : "Hero Title 1 (English)"}</label>
                  <input
                    type="text"
                    value={siteConfig.heroTitleEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "العنوان الأول (عربي)" : "Hero Title 1 (Arabic)"}</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={siteConfig.heroTitleAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroTitleAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "الاقتباس الملهم (إنجليزي)" : "Hero Quote (English)"}</label>
                  <textarea
                    rows={3}
                    value={siteConfig.heroQuoteEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroQuoteEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "الاقتباس الملهم (عربي)" : "Hero Quote (Arabic)"}</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={siteConfig.heroQuoteAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, heroQuoteAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  {isSaving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave className="w-4 h-4" />
                  )}
                  <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ التغييرات" : "Save Changes")}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ABOUT BIO */}
          {activeTab === "about" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "السيرة الذاتية (About Me Bio)" : "About Me Biography"}</h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل محتوى صفحة /about باللغتين العربية والإنجليزية."
                    : "Edit your detailed biography displayed on the About Me page."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "النص التعريفي (إنجليزي)" : "About Bio (English)"}</label>
                  <textarea
                    rows={12}
                    value={siteConfig.aboutBioEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, aboutBioEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "النص التعريفي (عربي)" : "About Bio (Arabic)"}</label>
                  <textarea
                    rows={12}
                    dir="rtl"
                    value={siteConfig.aboutBioAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, aboutBioAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  {isSaving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave className="w-4 h-4" />
                  )}
                  <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ السيرة الذاتية" : "Save Changes")}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SKILLS MANAGEMENT (المهارات والتقنيات) */}
          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {isRtl ? "إدارة المهارات والتقنيات" : "Skills & Tech Stack Management"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "إضافة وتعديل وحذف مجموعات المهارات واختيار أيقونات التقنيات في قاعدة البيانات مباشرة."
                      : "Add, edit, or delete skill groups and choose tech stack icons directly in the database."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingSkill({
                      id: "",
                      titleEn: "",
                      titleAr: "",
                      descEn: "",
                      descAr: "",
                      icons: ["SiReact", "SiNextdotjs", "SiTypescript", "SiTailwindcss"],
                      badges: "Responsive Design, Clean Code",
                      order: skills.length + 1,
                    });
                    setIsSkillModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>{isRtl ? "إضافة مجموعة مهارات جديدة" : "Add Skill Group"}</span>
                </button>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col justify-between gap-4 shadow-xl group hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Tech Icons Preview Row */}
                      {skill.icons && skill.icons.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          {skill.icons.map((iconId: string, idx: number) => {
                            const info = getTechIconInfo(iconId);
                            return (
                              <div
                                key={idx}
                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                                title={info.name}
                              >
                                <TechIcon nameOrId={iconId} className="w-4 h-4" />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {isRtl ? skill.titleAr || skill.titleEn : skill.titleEn}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                          {isRtl ? skill.descAr || skill.descEn : skill.descEn}
                        </p>
                      </div>

                      {/* Badges */}
                      {skill.badges && skill.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {(Array.isArray(skill.badges) ? skill.badges : (skill.badges || "").split(",")).map((b: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                              {b.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-neutral-500">
                      <span>Order: #{skill.order ?? 0}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingSkill({
                              ...skill,
                              badges: Array.isArray(skill.badges) ? skill.badges.join(", ") : skill.badges,
                              icons: Array.isArray(skill.icons) ? skill.icons : [],
                            });
                            setIsSkillModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
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

          {/* TAB 4: EXPERIENCES (الخبرات العملية) */}
          {activeTab === "experiences" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
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

          {/* TAB 5: PROJECTS */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "إدارة المشاريع" : "Projects Showcase"}</h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "إضافة وتعديل وحذف المشاريع ورفع الفيديوهات وروابط المعاينة."
                      : "Preview, edit, or delete projects and upload videos/links."}
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
                      videoUrl: "",
                      liveUrl: "",
                      githubUrl: "",
                      githubPrivate: false,
                      tags: "",
                      featured: true,
                      order: projects.length + 1,
                      featuresEn: [""],
                      featuresAr: [""],
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

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col justify-between gap-4 shadow-xl"
                  >
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
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-lg font-medium text-white">
                          {isRtl ? proj.titleAr : proj.titleEn}
                        </h4>
                        {proj.githubPrivate && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                            <FiLock className="w-3 h-3" />
                            <span>{isRtl ? "مستودع خاص (عميل)" : "Private Repo"}</span>
                          </span>
                        )}
                      </div>
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
                              githubPrivate: proj.githubPrivate ?? false,
                              tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : (proj.tags || ""),
                              featuresEn: Array.isArray(proj.featuresEn) && proj.featuresEn.length > 0 ? proj.featuresEn : [""],
                              featuresAr: Array.isArray(proj.featuresAr) && proj.featuresAr.length > 0 ? proj.featuresAr : [""],
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

          {/* TAB 6: BLOGS */}
          {activeTab === "blogs" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "إدارة المدونة والمقالات" : "Articles & Blogs"}</h3>
                  <p className="text-xs text-neutral-400">
                    {isRtl
                      ? "إضافة وتعديل وحذف المقالات البرمجية مع أكواد ومقتطفات تفاعلية."
                      : "Add, edit, or delete articles and technical tutorials."}
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
                      categoryEn: "Next.js",
                      categoryAr: "نكست جي إس",
                      tags: "Next.js, TypeScript",
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
                  <span>{isRtl ? "إضافة مقال جديد" : "Add Article"}</span>
                </button>
              </div>

              {/* Blogs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-[#12141c] border border-white/10 flex flex-col justify-between gap-4 shadow-xl"
                  >
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10">
                      {b.coverImage ? (
                        <Image
                          src={b.coverImage}
                          alt={b.titleEn || "Blog cover"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          {isRtl ? "لا توجد صورة غلاف" : "No cover image"}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                        {isRtl ? b.categoryAr : b.categoryEn}
                      </span>
                      <h4 className="text-lg font-medium text-white mt-2 mb-1">
                        {isRtl ? b.titleAr : b.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {isRtl ? b.excerptAr : b.excerptEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[11px] text-neutral-500">{b.publishedAt}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingBlog({
                              ...b,
                              tags: Array.isArray(b.tags) ? b.tags.join(", ") : (b.tags || ""),
                              introEn: b.contentEn?.intro || "",
                              introAr: b.contentAr?.intro || "",
                              conclusionEn: b.contentEn?.conclusion || "",
                              conclusionAr: b.contentAr?.conclusion || "",
                              sectionsEn: b.contentEn?.sections && b.contentEn.sections.length > 0 
                                ? b.contentEn.sections 
                                : [{ heading: "", body: "", code: "" }],
                              sectionsAr: b.contentAr?.sections && b.contentAr.sections.length > 0 
                                ? b.contentAr.sections 
                                : [{ heading: "", body: "", code: "" }],
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

          {/* TAB 7: FOOTER & SOCIALS */}
          {activeTab === "footer" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "الفوتر وروابط التواصل الاجتماعي" : "Footer & Social Links"}</h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "تعديل عناوين الفوتر وروابط حساباتك على GitHub و LinkedIn ورقم WhatsApp."
                    : "Update your social media links and footer banner text."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">GitHub URL</label>
                  <input
                    type="url"
                    value={siteConfig.githubUrl}
                    onChange={(e) => setSiteConfig({ ...siteConfig, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">LinkedIn URL</label>
                  <input
                    type="url"
                    value={siteConfig.linkedinUrl}
                    onChange={(e) => setSiteConfig({ ...siteConfig, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2 sm:col-span-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "رقم الواتساب (مع كود الدولة دون علامة +)" : "WhatsApp Number (with country code, no +)"}</label>
                  <input
                    type="text"
                    value={siteConfig.whatsappNumber}
                    onChange={(e) => setSiteConfig({ ...siteConfig, whatsappNumber: e.target.value })}
                    placeholder="201027227796"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "عنوان الفوتر الرئيسي (إنجليزي)" : "Footer Headline (English)"}</label>
                  <input
                    type="text"
                    value={siteConfig.footerHeadlineEn}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerHeadlineEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-medium text-neutral-400">{isRtl ? "عنوان الفوتر الرئيسي (عربي)" : "Footer Headline (Arabic)"}</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={siteConfig.footerHeadlineAr}
                    onChange={(e) => setSiteConfig({ ...siteConfig, footerHeadlineAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSaveSiteConfig}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs transition-all shadow-md cursor-pointer"
                >
                  {isSaving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSave className="w-4 h-4" />
                  )}
                  <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ التغييرات" : "Save Changes")}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 8: MESSAGES */}
          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-1">{isRtl ? "رسائل واستفسارات العملاء" : "Client Messages"}</h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "جميع الرسائل المرسلة من زوار الموقع عبر نموذج التواصل."
                    : "Messages submitted via the contact form on your portfolio."}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#12141c] border border-white/10 text-center text-xs text-neutral-400">
                    {isRtl ? "لا توجد رسائل جديدة." : "No messages received yet."}
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col gap-3 shadow-lg group hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{m.name || "Anonymous Client"}</span>
                          <span className="text-xs text-blue-400">({m.email})</span>
                          {m.phone && (
                            <span className="text-xs text-neutral-400 font-mono">| {m.phone}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-neutral-500">{new Date(m.createdAt).toLocaleString()}</span>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Message"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">{m.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* ===================== SKILL ADD / EDIT MODAL (With Interactive Icon Picker) ===================== */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/15 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {editingSkill.id ? (isRtl ? "تعديل مجموعة المهارات" : "Edit Skill Group") : (isRtl ? "إضافة مجموعة مهارات جديدة" : "Add New Skill Group")}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? "اختر الأيقونات التقنية واكتب العناوين والشارات." : "Select tech stack icons, enter descriptions and badges."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="flex flex-col gap-5 text-left">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المجموعة (إنجليزي)" : "Group Title (English)"}</label>
                    <input
                      type="text"
                      required
                      value={editingSkill.titleEn}
                      onChange={(e) => setEditingSkill({ ...editingSkill, titleEn: e.target.value })}
                      placeholder="Front-End Core & Frameworks"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المجموعة (عربي)" : "Group Title (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={editingSkill.titleAr}
                      onChange={(e) => setEditingSkill({ ...editingSkill, titleAr: e.target.value })}
                      placeholder="تطوير واجهات المستخدم وأطر العمل"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                    <textarea
                      rows={3}
                      value={editingSkill.descEn}
                      onChange={(e) => setEditingSkill({ ...editingSkill, descEn: e.target.value })}
                      placeholder="Building fast, reactive, and user-friendly web interfaces..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={editingSkill.descAr}
                      onChange={(e) => setEditingSkill({ ...editingSkill, descAr: e.target.value })}
                      placeholder="بناء واجهات ويب تفاعلية وسريعة وفائقة الاستجابة..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Selected Icons Area */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-white flex items-center gap-2">
                      <FiLayers className="w-4 h-4 text-blue-400" />
                      <span>{isRtl ? "الأيقونات المختارة لهذه المجموعة" : "Selected Tech Icons"} ({editingSkill.icons?.length || 0})</span>
                    </label>
                    <span className="text-[11px] text-neutral-500">
                      {isRtl ? "انقر على أيقونة لحذفها" : "Click icon to remove"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 min-h-[44px] p-2 rounded-xl bg-black/40 border border-white/5">
                    {editingSkill.icons && editingSkill.icons.length > 0 ? (
                      editingSkill.icons.map((iconId: string, idx: number) => {
                        const info = getTechIconInfo(iconId);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleSkillIcon(iconId)}
                            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/15 hover:border-red-500/40 transition-all cursor-pointer text-xs text-white"
                            title="Click to remove"
                          >
                            <TechIcon nameOrId={iconId} className="w-4 h-4" />
                            <span>{info.name}</span>
                            <FiX className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:text-red-400" />
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-xs text-neutral-500 px-2">
                        {isRtl ? "لم يتم اختيار أي أيقونة بعد. اختر من القائمة بالأسفل." : "No icons selected yet. Pick from the grid below."}
                      </span>
                    )}
                  </div>
                </div>

                {/* Searchable Tech Icon Picker */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <label className="text-xs font-medium text-white flex items-center gap-2">
                      <FiSearch className="w-4 h-4 text-blue-400" />
                      <span>{isRtl ? "مكتبة أيقونات التقنيات والبرمجة" : "Choose Icons from Library"}</span>
                    </label>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        value={skillIconSearch}
                        onChange={(e) => setSkillIconSearch(e.target.value)}
                        placeholder={isRtl ? "بحث عن تقنية (React, Tailwind...)" : "Search tech (React, Next...)"}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 w-full sm:w-48"
                      />
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {iconCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSkillCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                          skillCategoryFilter === cat
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white/5 hover:bg-white/10 text-neutral-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Visual Grid of Tech Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto p-2 bg-black/50 rounded-xl border border-white/5">
                    {filteredTechIcons.map((item) => {
                      const isSelected = editingSkill.icons?.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleSkillIcon(item.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-blue-600/20 border-blue-500 text-white font-medium scale-[1.02]"
                              : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-300"
                          }`}
                        >
                          <TechIcon nameOrId={item.id} className="w-4 h-4 shrink-0" />
                          <span className="truncate flex-1">{item.name}</span>
                          {isSelected && <FiCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Tech Icon write-in */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <input
                      type="text"
                      value={customIconInput}
                      onChange={(e) => setCustomIconInput(e.target.value)}
                      placeholder={isRtl ? "أو اكتب اسم تقنية مخصصة..." : "Or type custom tech name..."}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addCustomIcon}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium cursor-pointer"
                    >
                      {isRtl ? "إضافة" : "Add"}
                    </button>
                  </div>
                </div>

                {/* Badges & Order */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الشارات والوسوم (مفصولة بفواصل)" : "Badges & Tags (comma separated)"}</label>
                    <input
                      type="text"
                      value={editingSkill.badges}
                      onChange={(e) => setEditingSkill({ ...editingSkill, badges: e.target.value })}
                      placeholder="Responsive Design, Mobile-First, Dark Mode"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الترتيب (Order)" : "Order Number"}</label>
                    <input
                      type="number"
                      value={editingSkill.order || 1}
                      onChange={(e) => setEditingSkill({ ...editingSkill, order: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isSaving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ المهارة" : "Save Skill Group")}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== EXPERIENCE ADD / EDIT MODAL ===================== */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-[#14161f] border border-white/15 shadow-2xl flex flex-col gap-4 max-h-[88vh] overflow-y-auto overscroll-contain"
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
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "تفاصيل الخبرة والمسؤوليات (إنجليزي)" : "Responsibilities (English)"}</label>
                  <textarea
                    rows={3}
                    value={editingExp.descEn}
                    onChange={(e) => setEditingExp({ ...editingExp, descEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "تفاصيل الخبرة والمسؤوليات (عربي)" : "Responsibilities (Arabic)"}</label>
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
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isSaving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ الخبرة" : "Save Experience")}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== PROJECT EDIT / ADD MODAL ===================== */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/15 shadow-2xl flex flex-col gap-6 max-h-[88vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {editingProject.id ? (isRtl ? "تعديل تفاصيل المشروع" : "Edit Project Details") : (isRtl ? "إضافة مشروع جديد" : "Add New Project")}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? "أدخل بيانات المشروع والفيديو وروابط GitHub و Live Demo." : "Enter project metadata, video preview, and links."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex flex-col gap-4 text-left">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المشروع (إنجليزي)" : "Project Title (English)"}</label>
                    <input
                      type="text"
                      required
                      value={editingProject.titleEn}
                      onChange={(e) => setEditingProject({ ...editingProject, titleEn: e.target.value })}
                      placeholder="Learnlogicify Landing Page"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المشروع (عربي)" : "Project Title (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={editingProject.titleAr}
                      onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                      placeholder="صفحة هبوط Learnlogicify"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Video Upload & URL */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-white flex items-center gap-2">
                      <FiVideo className="w-4 h-4 text-blue-400" />
                      <span>{isRtl ? "فيديو استعراض المشروع" : "Project Preview Video"}</span>
                    </label>
                    <input
                      type="file"
                      ref={projectVideoFileRef}
                      onChange={handleProjectVideoUpload}
                      accept="video/mp4,video/webm"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => projectVideoFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer border border-white/10"
                    >
                      {isRtl ? "رفع فيديو من جهازك" : "Upload MP4 File"}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={editingProject.videoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    placeholder="/test.mp4 or Supabase video URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                    <textarea
                      rows={3}
                      value={editingProject.descriptionEn}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={editingProject.descriptionAr}
                      onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* URLs, GitHub Private & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Live URL</label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      {editingProject.githubPrivate
                        ? (isRtl ? "GitHub (مستودع خاص)" : "GitHub (Private Repo)")
                        : "GitHub Repo URL"}
                    </label>
                    <input
                      type="url"
                      disabled={editingProject.githubPrivate}
                      value={editingProject.githubUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      placeholder={editingProject.githubPrivate ? (isRtl ? "المستودع محمي وخاص" : "Repository is private") : "https://github.com/..."}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "التقنيات المستخدمة (مفصولة بفواصل)" : "Tags / Tech (comma separated)"}</label>
                    <input
                      type="text"
                      value={editingProject.tags}
                      onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                      placeholder="Next.js, Tailwind CSS, Framer Motion"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Private GitHub Repo Toggle */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border ${editingProject.githubPrivate ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-white/5 border-white/10 text-neutral-400"}`}>
                      <FiLock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-white">
                        {isRtl
                          ? "مستودع GitHub خاص (مشروع عميل / شركة)"
                          : "Private GitHub Repository (Client / Company NDA)"}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                        {isRtl
                          ? "تفعيل هذا الخيار يُظهر شارة توضح أن الكود خاص وغير متاح للعامة بناءً على طلب العميل أو الشركة."
                          : "Enable this to mark the project as private/confidential. Displays a private repo badge on project details."}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={editingProject.githubPrivate || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          githubPrivate: e.target.checked,
                          githubUrl: e.target.checked ? "" : editingProject.githubUrl,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* Key Highlights & Core Features (أبرز الميزات والخصائص التقنية) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <FiLayers className="w-4 h-4 text-blue-400" />
                        <span>
                          {isRtl
                            ? "أبرز الميزات والخصائص التقنية (Key Highlights & Features)"
                            : "Key Highlights & Core Features"}
                        </span>
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {isRtl
                          ? "أضف النقاط والميزات البارزة التي تظهر في بطاقات تفاصيل المشروع في صفحة المشروع."
                          : "Add bullet points showcasing technical achievements, architecture, and feature highlights."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                    {/* English Features List */}
                    <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                      <div className="flex items-center justify-between pb-1 border-b border-white/5">
                        <span className="text-xs font-medium text-blue-400">Features & Highlights (English)</span>
                        <button
                          type="button"
                          onClick={addFeatureEn}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      {(!editingProject.featuresEn || editingProject.featuresEn.length === 0) ? (
                        <p className="text-[11px] text-neutral-500 py-2 text-center italic">No English highlights added yet. Click &quot;Add Bullet&quot;.</p>
                      ) : (
                        editingProject.featuresEn.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => updateFeatureEn(idx, e.target.value)}
                              placeholder={`Feature #${idx + 1} (e.g. Next.js App Router with 60FPS animations)`}
                              className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeFeatureEn(idx)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                              title="Delete"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Arabic Features List */}
                    <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/5" dir="rtl">
                      <div className="flex items-center justify-between pb-1 border-b border-white/5">
                        <span className="text-xs font-medium text-blue-400">أبرز الميزات والخصائص (عربي)</span>
                        <button
                          type="button"
                          onClick={addFeatureAr}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                          <span>إضافة ميزة</span>
                        </button>
                      </div>

                      {(!editingProject.featuresAr || editingProject.featuresAr.length === 0) ? (
                        <p className="text-[11px] text-neutral-500 py-2 text-center italic">لا توجد ميزات عربية مضافة بعد. اضغط &quot;إضافة ميزة&quot;.</p>
                      ) : (
                        editingProject.featuresAr.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <input
                              type="text"
                              dir="rtl"
                              value={feat}
                              onChange={(e) => updateFeatureAr(idx, e.target.value)}
                              placeholder={`الميزة رقم ${idx + 1} (مثال: تسريع استجابة وتحميل الصفحات)`}
                              className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeFeatureAr(idx)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                              title="حذف"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isSaving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ المشروع" : "Save Project")}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== BLOG EDIT / ADD MODAL ===================== */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/15 shadow-2xl flex flex-col gap-6 max-h-[88vh] overflow-y-auto overscroll-contain"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {editingBlog.id ? (isRtl ? "تعديل المقال" : "Edit Article") : (isRtl ? "إضافة مقال جديد" : "Add New Article")}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {isRtl ? "أدخل تفاصيل المقال وصورة الغلاف وأقسام الشرح والأكواد البرمجية." : "Enter blog details, cover image, and code blocks."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="flex flex-col gap-4 text-left">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المقال (إنجليزي)" : "Article Title (English)"}</label>
                    <input
                      type="text"
                      required
                      value={editingBlog.titleEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, titleEn: e.target.value })}
                      placeholder="Building Fluid Web Animations with GSAP..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "عنوان المقال (عربي)" : "Article Title (Arabic)"}</label>
                    <input
                      type="text"
                      dir="rtl"
                      required
                      value={editingBlog.titleAr}
                      onChange={(e) => setEditingBlog({ ...editingBlog, titleAr: e.target.value })}
                      placeholder="بناء تحريكات ويب فائقة السلاسة مع GSAP..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "المقتطف القصير (إنجليزي)" : "Excerpt (English)"}</label>
                    <textarea
                      rows={2}
                      value={editingBlog.excerptEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerptEn: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">{isRtl ? "المقتطف القصير (عربي)" : "Excerpt (Arabic)"}</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={editingBlog.excerptAr}
                      onChange={(e) => setEditingBlog({ ...editingBlog, excerptAr: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Cover Image & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-white">{isRtl ? "صورة الغلاف" : "Cover Image"}</label>
                      <input
                        type="file"
                        ref={blogCoverFileRef}
                        onChange={handleBlogCoverUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => blogCoverFileRef.current?.click()}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs cursor-pointer"
                      >
                        {isRtl ? "رفع صورة" : "Upload File"}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editingBlog.coverImage || ""}
                      onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                      placeholder="/images/blog.png or Supabase URL"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-neutral-400">{isRtl ? "التصنيف (إنجليزي)" : "Category (English)"}</label>
                    <input
                      type="text"
                      value={editingBlog.categoryEn}
                      onChange={(e) => setEditingBlog({ ...editingBlog, categoryEn: e.target.value })}
                      placeholder="Web Animations"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Dynamic Content Sections with Code Blocks */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white">{isRtl ? "أقسام المقال والأكواد البرمجية" : "Article Body Sections & Code Blocks"}</h4>
                    <button
                      type="button"
                      onClick={addBlogSection}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs cursor-pointer font-medium"
                    >
                      <FiPlus className="w-3.5 h-3.5" />
                      <span>{isRtl ? "إضافة قسم" : "Add Section"}</span>
                    </button>
                  </div>

                  {editingBlog.sectionsEn?.map((sec: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-medium text-blue-400">Section #{idx + 1}</span>
                        {editingBlog.sectionsEn.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBlogSection(idx)}
                            className="text-red-400 hover:text-red-300 text-xs p-1"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => {
                            const newSecs = [...editingBlog.sectionsEn];
                            newSecs[idx].heading = e.target.value;
                            setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                          }}
                          placeholder="Section Heading (English)"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                        />
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
                          placeholder="عنوان القسم (عربي)"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <textarea
                          rows={3}
                          value={sec.body}
                          onChange={(e) => {
                            const newSecs = [...editingBlog.sectionsEn];
                            newSecs[idx].body = e.target.value;
                            setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                          }}
                          placeholder="Section Body text (English)"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs resize-none"
                        />
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
                          placeholder="نص القسم وشرحه (عربي)"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-cyan-400 mb-1 font-mono">Code Snippet (Optional / اختياري)</label>
                        <textarea
                          rows={3}
                          value={sec.code || ""}
                          onChange={(e) => {
                            const newSecs = [...editingBlog.sectionsEn];
                            newSecs[idx].code = e.target.value;
                            setEditingBlog({ ...editingBlog, sectionsEn: newSecs });
                          }}
                          placeholder="// Paste JavaScript, TypeScript or CSS code snippet here..."
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-cyan-300 text-xs font-mono resize-none"
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
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isSaving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <span>{isSaving ? (isRtl ? "جاري الحفظ..." : "Saving...") : (isRtl ? "حفظ المقال" : "Save Blog Post")}</span>
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
