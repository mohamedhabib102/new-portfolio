import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dibrssekkpsbyhvwwzln.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_GQ03bkpio3VTBv1_-b9BPw_CdVd4d-M";
export const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "portfolio-media";

export const supabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;

/**
 * Uploads a file directly from the browser to Supabase Storage.
 * Bypasses Vercel's 4.5MB Serverless Function payload limit completely!
 */
export async function directSupabaseUpload(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!supabaseClient) {
    return { success: false, error: "Supabase client not initialized" };
  }

  try {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${timestamp}_${cleanName}`;

    const { data, error } = await supabaseClient.storage
      .from(BUCKET_NAME)
      .upload(uniqueFileName, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type || "application/octet-stream",
      });

    if (error) {
      console.warn("[Direct Supabase Upload] Error:", error);
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabaseClient.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uniqueFileName);

    return {
      success: true,
      url: publicUrlData.publicUrl,
    };
  } catch (err: any) {
    console.error("[Direct Supabase Upload] Exception:", err);
    return { success: false, error: err.message || "Upload failed" };
  }
}
