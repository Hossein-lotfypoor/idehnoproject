import { useState, useMemo, useCallback } from "react";
import FilterBar from "./product/FilterBar";
import ProductGrid from "./product/ProductGrid";
import Pagination from "./product/Pagination";
import type { Product } from "../utils/types";

interface ProductSectionProps {
  products: Product[];
}

const categories = ["همه", "دوش", "روشویی", "سینک", "توالت"];

export default function ProductSection({ products }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const filteredProducts = useMemo(() => {
    return activeCategory === "همه" 
      ? products 
      : products.filter((p) => p.category.includes(activeCategory));
  }, [products, activeCategory]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProducts, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      <FilterBar 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
          <p className="text-blue-600 font-bold mb-2 tracking-widest uppercase text-xs">Premium Collection</p>
          <h2 className="text-4xl font-black text-gray-900">
            {activeCategory === "همه" ? "محبوب‌ترین محصولات" : `دسته بندی ${activeCategory}`}
          </h2>
        </div>
        <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-bold">{filteredProducts.length} محصول</span>
      </div>

      <ProductGrid products={paginatedProducts} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
}
