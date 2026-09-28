import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function GET() {
  try {
    const subscribers = await portfolioStore.getSubscribers();
    return NextResponse.json({
      success: true,
      data: subscribers,
      total: subscribers.length,
    });
  } catch (error) {
    console.error("[Admin Subscribers GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const result = await portfolioStore.addSubscriber(trimmedEmail);

    return NextResponse.json({
      success: true,
      data: result.data,
      status: result.status,
      message:
        result.status === "already_subscribed"
          ? "المشترك موجود بالفعل في القائمة"
          : "تمت إضافة المشترك بنجاح",
    });
  } catch (error) {
    console.error("[Admin Subscribers POST Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add subscriber" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (!id && !email) {
      return NextResponse.json(
        { success: false, error: "Subscriber ID or Email is required" },
        { status: 400 }
      );
    }

    if (email) await portfolioStore.deleteSubscriber(email);
    if (id && id !== email) await portfolioStore.deleteSubscriber(id);

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    console.error("[Admin Subscribers DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
