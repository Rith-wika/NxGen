import { Brain } from "lucide-react";

export interface CourseType {
  id: number;
  title: string;
  price: string;
  features: {
    duration: string;
    projects: string;
    certification: string;
    placement: string;
    skillDevelopment: string;
    mentorship: string;
    careerSupport: string;
  };
  color: string;
}

export const courses: CourseType[] = [
  {
    id: 1,
    title: "AI/ML",
    price: "30,000/-",
    features: {
      duration: "45 Days Comprehensive Training Program",
      projects: "Work on 2 Real-Time Industry Projects",
      certification: "Course Completion Certificates Provided",
      placement: "100% Placement Assistance",
      skillDevelopment: "Hands-on Training with Practical Implementation",
      mentorship: "Guided by Experienced Industry Professionals",
      careerSupport: "Resume Building, Mock Interviews & Job Referrals"
    },
    color: "bg-[#DC2626]" // Red color
  },
  {
    id: 2,
    title: "PYTHON & AI/ML",
    price: "50,000/-",
    features: {
      duration: "45 Days Comprehensive Training Program",
      projects: "Work on 2 Real-Time Industry Projects",
      certification: "Course Completion Certificates Provided",
      placement: "100% Placement Assistance",
      skillDevelopment: "Hands-on Training with Practical Implementation",
      mentorship: "Guided by Experienced Industry Professionals",
      careerSupport: "Resume Building, Mock Interviews & Job Referrals"
    },
    color: "bg-[#F59E0B]" // Yellow color
  },
  {
    id: 3,
    title: "AI/ML & INTERNSHIP",
    price: "75,000/-",
    features: {
      duration: "45 Days Comprehensive Training Program",
      projects: "Work on 2 Real-Time Industry Projects",
      certification: "Internship & Course Completion Certificates Provided",
      placement: "100% Placement Assistance",
      skillDevelopment: "Hands-on Training with Practical Implementation",
      mentorship: "Guided by Experienced Industry Professionals",
      careerSupport: "Resume Building, Mock Interviews & Job Referrals"
    },
    color: "bg-[#059669]" // Green color
  },
  {
    id: 4,
    title: "PYTHON, AI/ML & INTERNSHIP",
    price: "1,00,000/-",
    features: {
      duration: "45 Days Comprehensive Training Program",
      projects: "Work on 2 Real-Time Industry Projects",
      certification: "Internship & Course Completion Certificates Provided",
      placement: "100% Placement Assistance",
      skillDevelopment: "Hands-on Training with Practical Implementation",
      mentorship: "Guided by Experienced Industry Professionals",
      careerSupport: "Resume Building, Mock Interviews & Job Referrals"
    },
    color: "bg-[#3B82F6]" // Blue color
  }
];