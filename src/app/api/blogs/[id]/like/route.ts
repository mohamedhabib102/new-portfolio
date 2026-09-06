import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cleanId = typeof id === "string" ? decodeURIComponent(id).trim().toLowerCase() : "";

  try {
    const blogs = await portfolioStore.getBlogs();
    const blog = blogs.find((b: any) => 
      (b.id || "").toLowerCase() === cleanId || 
      (b.slug || "").toLowerCase() === cleanId
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      likes: typeof blog.likes === "number" ? blog.likes : 0,
    });
  } catch (error) {
    console.error("Failed to fetch blog likes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog likes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cleanId = typeof id === "string" ? decodeURIComponent(id).trim() : "";

  try {
    let increment = 1;
    try {
      const body = await request.json();
      if (body && typeof body.increment === "number") {
        increment = body.increment;
      } else if (body && body.action === "unlike") {
        increment = -1;
      }
    } catch {
      // Empty or non-JSON body defaults to +1 like
    }

    const result = await portfolioStore.likeBlog(cleanId, increment);

    return NextResponse.json({
      success: true,
      likes: result.likes,
      message: increment > 0 ? "Liked successfully!" : "Unliked successfully!",
    });
  } catch (error) {
    console.error("Failed to update blog likes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog likes" },
      { status: 500 }
    );
  }
}
