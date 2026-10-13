export interface BlogAuthor {
  name: string;
  roleEn: string;
  roleAr: string;
  avatar: string;
}

export interface BlogSection {
  heading: string;
  body: string;
  codeSnippet?: string;
  code?: string;
  image?: string;
  imageUrl?: string;
  imageAlt?: string;
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
    sections: BlogSection[];
    conclusion: string;
  };
  contentAr: {
    intro: string;
    sections: BlogSection[];
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
