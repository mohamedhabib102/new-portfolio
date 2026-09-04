import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const allProjects = await portfolioStore.getProjects();
    const project = allProjects.find(
      (p: any) => p.id === id || p.slug === id
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project detail:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
