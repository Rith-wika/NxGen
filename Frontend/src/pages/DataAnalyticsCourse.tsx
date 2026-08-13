import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock, Award, BookOpen, CheckCircle, ArrowLeft,
  ChevronDown, ChevronUp, Users, PlayCircle, Download,
  Star, MessageCircle, Share2, Code, Briefcase, GraduationCap
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Preloader } from "@/components/Preloader";
import { courses } from "@/data";
import { detailedCourses, DetailedCourse } from "@/data/detailedCourses";
import { CoursePricing } from "@/components/CoursePricing";
import DemoSidebarCard from "@/components/DemoSidebarCard";
import { PageHero } from "@/components/PageHero";

const DataAnalyticsCourse = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const [openModule, setOpenModule] = useState<number | null>(null);

  // Determine course data source
  let courseData: DetailedCourse | null = null;

  if (id && detailedCourses[id]) {
    courseData = detailedCourses[id];
  } else {
    // Fallback for legacy numeric IDs or direct access
    const numericId = Number(id);
    const legacyCourse = courses[numericId as keyof typeof courses];

    if (legacyCourse) {
      courseData = {
        id: String(legacyCourse.id),
        title: legacyCourse.title,
        tagline: legacyCourse.description,
        level: "Intermediate",
        duration: legacyCourse.duration,
        lessons: 20,
        projects: 2,
        overview: legacyCourse.description,
        outcomes: Object.values(legacyCourse.features),
        curriculum: [
          { module: "Module 1: Introduction", topics: ["Overview", "Fundamentals"] },
          { module: "Module 2: Advanced Topics", topics: ["Deep Dive", "Best Practices"] }
        ],
        tools: [{ name: "Standard Tools", icon: Code }],
        project: { title: "Course Project", description: "Hands-on implementation of concepts." },
        audience: ["Students", "Professionals"],
        image: legacyCourse.image
      };
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (!courseData) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;
  }

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Preloader isLoading={isLoading} threshold={800} />

      <PageHero
        title={courseData.title}
        description={courseData.tagline}
      >
        <Link to="/courses-menu" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Courses
        </Link>
      </PageHero>

      {/* --- MAIN CONTENT LAYOUT (2 Columns) --- */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2 space-y-10">

            {/* Course Meta Info (Moved from Hero) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                  {courseData.level} Level
                </span>
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider border border-green-100">
                  Job Readiness
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-bold text-gray-900">4.9</span>
                  <span className="text-xs text-gray-500">(Student Reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>200+ Enrolled</span>
                </div>
              </div>
            </div>

            {/* 1. Overview */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#000080] mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Course Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {courseData.overview}
              </p>
            </section>



            {/* 3. Curriculum (Accordion) */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#000080]">Course Curriculum</h2>
                <Button variant="outline" size="sm" className="hidden sm:flex border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" /> Download Syllabus
                </Button>
              </div>

              <div className="space-y-4">
                {courseData.curriculum.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-blue-300">
                    <button
                      onClick={() => toggleModule(idx)}
                      className={`w-full flex items-center justify-between p-5 text-left transition-colors ${openModule === idx ? 'bg-blue-50/50' : 'bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${openModule === idx ? 'bg-[#000080] text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {idx + 1}
                        </span>
                        <h3 className={`font-bold text-lg ${openModule === idx ? 'text-[#000080]' : 'text-gray-700'}`}>
                          {item.module}
                        </h3>
                      </div>
                      {openModule === idx ? (
                        <ChevronUp className="w-5 h-5 text-[#000080]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openModule === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="p-5 pt-0 bg-white border-t border-gray-100">
                        <ul className="space-y-3 mt-4 ml-12">
                          {item.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="relative pl-4 text-gray-600 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-200">
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Tools & Technologies */}
            <section>
              <h2 className="text-2xl font-bold text-[#000080] mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-6">
                {courseData.tools?.map((tool, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center p-4 group-hover:scale-110 group-hover:border-blue-300 transition-all duration-300">
                      <tool.icon className="w-8 h-8 text-gray-600 group-hover:text-[#000080] transition-colors" />
                    </div>
                    <span className="font-medium text-gray-600 text-sm">{tool.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. What You'll Learn (Grid) - Moved Here */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#000080] mb-6">What You Will Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {courseData.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Course Pricing & Modes */}
            {/* <CoursePricing courseTitle={courseData.title} /> */}

            {/* 6. Hands-on Project */}
            <section className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-2xl p-8 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Briefcase className="w-8 h-8 text-blue-200" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Live Capstone Project</h2>
                  <div className="text-lg font-semibold text-blue-200 mb-2">{courseData.project.title}</div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    {courseData.project.description} Apply your learning in a real-world scenario. You will build this project from scratch under mentor guidance, giving you a portfolio-ready asset.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium">Real-world Data</span>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium">Mentor Code Review</span>
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium">GitHub Portfolio</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Placement & Career Support (NEW SECTION) */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#000080] mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" /> Career Services
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">Resume Building</h3>
                  <p className="text-sm text-gray-600">Expert sessions on crafting an ATS-friendly resume to get you shortlisted at top firms.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">Mock Interviews</h3>
                  <p className="text-sm text-gray-600">Rigorous 1:1 mock interviews with industry experts to boost your confidence.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">Job Referrals</h3>
                  <p className="text-sm text-gray-600">Direct referrals to our network of 500+ hiring partners and corporate clients.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-800">LinkedIn Profile</h3>
                  <p className="text-sm text-gray-600">Optimization strategies to make your professional profile stand out to recruiters.</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 self-start">

              {/* Demo Card */}
              <DemoSidebarCard courseTitle={courseData.title} />

              {/* Course Highlights Card */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="font-bold text-[#000080] mb-4">Course Highlights</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <PlayCircle className="w-4 h-4 text-blue-500" /> 50+ Hours Live Sessions
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <Code className="w-4 h-4 text-blue-500" /> 10+ Assignments
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <Award className="w-4 h-4 text-blue-500" /> Certification Included
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-blue-500" /> 1:1 Mentorship
                  </li>
                </ul>
              </div>

              {/* Need Help? */}
              <div className="text-center p-4">
                <p className="text-sm text-gray-500">Have questions?</p>
                <a href="tel:+919960935600" className="text-[#000080] font-bold hover:underline">Call Us: +91 9960 935 600</a>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DataAnalyticsCourse;
