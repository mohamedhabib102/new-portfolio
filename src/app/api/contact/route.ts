import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    const trimmedMsg = (message || "").trim();
    const adminSecret = process.env.ADMIN_SECRET_KEY || "mowafy@admin2026";

    // 1. Check Secret Admin Passcode
    if (trimmedMsg === adminSecret) {
      return NextResponse.json({
        success: true,
        isAdmin: true,
        redirect: "/dashboard",
        message: "Welcome back, Mohamed! Access granted.",
      });
    }

    // 2. Normal Client Message
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const saved = await portfolioStore.addMessage({
      name: name || null,
      email,
      phone: phone || null,
      message: trimmedMsg || "Client inquiry from portfolio",
    });

    return NextResponse.json({
      success: true,
      isAdmin: false,
      data: saved,
      message: "Your message has been sent to Mohamed successfully!",
    });
  } catch (error) {
    console.error("Error handling contact message:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await portfolioStore.getMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
