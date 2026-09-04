import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET() {
  try {
    const config = await portfolioStore.getSiteConfig();
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("Failed to fetch site config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch site config" },
      { status: 500 }
    );
  }
}
