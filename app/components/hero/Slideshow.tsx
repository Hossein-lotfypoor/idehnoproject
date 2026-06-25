import { memo } from "react";

interface SlideshowProps {
  images: string[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const slideshowImages = [
  "images/slideheader.jpg",
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
];

function Slideshow({ images, currentSlide, onSlideChange }: SlideshowProps) {
  return (
    <>
      <div className="absolute inset-0">
        <img
          key={currentSlide}
          src={images[currentSlide]}
          className="absolute inset-0 w-full h-full object-cover opacity-80 animate-tv-commercial"
          style={{ willChange: 'transform, opacity' }}
          alt={`Slide ${currentSlide + 1}`}
        />
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Slideshow);
