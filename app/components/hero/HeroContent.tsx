import { memo } from "react";

function HeroContent() {
  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
        جریانِ نابِ <span className="text-blue-500">ایده نو</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-100 max-w-3xl mb-10 font-light leading-relaxed drop-shadow-md">
        طراحی مهندسی شده برای نسل جدید خانه‌های هوشمند. کیفیتی که با هر قطره حس می‌شود.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-2xl shadow-blue-500/30">
          مشاهده کاتالوگ ۲۰۲۶
        </button>
        <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
          تکنولوژی‌های ما
        </button>
      </div>
    </div>
  );
}

export default memo(HeroContent);
