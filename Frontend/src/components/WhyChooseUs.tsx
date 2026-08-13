import { BookOpen, Video, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from 'framer-motion';

const features = [
  {
    icon: BookOpen,
    title: "Library",
    description: "Access to comprehensive physical and digital library resources with thousands of books and study materials.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  },
  {
    icon: Video,
    title: "Online Classes",
    description: "Interactive live classes and recorded sessions available 24/7 for flexible learning at your own pace.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop",
  },
  {
    icon: FileText,
    title: "Advanced Lectures & Notes",
    description: "Expertly crafted notes and lectures designed by experienced educators to ensure concept clarity.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
  },
];

export const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <motion.section id="why-choose-us" className="py-20 bg-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">WHY CHOOSE US?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Here, at Education Academy, we strive so that you succeed..!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-xl overflow-hidden shadow-md hover-lift transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
