import { NextRequest, NextResponse } from "next/server";
import { portfolioStore } from "@/lib/store";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }
    await portfolioStore.deleteMessage(id);
    return NextResponse.json({
      success: true,
      message: "Message deleted successfully!",
    });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
