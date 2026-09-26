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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrEmail = searchParams.get("id") || searchParams.get("email");

    if (!idOrEmail) {
      return NextResponse.json(
        { success: false, error: "Subscriber ID or Email is required" },
        { status: 400 }
      );
    }

    await portfolioStore.deleteSubscriber(idOrEmail);
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
