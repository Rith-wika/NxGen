import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useEffect, useState } from "react";

const partners = [
  { name: "HTML", logo: "./HTML.jpg" },
  { name: "CSS", logo: "./CSS.jpg" },
  { name: "JS", logo: "./JS.jpg" },
  { name: "FLUTTER", logo: "./FLUTTER.webp" },
  { name: "POWER BI", logo: "./POWERBI.png" },
  { name: "SAP", logo: "./SAP.png" },
  { name: "AI", logo: "./AI.jpg" },
  { name: "REACT", logo: "./REACT.png" },
  { name: "PYTHON", logo: "./PYTHON.jpg" },
  { name: "JAVA", logo: "./JAVA.jpg" },
];

export const PartnersCarousel = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const singleRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const single = singleRef.current;
    const container = containerRef.current;
    if (!single || !container) return;

    const distance = single.scrollWidth; // width of one set
    if (distance <= 0) return;

    // speed in px/s
    const speed = 60;
    const duration = distance / speed;

    // expose variables to CSS for the animation
    container.style.setProperty("--scrollDistance", `${distance}px`);
    container.style.setProperty("--duration", `${duration}s`);
    // trigger the animation class
    // delay to ensure CSS vars are applied
    requestAnimationFrame(() => setReady(true));

    const onResize = () => {
      // recompute on resize
      container.style.removeProperty("--scrollDistance");
      container.style.removeProperty("--duration");
      setReady(false);
      // debounce re-measure
      requestAnimationFrame(() => setReady(true));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="py-20 bg-secondary/70">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Empowering Learners with Industry-Leading Tools
          </p>
        </div>

        {/* Carousel Container - seamless infinite loop by duplicating contents */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className={`flex ${ready ? "animate-scroll" : ""}`}
          >
            <div ref={singleRef} className="flex">
              {partners.map((partner, index) => (
                <div key={`a-${index}`} className="flex-shrink-0 w-48 mx-4">
                  <div className="bg-card rounded-lg p-6 shadow-md hover-lift">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* duplicate set immediately after for seamless looping */}
            <div aria-hidden className="flex">
              {partners.map((partner, index) => (
                <div key={`b-${index}`} className="flex-shrink-0 w-48 mx-4">
                  <div className="bg-card rounded-lg p-6 shadow-md hover-lift">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(var(--scrollDistance) * -1)); }
        }
        .animate-scroll {
          animation: scroll var(--duration) linear infinite;
        }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

// --- helper hooks/state below ---
// (No additional globals needed)
