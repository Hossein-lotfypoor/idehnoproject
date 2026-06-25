interface WaterFlowButtonProps {
  isWaterFlowing: boolean;
  onToggle: () => void;
}

export default function WaterFlowButton({ isWaterFlowing, onToggle }: WaterFlowButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl overflow-hidden ${
        isWaterFlowing
          ? "border-4 border-blue-400"
          : "border-4 border-gray-400"
      }`}
      style={{
        transform: isWaterFlowing ? 'rotate(0deg)' : 'rotate(-90deg)',
        borderColor: isWaterFlowing ? '#60a5fa' : '#9ca3af',
      }}
    >
      <img
        src="images/hero-faucet.jpg"
        loading="lazy"
        alt="دسته شیر"
        className="w-full h-full object-cover rounded-full"
      />
    </button>
  );
}
