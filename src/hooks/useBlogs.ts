"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/axios";
import { blogsData } from "@/features/blogs/data/blogsData";
import { BlogPost } from "@/features/blogs/types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchBlogs() {
      try {
        const res = await apiClient.get<{ success: boolean; data: BlogPost[] }>("/api/blogs");
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setBlogs(res.data.data);
        }
      } catch (e) {
        // Fallback
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  return { blogs, isLoading };
}
