import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trainingModelRoutes } from "@/data/training-model";

export function TrainingModelMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to="/training"
        className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:text-secondary/90"
        onClick={() => setIsOpen(false)}
      >
        <span>Training Model</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 py-2 bg-background rounded-lg shadow-lg border border-border"
          >
            {trainingModelRoutes.map((route, index) => (
              <motion.div
                key={route.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={route.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <route.icon className="w-4 h-4" />
                  <span>{route.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
