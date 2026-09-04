"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/axios";
import { BlogPost } from "@/features/blogs/types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get<{ success: boolean; data: BlogPost[] }>("/api/blogs");
      if (res.data?.data) {
        setBlogs(res.data.data);
      } else {
        setBlogs([]);
      }
    } catch (e) {
      console.warn("Could not fetch blogs:", e);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, isLoading, refetch: fetchBlogs };
}
