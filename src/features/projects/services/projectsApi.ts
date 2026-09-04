import { apiClient } from "@/lib/axios";
import { Project, ProjectsResponse, ProjectDetailResponse } from "../types";

export const projectsApi = {
  // Fetch all projects (or featured projects)
  getProjects: async (featuredOnly: boolean = false): Promise<Project[]> => {
    const response = await apiClient.get<ProjectsResponse>("/api/projects", {
      params: { featured: featuredOnly ? "true" : "false" },
    });
    return response.data.data;
  },

  // Fetch project by slug or ID
  getProjectById: async (idOrSlug: string): Promise<Project | null> => {
    const response = await apiClient.get<ProjectDetailResponse>(`/api/projects/${idOrSlug}`);
    return response.data.data;
  },
};
