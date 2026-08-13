import React, { useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

type Testimonial = {
  id?: string | number;
  name: string;
  role: string;
  image: string;
  quote: string;
};

type CarouselProps = {
  testimonials: Testimonial[];
  className?: string;
};

export const TestimonialsCarousel: React.FC<CarouselProps> = ({
  testimonials,
  className = ''
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: false,
    containScroll: 'keepSnaps',
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id ?? index}
              className="flex-[0_0_calc(33.333%)] min-w-0 pl-4 md:pl-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-xl overflow-hidden shadow-md hover-lift h-[400px]"
              >
                {/* Image Container */}
                <div className="relative h-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Permanent Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="text-xl font-bold mb-1 text-white">{testimonial.name}</h3>
                    <p className="text-white/80">{testimonial.role}</p>
                  </div>

                  {/* Hover Overlay for Quote */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 p-6 flex flex-col justify-center">
                      <div className="mb-4 text-primary/90">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-white/90 text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="sr-only">Previous testimonials</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="sr-only">Next testimonials</span>
        </Button>
      </div>

      {/* Become a student link (aligned under arrows) */}
      <div className="flex justify-end mt-2">
        <Link to="https://forms.gle/nLXYmZAERof9g77V7" className="text-sm text-primary hover:underline">
          Become a Student
        </Link>
      </div>
    </div>
  );
};