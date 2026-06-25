import { memo } from "react";
import { useSlideshow } from "../hooks/useSlideshow";
import Slideshow from "./hero/Slideshow";
import WaterAnimation from "./hero/WaterAnimation";
import HeroContent from "./hero/HeroContent";

interface HeroSectionProps {
  isWaterFlowing: boolean;
}

const slideshowImages = [
  "images/slideheader.jpg",
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
  "images/5.png",
];

function HeroSection({ isWaterFlowing }: HeroSectionProps) {
  const { currentSlide, goToSlide } = useSlideshow({ images: slideshowImages });

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black -mt-[92px]">
      <Slideshow 
        images={slideshowImages} 
        currentSlide={currentSlide} 
        onSlideChange={goToSlide} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
      
      <WaterAnimation isFlowing={isWaterFlowing} />
      <HeroContent />
    </section>
  );
}

export default memo(HeroSection);

