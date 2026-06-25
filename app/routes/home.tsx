import { useState, useEffect } from "react";
import { getProducts } from "../utils/productService";
import type { Product } from "../utils/types";
import HeroSection from "../components/HeroSection";
import CategoryBoxes from "../components/CategoryBoxes";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import WaterFlowButton from "../components/WaterFlowButton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWaterFlowing, setIsWaterFlowing] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

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
      <HeroSection isWaterFlowing={isWaterFlowing} />
      <CategoryBoxes />
      <ProductSection products={products} />
      <WaterFlowButton 
        isWaterFlowing={isWaterFlowing} 
        onToggle={() => setIsWaterFlowing(!isWaterFlowing)} 
      />
      <Footer />
    </main>
  );
}