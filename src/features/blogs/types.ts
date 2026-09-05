export interface BlogAuthor {
  name: string;
  roleEn: string;
  roleAr: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: {
    intro: string;
    sections: { heading: string; body: string; codeSnippet?: string }[];
    conclusion: string;
  };
  contentAr: {
    intro: string;
    sections: { heading: string; body: string; codeSnippet?: string }[];
    conclusion: string;
  };
  coverImage: string;
  categoryEn: string;
  categoryAr: string;
  tags: string[];
  author: BlogAuthor;
  readTimeEn: string;
  readTimeAr: string;
  publishedAt: string;
  likes?: number;
}
