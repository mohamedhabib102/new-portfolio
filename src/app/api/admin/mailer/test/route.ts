import { NextRequest, NextResponse } from "next/server";
import { verifySmtpConnection, sendWelcomeSubscriberEmail } from "@/lib/mailer";

export async function GET() {
  try {
    const result = await verifySmtpConnection();
    return NextResponse.json({
      success: result.success,
      message: result.message,
      configured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      user: process.env.SMTP_USER ? `${process.env.SMTP_USER.slice(0, 3)}***` : "NOT_SET",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to verify SMTP" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json().catch(() => ({}));
    const targetEmail = email || process.env.SMTP_USER;

    if (!targetEmail) {
      return NextResponse.json(
        { success: false, error: "Please provide a recipient email address or set SMTP_USER in .env" },
        { status: 400 }
      );
    }

    const result = await sendWelcomeSubscriberEmail(targetEmail);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || result.reason },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${targetEmail}!`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to send test email" },
      { status: 500 }
    );
  }
}
