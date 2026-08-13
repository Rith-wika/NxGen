import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

// Use Tom walking GIF with transparent background
const tomGifSrc = `${import.meta.env.BASE_URL}tom.gif`;

const CharacterImage = ({ className = "w-auto h-24 md:h-28" }) => (
  <img
    src={tomGifSrc}
    alt="Tom walking"
    className={className}
    style={{ 
      objectFit: "contain",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1)"
    }}
    draggable={false}
  />
);

// Animation timing
const WALK_DURATION = 18; // seconds for one full left->right pass

const WalkingCharacter = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startAnimation = async () => {
    await controls.start({
      x: ["-30vw", "120vw"], // Wider range to ensure smooth entry/exit
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: WALK_DURATION,
          ease: "linear",
        },
      },
    });
  };

  useEffect(() => {
    startAnimation();
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => controls.stop();
  const handleMouseLeave = () => startAnimation();

  return (
    <div ref={containerRef} className="w-screen h-32 pointer-events-none relative">
      <motion.div
        className="absolute bottom-0 pointer-events-auto"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ x: "-30vw" }}
      >
        <div className="relative">
          <CharacterImage />
          {/* Subtle shadow under Tom */}
          <div 
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-24 h-2 bg-black/5 rounded-full blur-sm"
            style={{ filter: 'blur(2px)' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WalkingCharacter;
