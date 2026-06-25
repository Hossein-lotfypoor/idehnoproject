import { memo } from "react";

interface WaterAnimationProps {
  isFlowing: boolean;
}

function WaterAnimation({ isFlowing }: WaterAnimationProps) {
  if (!isFlowing) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* قطرات اصلی */}
      {Array.from({ length: 200 }).map((_, i) => {
        const size = Math.random() * 2 + 1.5;
        const sprayX = (Math.random() - 0.5) * 250;
        return (
          <div
            key={`main-${i}`}
            className="absolute rounded-full animate-water-spray"
            style={{
              left: `${Math.random() * 100}%`,
              top: '0',
              width: `${size}px`,
              height: `${size * 3}px`,
              background: 'rgba(100, 180, 255, 0.6)',
              '--spray-x': `${sprayX}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`,
            } as React.CSSProperties}
          />
        );
      })}
      {/* قطرات ریز مه‌آلود */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`mist-${i}`}
          className="absolute rounded-full animate-water-drop"
          style={{
            left: `${Math.random() * 100}%`,
            top: '0',
            width: `${Math.random() * 1.5 + 1.5}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: 'rgba(200, 230, 255, 0.4)',
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(WaterAnimation);
