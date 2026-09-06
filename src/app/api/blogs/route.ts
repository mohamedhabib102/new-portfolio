import { NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const blogs = await portfolioStore.getBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
