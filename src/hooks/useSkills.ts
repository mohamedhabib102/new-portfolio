"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/axios";
import { SkillItemData } from "@/lib/store";

export function useSkills() {
  const [skills, setSkills] = useState<SkillItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchSkills() {
      try {
        const res = await apiClient.get<{ success: boolean; data: SkillItemData[] }>("/api/skills");
        if (isMounted && res.data?.data) {
          setSkills(res.data.data);
        }
      } catch (e) {
        console.warn("Could not fetch skills:", e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchSkills();
    return () => {
      isMounted = false;
    };
  }, []);

  return { skills, isLoading };
}
