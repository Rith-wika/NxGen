export interface Category {
  id: string;
  name: string;
}

export interface StudyMaterial {
  id: number;
  title: string;
  subject: string;
  description: string;
  pages: string;
  format: string;
  size: string;
  image: string;
  chapters: ReadonlyArray<{
    title: string;
    duration: string;
    topics: ReadonlyArray<string>;
    difficulty: string;
  }>;
}

export interface Instructor {
  id: number;
  name: string;
  role: string;
  category: string;
  company: string;
  image: string;
  designation: string;
  experience: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  duration: string;
  students: string;
  rating: string;
  price: string;
  color: string;
  icon?: any; // This will be a Lucide icon component
  features: {
    duration: string;
    projects: string;
    certification: string;
    placement: string;
    skillDevelopment: string;
    mentorship: string;
    careerSupport: string;
  };
}