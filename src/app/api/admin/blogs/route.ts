import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";
import { sendNewBlogNotification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saved = await portfolioStore.saveBlog(body);

    const isNew = !body.id;
    const shouldNotify = body.notifySubscribers === true || (isNew && body.notifySubscribers !== false);
    let mailResult: any = null;

    if (shouldNotify) {
      try {
        const subscribers = await portfolioStore.getSubscribers();
        const uniqueEmails = Array.from(new Set(subscribers.map((s) => s.email).filter(Boolean)));
        console.log(`[Blog Newsletter] Dispatching to ${uniqueEmails.length} subscribers:`, uniqueEmails);
        if (uniqueEmails.length > 0) {
          mailResult = await sendNewBlogNotification(saved, uniqueEmails);
          console.log("[Blog Newsletter Result]:", mailResult);
        }
      } catch (mailErr) {
        console.error("[Blog Newsletter Dispatch Error]:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: saved,
      mailResult,
      message: mailResult?.totalSent
        ? `Blog post saved and notification sent to ${mailResult.totalSent} subscribers!`
        : "Blog post saved successfully!",
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
