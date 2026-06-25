import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // نکته کلیدی: استفاده از absolute و w-full برای نادیده گرفتن فضای هدر توسط مرورگر
    <header className={`fixed top-0 left-0 w-full z-[100] flex justify-center p-4 transition-all duration-500 ${isScrolled ? "translate-y-0" : "translate-y-2"}`}>
      <nav className={`
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        flex items-center justify-between px-8 w-full
        ${isScrolled 
          ? "max-w-4xl py-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-white/40" 
          : "max-w-7xl py-5 rounded-none bg-transparent"}
      `}>
        
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="images/idehnologo.png" 
            alt="ایده نو" 
            className={`h-12 w-auto transition-transform ${!isScrolled && "shadow-[0_0_20px_rgba(37,99,235,0.4)]"}`}
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["محصولات", "تکنولوژی", "درباره ما"].map((item) => (
            <a key={item} href="#" className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-blue-600" : "text-white/80 hover:text-white"}`}>
              {item}
            </a>
          ))}
        </div>

        <button className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
          isScrolled 
          ? "bg-gray-900 text-white" 
          : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
        }`}>
          کاتالوگ ۲۰۲۶
        </button>
      </nav>
    </header>
  );
}