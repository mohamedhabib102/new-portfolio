import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saved = await portfolioStore.saveSkill(body);
    return NextResponse.json({
      success: true,
      data: saved,
      message: "Skill saved successfully!",
    });
  } catch (error) {
    console.error("Failed to save skill:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save skill" },
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
        { success: false, error: "Skill ID is required" },
        { status: 400 }
      );
    }
    await portfolioStore.deleteSkill(id);
    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully!",
    });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
