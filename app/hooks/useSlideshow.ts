import { useEffect, useRef, useState } from "react";

interface UseSlideshowProps {
  images: string[];
  interval?: number;
}

export function useSlideshow({ images, interval = 3000 }: UseSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, interval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return { currentSlide, goToSlide };
}
