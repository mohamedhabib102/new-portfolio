"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/axios";
import { ExperienceData } from "@/lib/store";

export function useExperiences() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchExps() {
      try {
        const res = await apiClient.get<{ success: boolean; data: ExperienceData[] }>("/api/experiences");
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setExperiences(res.data.data);
        }
      } catch (e) {
        // Fallback handled
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchExps();
    return () => {
      isMounted = false;
    };
  }, []);

  return { experiences, isLoading };
}
