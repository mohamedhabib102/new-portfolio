import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-media";

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    })
  : null;

/**
 * Ensures bucket exists in Supabase Storage.
 */
export async function ensureStorageBucket(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (!listError && buckets) {
      const exists = buckets.some((b) => b.name === BUCKET_NAME);
      if (exists) return true;
    }

    // Try creating public bucket
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 104857600, // 100MB
    });

    if (!createError) {
      console.log(`[Supabase] Created bucket "${BUCKET_NAME}" successfully.`);
      return true;
    }
  } catch (err) {
    console.warn("[Supabase] Bucket verification notice:", err);
  }
  return false;
}
