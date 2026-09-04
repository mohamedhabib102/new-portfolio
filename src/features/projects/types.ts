export interface ProjectSection {
  heading: string;
  body: string;
  code?: string;
}

export interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  descriptionEn: string;
  descriptionAr: string;
  videoUrl: string;
  posterUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  githubPrivate?: boolean;
  tags: string[];
  featured: boolean;
  order: number;
  featuresEn?: string[];
  featuresAr?: string[];
  sectionsEn?: ProjectSection[];
  sectionsAr?: ProjectSection[];
}

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
  total: number;
}

export interface ProjectDetailResponse {
  success: boolean;
  data: Project | null;
}
