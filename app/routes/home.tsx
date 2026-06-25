import { useEffect, useState, useRef } from "react";
import { getProducts } from "../utils/productService";
import type { Product } from "../utils/types";
import ProductCard from "../components/shop/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isWaterFlowing, setIsWaterFlowing] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemsPerPage = 8;

  const slideshowImages = [
    "images/slideheader.jpg",
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
  ];

  const categories = ["همه", "دوش", "روشویی", "سینک", "توالت"];

  const categoryBoxes = [
    { id: 1, name: "مجموعه دوش و حمام", subtitle: "طراحی‌های ارگونومیک برای آرامش بیشتر", image: "images/cat-shower .jpg", size: "large" },
    { id: 2, name: "آشپزخانه", subtitle: "", image: "images/cat-kitchen.jpg", size: "small" },
    { id: 3, name: "روشویی", subtitle: "", image: "images/cat-basin.jpg", size: "small" },
  ];

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const filterHandler = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    if (category === "همه") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category.includes(category));
      setFilteredProducts(filtered);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">در حال چیدن نمایشگاه...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="font-sans">
      {/* 1. HERO SECTION - شروع دقیق از بالای صفحه */}
      <section className="relative h-screen w-full overflow-hidden bg-black -mt-[92px]">
        {/* اسلایدشو */}
        <div className="absolute inset-0">
          <img
            key={currentSlide}
            src={slideshowImages[currentSlide]}
            className="absolute inset-0 w-full h-full object-cover opacity-80 animate-tv-commercial"
            style={{ willChange: 'transform, opacity' }}
            alt={`Slide ${currentSlide + 1}`}
          />
        </div>
        
        {/* لایه گرادینت تیره برای هماهنگی با هدر */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

        {/* انیمیشن قطرات آب - افکت دوش */}
        {isWaterFlowing && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        )}

        {/* محتوای روی Hero */}
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

          {/* نقاط ناوبری اسلایدشو */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. بخش دسته‌بندی‌های بصری (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
          {categoryBoxes.map((cat, index) => (
            <div key={cat.id} className="relative group overflow-hidden rounded-[2rem] bg-gray-100 cursor-pointer shadow-lg">
              <img
                src={cat.image}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 right-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                {cat.subtitle && <p className="text-gray-200 text-sm">{cat.subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. بخش محصولات و فیلترها */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        
        {/* نوار فیلتر چسبان */}
        <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 mb-16 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterHandler(cat)}
              className={`px-10 py-3.5 rounded-2xl text-sm font-black transition-all duration-500 
                ${activeCategory === cat 
                  ? "bg-gray-900 text-white shadow-xl scale-105" 
                  : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* تیتر بخش محصولات */}
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <p className="text-blue-600 font-bold mb-2 tracking-widest uppercase text-xs">Premium Collection</p>
            <h2 className="text-4xl font-black text-gray-900">
              {activeCategory === "همه" ? "محبوب‌ترین محصولات" : `دسته بندی ${activeCategory}`}
            </h2>
          </div>
          <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-bold">{filteredProducts.length} محصول</span>
        </div>

        {/* گرید محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* پیجینیشن پیشرفته با نقطه چین */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all font-bold"
            >
              قبلی
            </button>
            
            {(() => {
              const pages = [];
              const showEllipsis = totalPages > 7;
              
              if (!showEllipsis) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                pages.push(1);
                
                if (currentPage > 3) {
                  pages.push('...');
                }
                
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                
                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }
                
                if (currentPage < totalPages - 2) {
                  pages.push('...');
                }
                
                pages.push(totalPages);
              }
              
              return pages.map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400 font-bold">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              ));
            })()}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all font-bold"
            >
              بعدی
            </button>
          </div>
        )}

        {/* حالت خالی */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold text-2xl">در این مجموعه فعلاً محصولی برای نمایش نیست.</p>
          </div>
        )}
      </div>

      {/* دکمه کنترل آب - دسته شیر */}
      <button
        onClick={() => setIsWaterFlowing(!isWaterFlowing)}
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

      {/* فوتر */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* لوگو و توضیحات */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="images/idehnologo.png"
                  loading="lazy"
                  alt="ایده نو"
                  className="h-12 w-auto"
                />
                <h3 className="text-2xl font-bold">ایده نو</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                پیشرو در صنعت شیرآلات و تجهیزات حمام با بیش از دو دهه تجربه. کیفیت، نوآوری و رضایت مشتری اولویت ماست.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* لینک‌های سریع */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">دسترسی سریع</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">صفحه اصلی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">محصولات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">درباره ما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">تماس با ما</a></li>
              </ul>
            </div>

            {/* دسته‌بندی‌ها */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">دسته‌بندی‌ها</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">شیر دوش</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">روشویی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سینک آشپزخانه</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">توالت</a></li>
              </ul>
            </div>

            {/* تماس */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">تماس با ما</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>021-12345678</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>info@idehnovo.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>تهران، ایران</span>
                </li>
              </ul>
            </div>
          </div>

          {/* خط جداکننده */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2026 ایده نو. تمامی حقوق محفوظ است.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">قوانین و مقررات</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">حریم خصوصی</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}