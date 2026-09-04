import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { supabase, BUCKET_NAME, ensureStorageBucket } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique name
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${timestamp}_${cleanName}`;

    // 1. Try Uploading to Supabase Storage if configured
    if (supabase) {
      try {
        await ensureStorageBucket();

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(uniqueFileName, buffer, {
            contentType: file.type || "application/octet-stream",
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(uniqueFileName);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            storage: "supabase",
            fileName: uniqueFileName,
          });
        } else if (uploadError) {
          console.warn("[Supabase Storage] Error, falling back to local storage:", uploadError.message);
        }
      } catch (supabaseErr) {
        console.warn("[Supabase Storage] Exception, falling back to local storage:", supabaseErr);
      }
    }

    // 2. Fallback: Save file to local public/uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    const localUrl = `/uploads/${uniqueFileName}`;
    return NextResponse.json({
      success: true,
      url: localUrl,
      storage: "local",
      fileName: uniqueFileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process file upload" },
      { status: 500 }
    );
  }
}
