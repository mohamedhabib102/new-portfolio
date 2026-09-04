import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET() {
  try {
    const experiences = await portfolioStore.getExperiences();
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}
