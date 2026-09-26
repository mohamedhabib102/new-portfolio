import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required", errorAr: "البريد الإلكتروني مطلوب" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address",
          errorAr: "يرجى إدخال بريد إلكتروني صالح",
        },
        { status: 400 }
      );
    }

    const result = await portfolioStore.addSubscriber(trimmedEmail);

    if (result.status === "already_subscribed") {
      return NextResponse.json({
        success: true,
        status: "already_subscribed",
        message: "You're already subscribed to our newsletter!",
        messageAr: "أنت مشترك بالفعل في النشرة البريدية!",
      });
    }

    return NextResponse.json({
      success: true,
      status: "created",
      message: "Thank you for subscribing! You'll receive our latest updates.",
      messageAr: "تم الاشتراك بنجاح! ستصلك أحدث المقالات التقنية أولاً بأول.",
    });
  } catch (error) {
    console.error("[Newsletter API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
        errorAr: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقاً.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await portfolioStore.getSubscribers();
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error("[Newsletter API GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
