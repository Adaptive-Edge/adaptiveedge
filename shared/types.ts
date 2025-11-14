export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  approach: string;
  impact: string;
  role: string;
  featured: boolean;
  treeHouseAttribution: string;
  image?: string;
}

export const CASE_STUDY_CATEGORIES = [
  "Strategic Transformation",
  "Innovation & Design",
  "Capability Building",
  "Culture & Change",
] as const;

export type CaseStudyCategory = typeof CASE_STUDY_CATEGORIES[number];

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  linkedinUrl?: string;
  featured: boolean;
}

export const BLOG_POST_CATEGORIES = [
  "AI & Technology",
  "Strategy & Innovation",
  "Organisational Culture",
  "Leadership",
] as const;

export type BlogPostCategory = typeof BLOG_POST_CATEGORIES[number];
