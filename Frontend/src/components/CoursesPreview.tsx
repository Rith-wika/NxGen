import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { categories, getPreviewCourses } from "@/data";
import type { Course } from "@/data/types";

// Using centralized data from @/data
const previewCourses = getPreviewCourses();

export const CoursesPreview = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  // Using categories from the centralized data store

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of courses designed to help you excel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories
            .filter((c) => c.id !== "all")
            .map((cat, index) => {
              const course = previewCourses[index];
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  course={course}
                  index={index}
                />
              );
            })}
        </div>
        <div className="text-center mb-8">
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {categories.map((c) => (
              <Button key={c.id} size="sm" asChild variant="outline" className="whitespace-nowrap">
                <Link to={`/courses?category=${c.id}`}>{c.name}</Link>
              </Button>
            ))}
          </div>
          <div>
            <Button variant="outline-primary" size="lg" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({
  category,
  course,
  index,
}: {
  category: { id: string; name: string };
  course?: Course;
  index: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const image = course?.image ?? "/placeholder.svg";

  return (
    <Link
      to={`/courses?category=${category.id}`}
      ref={ref}
      className={`group block transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover-lift h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 opacity-40`} />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {course ? course.title : "Explore courses in this category"}
          </p>
        </div>
      </div>
    </Link>
  );
};
