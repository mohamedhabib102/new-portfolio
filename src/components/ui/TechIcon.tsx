"use client";

import React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiMui,
  SiFramer,
  SiGreensock,
  SiCursor,
  SiGithubcopilot,
  SiAnthropic,
  SiChatbot,
  SiGooglechrome,
  SiPostman,
  SiVite,
  SiWebpack,
  SiLighthouse,
  SiJest,
  SiTestinglibrary,
  SiEslint,
  SiPrettier,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiGraphql,
  SiFirebase,
  SiWordpress,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiDjango,
  SiFastapi,
  SiGo,
  SiRust,
  SiPhp,
  SiLaravel,
  SiLinux,
  SiNginx,
  SiTurborepo,
  SiBun,
  SiPnpm,
  SiYarn,
  SiStripe,
  SiSocketdotio,
  SiNpm,
  SiGooglegemini,
  SiGooglejules,
  SiGoogle,
  SiClaude,
  SiClaudecode,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrandReactNative, TbBrandCpp } from "react-icons/tb";
import { FaCode, FaAws } from "react-icons/fa6";

export interface TechIconDefinition {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Styling" | "DevOps & Tools" | "AI & Productivity" | "Testing & Performance";
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_TECH_ICONS: TechIconDefinition[] = [
  // Frontend
  { id: "SiHtml5", name: "HTML5", category: "Frontend", color: "text-orange-500", icon: SiHtml5 },
  { id: "SiCss", name: "CSS3", category: "Frontend", color: "text-blue-500", icon: SiCss },
  { id: "SiJavascript", name: "JavaScript", category: "Frontend", color: "text-yellow-400", icon: SiJavascript },
  { id: "SiTypescript", name: "TypeScript", category: "Frontend", color: "text-blue-400", icon: SiTypescript },
  { id: "SiReact", name: "React", category: "Frontend", color: "text-cyan-400", icon: SiReact },
  { id: "SiNextdotjs", name: "Next.js", category: "Frontend", color: "text-white", icon: SiNextdotjs },
  { id: "SiVuedotjs", name: "Vue.js", category: "Frontend", color: "text-emerald-500", icon: SiVuedotjs },
  { id: "SiAngular", name: "Angular", category: "Frontend", color: "text-red-500", icon: SiAngular },
  { id: "SiSvelte", name: "Svelte", category: "Frontend", color: "text-orange-600", icon: SiSvelte },
  { id: "TbBrandReactNative", name: "React Native", category: "Frontend", color: "text-cyan-400", icon: TbBrandReactNative },
  { id: "SiRedux", name: "Redux", category: "Frontend", color: "text-purple-400", icon: SiRedux },
  { id: "SiReactquery", name: "TanStack / React Query", category: "Frontend", color: "text-red-400", icon: SiReactquery },
  
  // Styling & Animations
  { id: "SiTailwindcss", name: "Tailwind CSS", category: "Styling", color: "text-cyan-400", icon: SiTailwindcss },
  { id: "SiSass", name: "Sass / SCSS", category: "Styling", color: "text-pink-500", icon: SiSass },
  { id: "SiMui", name: "Material UI", category: "Styling", color: "text-blue-400", icon: SiMui },
  { id: "SiBootstrap", name: "Bootstrap", category: "Styling", color: "text-purple-500", icon: SiBootstrap },
  { id: "SiFramer", name: "Framer Motion", category: "Styling", color: "text-purple-400", icon: SiFramer },
  { id: "SiGreensock", name: "GSAP", category: "Styling", color: "text-green-400", icon: SiGreensock },
  { id: "SiFigma", name: "Figma", category: "Styling", color: "text-purple-400", icon: SiFigma },

  // AI & Productivity
  { id: "SiClaude", name: "Claude (Anthropic)", category: "AI & Productivity", color: "text-amber-500", icon: SiClaude },
  { id: "SiClaudecode", name: "Claude Code", category: "AI & Productivity", color: "text-amber-400", icon: SiClaudecode },
  { id: "SiGooglegemini", name: "Gemini Pro", category: "AI & Productivity", color: "text-blue-400", icon: SiGooglegemini },
  { id: "SiGooglejules", name: "Google Jules / Stitch", category: "AI & Productivity", color: "text-emerald-400", icon: SiGooglejules },
  { id: "SiCursor", name: "Cursor AI", category: "AI & Productivity", color: "text-cyan-300", icon: SiCursor },
  { id: "SiGithubcopilot", name: "GitHub Copilot", category: "AI & Productivity", color: "text-white", icon: SiGithubcopilot },
  { id: "SiAnthropic", name: "Anthropic AI", category: "AI & Productivity", color: "text-amber-500", icon: SiAnthropic },
  { id: "SiChatbot", name: "AI Assistant", category: "AI & Productivity", color: "text-emerald-400", icon: SiChatbot },

  // Developer Tools
  { id: "SiGit", name: "Git", category: "DevOps & Tools", color: "text-red-500", icon: SiGit },
  { id: "SiGithub", name: "GitHub", category: "DevOps & Tools", color: "text-white", icon: SiGithub },
  { id: "SiNpm", name: "npm", category: "DevOps & Tools", color: "text-red-500", icon: SiNpm },
  { id: "SiVite", name: "Vite", category: "DevOps & Tools", color: "text-purple-400", icon: SiVite },
  { id: "SiWebpack", name: "Webpack", category: "DevOps & Tools", color: "text-blue-400", icon: SiWebpack },
  { id: "VscCode", name: "VS Code", category: "DevOps & Tools", color: "text-blue-400", icon: VscCode },
  { id: "SiGooglechrome", name: "Chrome DevTools", category: "DevOps & Tools", color: "text-yellow-400", icon: SiGooglechrome },
  { id: "SiPostman", name: "Postman", category: "DevOps & Tools", color: "text-orange-500", icon: SiPostman },
  { id: "SiVercel", name: "Vercel", category: "DevOps & Tools", color: "text-white", icon: SiVercel },
  { id: "SiDocker", name: "Docker", category: "DevOps & Tools", color: "text-blue-400", icon: SiDocker },
  { id: "SiKubernetes", name: "Kubernetes", category: "DevOps & Tools", color: "text-blue-500", icon: SiKubernetes },
  { id: "SiLinux", name: "Linux", category: "DevOps & Tools", color: "text-yellow-500", icon: SiLinux },
  { id: "FaAws", name: "AWS", category: "DevOps & Tools", color: "text-amber-500", icon: FaAws },
  { id: "SiNginx", name: "Nginx", category: "DevOps & Tools", color: "text-green-500", icon: SiNginx },
  { id: "SiGoogle", name: "Google Cloud / AI", category: "DevOps & Tools", color: "text-blue-500", icon: SiGoogle },

  // Build & Testing
  { id: "SiVite", name: "Vite", category: "Testing & Performance", color: "text-purple-400", icon: SiVite },
  { id: "SiWebpack", name: "Webpack", category: "Testing & Performance", color: "text-blue-400", icon: SiWebpack },
  { id: "SiTurborepo", name: "Turbopack / Turborepo", category: "Testing & Performance", color: "text-pink-400", icon: SiTurborepo },
  { id: "SiLighthouse", name: "Lighthouse", category: "Testing & Performance", color: "text-amber-400", icon: SiLighthouse },
  { id: "SiJest", name: "Jest", category: "Testing & Performance", color: "text-red-500", icon: SiJest },
  { id: "SiTestinglibrary", name: "Testing Library", category: "Testing & Performance", color: "text-red-400", icon: SiTestinglibrary },
  { id: "SiEslint", name: "ESLint", category: "Testing & Performance", color: "text-purple-400", icon: SiEslint },
  { id: "SiPrettier", name: "Prettier", category: "Testing & Performance", color: "text-cyan-400", icon: SiPrettier },
  { id: "SiBun", name: "Bun", category: "Testing & Performance", color: "text-amber-200", icon: SiBun },
  { id: "SiPnpm", name: "pnpm", category: "Testing & Performance", color: "text-amber-400", icon: SiPnpm },
  { id: "SiYarn", name: "Yarn", category: "Testing & Performance", color: "text-blue-400", icon: SiYarn },

  // Backend & Databases
  { id: "SiNodedotjs", name: "Node.js", category: "Backend", color: "text-green-500", icon: SiNodedotjs },
  { id: "SiExpress", name: "Express.js", category: "Backend", color: "text-neutral-300", icon: SiExpress },
  { id: "SiNestjs", name: "NestJS", category: "Backend", color: "text-red-500", icon: SiNestjs },
  { id: "SiPython", name: "Python", category: "Backend", color: "text-yellow-400", icon: SiPython },
  { id: "SiDjango", name: "Django", category: "Backend", color: "text-emerald-600", icon: SiDjango },
  { id: "SiFastapi", name: "FastAPI", category: "Backend", color: "text-teal-400", icon: SiFastapi },
  { id: "SiPhp", name: "PHP", category: "Backend", color: "text-indigo-400", icon: SiPhp },
  { id: "SiLaravel", name: "Laravel", category: "Backend", color: "text-red-500", icon: SiLaravel },
  { id: "SiGo", name: "Go", category: "Backend", color: "text-cyan-400", icon: SiGo },
  { id: "SiRust", name: "Rust", category: "Backend", color: "text-orange-400", icon: SiRust },
  { id: "TbBrandCpp", name: "C++", category: "Backend", color: "text-blue-500", icon: TbBrandCpp },
  { id: "SiGraphql", name: "GraphQL", category: "Backend", color: "text-pink-500", icon: SiGraphql },
  { id: "SiPostgresql", name: "PostgreSQL", category: "Backend", color: "text-blue-400", icon: SiPostgresql },
  { id: "SiMysql", name: "MySQL", category: "Backend", color: "text-blue-500", icon: SiMysql },
  { id: "SiMongodb", name: "MongoDB", category: "Backend", color: "text-green-500", icon: SiMongodb },
  { id: "SiSupabase", name: "Supabase", category: "Backend", color: "text-emerald-400", icon: SiSupabase },
  { id: "SiPrisma", name: "Prisma ORM", category: "Backend", color: "text-white", icon: SiPrisma },
  { id: "SiFirebase", name: "Firebase", category: "Backend", color: "text-amber-500", icon: SiFirebase },
  { id: "SiSocketdotio", name: "Socket.io", category: "Backend", color: "text-white", icon: SiSocketdotio },
  { id: "SiStripe", name: "Stripe", category: "Backend", color: "text-indigo-400", icon: SiStripe },
  { id: "SiWordpress", name: "WordPress", category: "Backend", color: "text-blue-400", icon: SiWordpress },
];

const iconMap = new Map<string, TechIconDefinition>();
AVAILABLE_TECH_ICONS.forEach((item) => {
  iconMap.set(item.id.toLowerCase(), item);
  iconMap.set(item.name.toLowerCase().replace(/[^a-z0-9]/g, ""), item);
});

export function getTechIconInfo(identifier: string): TechIconDefinition {
  const cleanId = (identifier || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const found = iconMap.get(cleanId);
  if (found) return found;

  // Generic fallback
  return {
    id: identifier,
    name: identifier,
    category: "DevOps & Tools",
    color: "text-neutral-300",
    icon: FaCode,
  };
}

export default function TechIcon({
  nameOrId,
  className = "w-5 h-5",
}: {
  nameOrId: string;
  className?: string;
}) {
  const info = getTechIconInfo(nameOrId);
  const IconComponent = info.icon;
  return <IconComponent className={`${className} ${info.color}`} />;
}
