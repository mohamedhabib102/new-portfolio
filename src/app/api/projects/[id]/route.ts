import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialProjects } from "../route";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const dbProject = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (dbProject) {
      return NextResponse.json({
        success: true,
        data: dbProject,
      });
    }
  } catch (error) {
    console.warn("Prisma fallback for single project:", id);
  }

  const project = initialProjects.find(
    (p) => p.id === id || p.slug === id
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
}
