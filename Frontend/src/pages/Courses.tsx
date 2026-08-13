import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Preloader } from "@/components/Preloader";
import { categories, getCoursesByCategory } from "@/data";
import type { Course } from "@/data/types";
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from "lucide-react";
import WalkingCharacter from "@/components/WalkingCharacter";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    // Simulate data loading - in real app, this would be an API call
    setIsLoading(true);
    const loadData = async () => {
      try {
        // Artificial delay to show loading state only when network is slow
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading courses:', error);
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedCategory]);

  const filteredCourses = getCoursesByCategory(selectedCategory);
  const siteUrl = "https://nxgentechacademy.com";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Best Software Training Institute in Hyderabad | NxGen Tech Academy</title>
        <meta name="description" content="Looking for the best software training institute in Hyderabad? NxGen Tech Academy offers professional courses in Full Stack, Data Science, and more with placement support." />
        <link rel="canonical" href={`${siteUrl}/courses`} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Software Training Institute in Hyderabad | NxGen Tech Academy" />
        <meta property="og:description" content="Top software training institute in Hyderabad. Master industry-demand skills with expert mentors." />
        <meta property="og:url" content={`${siteUrl}/courses`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Preloader isLoading={isLoading} threshold={800} />

      <PageHero
        title="Software Training Institute in Hyderabad"
        description="Choose from our comprehensive range of courses designed to help you achieve your career goals"
      />

      {/* Category Filter */}
      <section className="py-8 bg-background border-b">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <p className="text-center text-gray-600 mb-6 font-semibold uppercase tracking-wider text-sm">
            Filter by Course Category
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-300"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-card">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4">
              Explore Our Professional Courses
            </h2>
            <div className="h-1.5 w-24 bg-[#000080] mx-auto rounded-full"></div>
          </div>
          <div
            ref={ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                total={filteredCourses.length}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No courses found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Walking character walks along the bottom edge like a taskbar (transparent)
      <div className="fixed left-0 bottom-0 w-screen h-28 z-50 pointer-events-none bg-transparent">
        <WalkingCharacter />
      </div> */}
    </div>
  );
};

const CourseCard = ({
  course,
  index,
  total,
}: {
  course: Course;
  index: number;
  total: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const remainder = total % 3;
  const isLast = index === total - 1;
  const spanClass = isLast && remainder === 1 ? "lg:col-span-1" : "";

  if (!course || !course.title) {
    return (
      <div className="bg-card rounded-xl p-6 text-center">
        <p>No course data available</p>
      </div>
    );
  }

  return (
    <Link
      to={`/courses/${course.id}`}
      ref={ref}
      className={`group block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${spanClass}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between bg-card rounded-xl overflow-hidden shadow-md hover-lift h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 opacity-40" />
        </div>
        <div className="p-6 flex flex-col items-start">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-base font-semibold text-primary mb-2 m-0">{course.price}</p>
          <div className="mt-2 flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
            <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-dark transition" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Courses;
