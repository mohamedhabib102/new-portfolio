import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET() {
  try {
    const skills = await portfolioStore.getSkills();
    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
