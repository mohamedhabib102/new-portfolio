import nodemailer from "nodemailer";

export interface MailerBlogPayload {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  coverImage?: string;
  categoryEn?: string;
  categoryAr?: string;
  readTimeEn?: string;
  readTimeAr?: string;
  authorName?: string;
  authorRole?: string;
}

/**
 * Creates Nodemailer transporter using SMTP configuration from environment variables.
 */
function createTransporter() {
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;

  if (!user || !rawPass) {
    return null;
  }

  // Automatically remove spaces and quotes so both "abcd efgh ijkl mnop" and "abcdefghijklmnop" work perfectly
  const pass = rawPass.replace(/\s+/g, "").replace(/["']/g, "").trim();

  // Gmail-optimized configuration
  if (user.includes("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Generates an elegant, high-converting, responsive HTML email template for new blog posts.
 */
function generateBlogEmailTemplate(blog: MailerBlogPayload, siteUrl: string) {
  const blogUrl = `${siteUrl}/blogs/${blog.slug || blog.id}`;
  const authorName = blog.authorName || "Mohamed H. Mowafy";
  const authorRole = blog.authorRole || "Software Engineer";
  const category = blog.categoryAr || blog.categoryEn || "مقالة تقنية";
  const readTime = blog.readTimeAr || blog.readTimeEn || "5 دقائق قراءة";
  const coverImageUrl = blog.coverImage
    ? (blog.coverImage.startsWith("http") ? blog.coverImage : `${siteUrl}${blog.coverImage}`)
    : `${siteUrl}/avatar.png`;

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.titleAr || blog.titleEn}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    body { margin: 0; padding: 0; background-color: #090a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #12141c; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); }
    .btn-primary {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: #ffffff !important;
      font-weight: 600;
      font-size: 15px;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 9999px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
    }
  </style>
</head>
<body style="margin: 0; padding: 40px 15px; background-color: #090a0f; color: #f3f4f6;">

  <div class="email-container">
    
    <!-- Top Header & Branding -->
    <div style="padding: 28px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); background: linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, transparent 100%);">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="right" style="vertical-align: middle;">
            <span style="font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">${authorName}</span>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">${authorRole}</div>
          </td>
          <td align="left" style="vertical-align: middle;">
            <span style="display: inline-block; background-color: rgba(37, 99, 235, 0.15); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.3); font-size: 11px; padding: 4px 10px; border-radius: 9999px; font-weight: 600;">
              ✨ مقال جديد
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Blog Cover Image Banner -->
    ${
      blog.coverImage
        ? `<div style="width: 100%; background-color: #1a1d28; text-align: center; overflow: hidden;">
            <a href="${blogUrl}" target="_blank">
              <img src="${coverImageUrl}" alt="${blog.titleEn}" style="width: 100%; max-height: 280px; object-fit: cover; display: block;" />
            </a>
          </div>`
        : ""
    }

    <!-- Content Area -->
    <div style="padding: 36px 32px;">
      
      <!-- Category & Read Time Tags -->
      <div style="margin-bottom: 16px;">
        <span style="display: inline-block; background: rgba(255, 255, 255, 0.06); color: #cbd5e1; font-size: 12px; padding: 4px 12px; border-radius: 6px; margin-left: 8px; border: 1px solid rgba(255, 255, 255, 0.08);">
          🏷️ ${category}
        </span>
        <span style="display: inline-block; color: #94a3b8; font-size: 12px;">
          ⏱️ ${readTime}
        </span>
      </div>

      <!-- Arabic Title & Excerpt -->
      ${
        blog.titleAr
          ? `<h1 style="font-size: 22px; line-height: 1.4; font-weight: 700; color: #ffffff; margin: 0 0 14px 0;">
              <a href="${blogUrl}" style="color: #ffffff; text-decoration: none;">${blog.titleAr}</a>
            </h1>
            <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0 0 24px 0;">
              ${blog.excerptAr || ""}
            </p>`
          : ""
      }

      <!-- English Title & Excerpt if available -->
      ${
        blog.titleEn && blog.titleEn !== blog.titleAr
          ? `<div style="direction: ltr; text-align: left; padding: 14px 16px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border-left: 3px solid #2563eb; margin-bottom: 26px;">
              <h2 style="font-size: 16px; line-height: 1.4; font-weight: 600; color: #e2e8f0; margin: 0 0 6px 0;">${blog.titleEn}</h2>
              <p style="font-size: 13px; line-height: 1.6; color: #94a3b8; margin: 0;">${blog.excerptEn || ""}</p>
            </div>`
          : ""
      }

      <!-- CTA Button -->
      <div style="text-align: center; margin: 32px 0 20px 0;">
        <a href="${blogUrl}" target="_blank" class="btn-primary">
          قراءة المقال كاملاً ←
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding: 24px 32px; background-color: #0c0d14; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
      <p style="font-size: 12px; color: #64748b; line-height: 1.6; margin: 0 0 8px 0;">
        لقد استلمت هذه الرسالة لأنك مشترك في النشرة البريدية لمدونة <strong>${authorName}</strong>.
      </p>
      <p style="font-size: 11px; color: #475569; margin: 0;">
        © ${new Date().getFullYear()} ${authorName}. جميع الحقوق محفوظة.
      </p>
    </div>

  </div>

</body>
</html>
`;
}

function getFromAddress(): string {
  const user = process.env.SMTP_USER || "mowafy.dev@gmail.com";
  const rawFrom = process.env.EMAIL_FROM;
  if (!rawFrom) {
    return `"Mohamed H. Mowafy" <${user}>`;
  }
  const clean = rawFrom.replace(/\\"/g, '"').trim();
  if (clean.includes("<") && clean.includes(">")) {
    return clean;
  }
  return `"${clean}" <${user}>`;
}

/**
 * Dispatches automated new blog post notification to all subscribers via Nodemailer.
 */
export async function sendNewBlogNotification(blog: MailerBlogPayload, recipientEmails: string[]) {
  if (!recipientEmails || recipientEmails.length === 0) {
    console.log("[Nodemailer] No subscribers found. Skipping email notification.");
    return { success: true, count: 0, message: "No subscribers" };
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.warn(
      "[Nodemailer] SMTP_USER or SMTP_PASS not defined in environment variables. Email dispatch skipped safely."
    );
    return {
      success: false,
      reason: "SMTP_CREDENTIALS_MISSING",
      message: "Please configure SMTP_USER and SMTP_PASS in .env to enable email sending.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app";
  const from = getFromAddress();
  const subject = `مقال جديد: ${blog.titleAr || blog.titleEn}`;
  const htmlContent = generateBlogEmailTemplate(blog, siteUrl);
  const textContent = `${blog.titleAr || blog.titleEn}\n\n${blog.excerptAr || blog.excerptEn}\n\nلقراءة المقال كاملاً: ${siteUrl}/blogs/${blog.slug || blog.id}`;

  let totalSent = 0;

  const sendPromises = recipientEmails.map(async (recipient) => {
    try {
      const info = await transporter.sendMail({
        from,
        to: recipient,
        replyTo: process.env.SMTP_USER || "mowafy.dev@gmail.com",
        subject,
        text: textContent,
        html: htmlContent,
        headers: {
          "X-Entity-Ref-ID": `blog-${blog.id || blog.slug}`,
          "List-Unsubscribe": `<mailto:${process.env.SMTP_USER || "mowafy.dev@gmail.com"}?subject=unsubscribe>`,
        },
      });
      console.log(`[Nodemailer] Successfully sent blog notification to: ${recipient}, MessageID: ${info.messageId}`);
      return { success: true, recipient };
    } catch (err) {
      console.error(`[Nodemailer] Failed to send email to ${recipient}:`, err);
      return { success: false, recipient, error: err };
    }
  });

  const results = await Promise.allSettled(sendPromises);
  totalSent = results.filter((r) => r.status === "fulfilled" && (r.value as any).success).length;

  return {
    success: true,
    totalSent,
    message: `Sent new blog notifications to ${totalSent} subscribers.`,
  };
}

/**
 * Sends an instant welcome/confirmation email to a new subscriber.
 */
export async function sendWelcomeSubscriberEmail(subscriberEmail: string) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn(
        "[Nodemailer] SMTP_USER or SMTP_PASS not defined. Welcome email skipped safely."
      );
      return { success: false, reason: "SMTP_CREDENTIALS_MISSING" };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedmowafydev.vercel.app";
    const from = getFromAddress();
    const subject = "🎉 تم اشتراكك بنجاح في النشرة البريدية | Mohamed H. Mowafy";

    const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>أهلاً بك في النشرة البريدية</title>
  <style>
    body { margin: 0; padding: 40px 15px; background-color: #090a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6; }
    .email-container { max-width: 580px; margin: 0 auto; background-color: #12141c; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); }
    .btn-primary { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 13px 30px; text-decoration: none; border-radius: 9999px; }
  </style>
</head>
<body>
  <div class="email-container">
    <div style="padding: 28px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); background: linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, transparent 100%); text-align: right;">
      <span style="font-size: 18px; font-weight: 700; color: #ffffff;">Mohamed H. Mowafy</span>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Software Engineer</div>
    </div>

    <div style="padding: 36px 32px; text-align: right;">
      <div style="display: inline-block; background: rgba(37, 99, 235, 0.15); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.3); font-size: 11px; padding: 4px 10px; border-radius: 9999px; font-weight: 600; margin-bottom: 16px;">
        ✨ تم تأكيد اشتراكك
      </div>

      <h1 style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; line-height: 1.4;">
        أهلاً بك في نشرتي البريدية! 🎉
      </h1>

      <p style="font-size: 15px; line-height: 1.8; color: #cbd5e1; margin: 0 0 16px 0;">
        شكراً لاشتراكك! يسعدني جداً انضمامك. ستصلك أحدث المقالات التقنية، وخلاصة التجارب والحلول البرمجية العملية، وأفضل الممارسات في هندسة وتطوير البرمجيات مباشرة إلى بريدك فور نشرها.
      </p>

      <div style="padding: 16px 20px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.06); margin-bottom: 24px;">
        <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.6;">
          💡 <strong>ماذا تتوقع؟</strong> مقالات تقنية نوعية، حلول برمجية حقيقية، وأفكار مفيدة لتطوير مهاراتك التقنية، دون أي رسائل مزعجة أو ترويجية.
        </p>
      </div>

      <div style="text-align: center; margin: 28px 0 10px 0;">
        <a href="${siteUrl}/blogs" target="_blank" class="btn-primary">
          استكشف أحدث المقالات الآن ←
        </a>
      </div>
    </div>

    <div style="padding: 20px 32px; background-color: #0c0d14; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
      <p style="font-size: 11px; color: #64748b; margin: 0;">
        تم إرسال هذا البريد إلى <strong>${subscriberEmail}</strong> لأنك قمت بالاشتراك في مدونة Mohamed H. Mowafy.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const textContent = `أهلاً بك في النشرة البريدية للمهندس محمد موافي!\n\nشكراً لاشتراكك! يسعدني جداً انضمامك. ستصلك أحدث المقالات التقنية، وخلاصة التجارب والحلول البرمجية العملية، وأفضل الممارسات في هندسة وتطوير البرمجيات مباشرة إلى بريدك فور نشرها.\n\nاستكشف أحدث المقالات: ${siteUrl}/blogs`;

    await transporter.sendMail({
      from,
      to: subscriberEmail,
      replyTo: process.env.SMTP_USER || "mowafy.dev@gmail.com",
      subject,
      text: textContent,
      html: htmlContent,
      headers: {
        "X-Entity-Ref-ID": `subscriber-${Date.now()}`,
        "List-Unsubscribe": `<mailto:${process.env.SMTP_USER || "mowafy.dev@gmail.com"}?subject=unsubscribe>`,
      },
    });

    console.log(`[Nodemailer] Welcome email sent successfully to ${subscriberEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error("[Nodemailer] Failed to send welcome email:", error);
    return { success: false, error: error?.message };
  }
}

/**
 * Diagnostic tool to verify SMTP credentials connection.
 */
export async function verifySmtpConnection() {
  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, message: "SMTP_USER or SMTP_PASS missing" };
  }
  try {
    await transporter.verify();
    return { success: true, message: "SMTP server connection verified successfully!" };
  } catch (err: any) {
    return { success: false, message: err?.message || "Failed to connect to SMTP server" };
  }
}
