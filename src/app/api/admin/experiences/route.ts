import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if reordering batch
    if (body && Array.isArray(body.orderedIds)) {
      const updated = await portfolioStore.reorderExperiences(body.orderedIds);
      return NextResponse.json({
        success: true,
        data: updated,
        message: "Experiences reordered successfully!",
      });
    }

    const saved = await portfolioStore.saveExperience(body);
    return NextResponse.json({
      success: true,
      data: saved,
      message: "Experience saved successfully!",
    });
  } catch (error) {
    console.error("Failed to save experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save experience" },
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
        { success: false, error: "Experience ID is required" },
        { status: 400 }
      );
    }
    await portfolioStore.deleteExperience(id);
    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully!",
    });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
