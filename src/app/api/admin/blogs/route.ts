import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";
import { sendNewBlogNotification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saved = await portfolioStore.saveBlog(body);

    // Asynchronously dispatch newsletter emails to all active subscribers without blocking response
    (async () => {
      try {
        const subscribers = await portfolioStore.getSubscribers();
        const emails = subscribers.map((s) => s.email).filter(Boolean);
        if (emails.length > 0) {
          await sendNewBlogNotification(saved, emails);
        }
      } catch (mailErr) {
        console.error("[Blog Newsletter Dispatch Error]:", mailErr);
      }
    })();

    return NextResponse.json({
      success: true,
      data: saved,
      message: "Blog post saved successfully!",
    });
  } catch (error) {
    console.error("Failed to save blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save blog post" },
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
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }
    await portfolioStore.deleteBlog(id);
    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully!",
    });
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
