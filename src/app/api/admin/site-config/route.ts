import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await portfolioStore.updateSiteConfig(body);
    return NextResponse.json({
      success: true,
      data: updated,
      message: "Site configuration updated successfully!",
    });
  } catch (error) {
    console.error("Failed to update site config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update site configuration" },
      { status: 500 }
    );
  }
}
