import { BookOpen, MonitorPlay, Calendar, Building, GraduationCap, Users, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrainingModelRoute {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const trainingModelRoutes: TrainingModelRoute[] = [
  {
    title: "Classroom Training",
    href: "/training/classroom",
    icon: BookOpen
  },
  {
    title: "Online Training",
    href: "/training/online",
    icon: MonitorPlay
  },
  {
    title: "Weekend Training",
    href: "/training/weekend",
    icon: Calendar
  },
  {
    title: "Corporate Training",
    href: "/training/corporate",
    icon: Building
  },
  {
    title: "Internships",
    href: "/training/internships",
    icon: GraduationCap
  },
  {
    title: "Trainers Profile",
    href: "/training/trainers",
    icon: Users
  },
  {
    title: "Course Schedule",
    href: "/training/schedule",
    icon: CalendarDays
  }
];