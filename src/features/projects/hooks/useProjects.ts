import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../services/projectsApi";
import { Project } from "../types";

export const PROJECTS_QUERY_KEY = ["projects"] as const;

export function useProjects(featuredOnly: boolean = false) {
  return useQuery<Project[]>({
    queryKey: [...PROJECTS_QUERY_KEY, { featuredOnly }],
    queryFn: () => projectsApi.getProjects(featuredOnly),
    staleTime: 0, // Immediately fetch latest data
    refetchOnWindowFocus: true,
  });
}

export function useProjectDetail(idOrSlug: string) {
  return useQuery<Project | null>({
    queryKey: [...PROJECTS_QUERY_KEY, "detail", idOrSlug],
    queryFn: () => projectsApi.getProjectById(idOrSlug),
    enabled: !!idOrSlug,
    staleTime: 0,
  });
}
