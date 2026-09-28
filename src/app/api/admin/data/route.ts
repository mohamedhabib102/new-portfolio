import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET() {
  try {
    const [siteConfig, experiences, projects, blogs, skills, messages, subscribers] = await Promise.all([
      portfolioStore.getSiteConfig(),
      portfolioStore.getExperiences(),
      portfolioStore.getProjects(),
      portfolioStore.getBlogs(),
      portfolioStore.getSkills(),
      portfolioStore.getMessages(),
      portfolioStore.getSubscribers(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        siteConfig,
        experiences,
        projects,
        blogs,
        skills,
        messages,
        subscribers,
      },
    });
  } catch (error) {
    console.error("Failed to load admin data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load admin data" },
      { status: 500 }
    );
  }
}
