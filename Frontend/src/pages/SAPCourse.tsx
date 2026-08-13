import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, PlayCircle, Code, Award, Users, Layers, Workflow, Blocks, Database, Brain, Globe, CheckCircle, Eye, Clock, Monitor, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";

import { categoryConfig, coursesData } from "@/data/categoryCourses";
import { detailedCourses } from "@/data/detailedCourses";
import { CoursePricing } from "@/components/CoursePricing";
import DemoSidebarCard from "@/components/DemoSidebarCard";
import { Helmet } from 'react-helmet-async';

const SAPCourse = ({ categorySlug }: { categorySlug?: string }) => {
    const config = categorySlug ? categoryConfig[categorySlug] : null;
    const [searchQuery, setSearchQuery] = useState("");

    if (!config) {
        return <div className="text-center py-20">Category not found</div>;
    }

    const filteredCourses = coursesData.filter(course =>
        course.categoryId === categorySlug &&
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const siteUrl = "https://nxgentechacademy.com";
    const pageUrl = `${siteUrl}/courses/${categorySlug}`;

    // SAP BTP Specific Architecture Data
    const isBTP = categorySlug === "sap-btp";
    const btpPillars = [
        {
            title: "Application Development",
            icon: Code,
            color: "text-blue-600",
            bg: "bg-blue-50",
            items: ["SAP Build Apps (Low-Code/No-Code)", "SAP Business Application Studio (Pro-Code)", "Cloud Foundry & Kyma Runtimes", "Mobile Services"]
        },
        {
            title: "Automation",
            icon: Workflow,
            color: "text-orange-600",
            bg: "bg-orange-50",
            items: ["SAP Build Process Automation", "Workflow Management", "RPA (Robotic Process Automation)", "SAP Task Center"]
        },
        {
            title: "Integration",
            icon: Blocks,
            color: "text-green-600",
            bg: "bg-green-50",
            items: ["SAP Integration Suite", "Cloud Integration (CPI)", "API Management", "Advanced Event Mesh"]
        },
        {
            title: "Data & Analytics",
            icon: Database,
            color: "text-amber-600",
            bg: "bg-amber-50",
            items: ["SAP HANA Cloud", "SAP Analytics Cloud (SAC)", "SAP Datasphere", "Master Data Governance"]
        },
        {
            title: "Artificial Intelligence",
            icon: Brain,
            color: "text-purple-600",
            bg: "bg-purple-50",
            items: ["SAP AI Core", "SAP AI Launchpad", "AI Business Services", "Intelligent Scenarios"]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-700">
            <Helmet>
                <title>{`${config.title} - SAP Training in Hyderabad | NxGen Tech Academy`}</title>
                <meta name="description" content={`${config.description} Enroll for the best SAP training in Hyderabad with 100% placement assistance and expert mentors.`} />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:title" content={`${config.title} - SAP Training in Hyderabad`} />
                <meta property="og:description" content={config.description} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
            </Helmet>

            <PageHero
                title={`SAP Training in Hyderabad - ${config.title}`}
                description={config.description}
            >
                <Link to="/courses-menu" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Courses
                </Link>
            </PageHero>

            {/* Main Content Layout */}
            <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN - CONTENT (2/3 width) */}
                    <div className="lg:col-span-2">

                        {/* SAP BTP Specific: Architecture Overview */}
                        {isBTP && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-[#000080] mb-6 flex items-center gap-2">
                                    <Layers className="w-6 h-6" /> The SAP BTP Ecosystem
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    SAP Business Technology Platform is the unified environment for innovation.
                                    Our training covers the entire spectrum of pillars defined in the SAP BTP Architecture.
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {btpPillars.map((pillar, idx) => (
                                        <div key={idx} className={`border rounded-xl p-5 ${idx === 4 ? 'md:col-span-2' : ''} hover:shadow-md transition-shadow`}>
                                            <div className="flex items-center gap-3 mb-3 border-b pb-2">
                                                <div className={`p-2 rounded-lg ${pillar.bg}`}>
                                                    <pillar.icon className={`w-5 h-5 ${pillar.color}`} />
                                                </div>
                                                <h3 className="font-bold text-gray-800">{pillar.title}</h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {pillar.items.map((item, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${pillar.color} flex-shrink-0`}></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="text-xl font-bold text-[#000080] mb-4">Available Modules</h3>
                                </div>
                            </div>
                        )}



                        {/* Search (Only if not BTP, or keep it always? Keeping it always is good UX) */}
                        <div className="flex justify-center mb-10">
                            <div className="relative w-full">
                                <Input
                                    type="text"
                                    placeholder={`Search ${config.title}...`}
                                    className="w-full pl-6 pr-12 py-6 rounded-full border border-gray-300 shadow-sm text-lg focus:ring-2 focus:ring-[#000080]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                    >
                                        {/* Image Section */}
                                        {course.image && course.image !== "code-icon" ? (
                                            <div className="w-full h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center border-b border-gray-100">
                                                <img src="/Logo.png" alt={course.title} className="h-16 opacity-50" />
                                            </div>
                                        )}

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                                    {course.title}
                                                </h3>
                                            </div>

                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(course.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                                <span className="text-blue-500 text-sm ml-2">(33 Reviews)</span>
                                            </div>

                                            <div className="flex-grow">
                                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                                    {course.description || `Comprehensive training on ${course.title} including real-world projects and certification.`}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-2 mb-6 border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Clock className="w-4 h-4 text-green-600" />
                                                    <span>Duration: {course.duration || "40+ hours"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Users className="w-4 h-4 text-green-600" />
                                                    <span>Students Enrolled: {course.enrolled || "1500+"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Monitor className="w-4 h-4 text-green-600" />
                                                    <span>Mode: {course.mode || "Online"}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto flex justify-end">
                                                <Button asChild className="bg-[#10B981] hover:bg-[#059669] text-white flex items-center gap-2 rounded-md px-6">
                                                    <Link to={`/courses/${course.id}`}>
                                                        <Eye className="w-4 h-4" /> View Course
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    <p className="text-xl">No courses found in this category.</p>
                                    <Button asChild variant="link" className="mt-2 text-[#000080]">
                                        <Link to="/contact">Contact us for custom requirements</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* What You Will Learn Section (Moved here) */}
                        {config.outcomes && (
                            <div className="mt-12 mb-12">
                                <h2 className="text-2xl font-bold text-[#000080] mb-6">What You Will Learn</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {config.outcomes.map((outcome, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5 text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Course Pricing Section */}
                        {/* <div className="mt-12">
                            <CoursePricing courseTitle={config.title} />
                        </div> */}
                    </div>

                    {/* RIGHT COLUMN - SIDEBAR (1/3 width) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6 self-start">

                            {/* Demo Card */}
                            <DemoSidebarCard courseTitle={config.title} />

                            {/* Course Highlights Card */}
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="font-bold text-[#000080] mb-4">Course Highlights</h4>
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

export default SAPCourse;
