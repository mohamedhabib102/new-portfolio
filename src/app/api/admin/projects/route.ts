import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saved = await portfolioStore.saveProject(body);
    return NextResponse.json({
      success: true,
      data: saved,
      message: "Project saved successfully!",
    });
  } catch (error) {
    console.error("Failed to save project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }
    await portfolioStore.deleteProject(id);
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
