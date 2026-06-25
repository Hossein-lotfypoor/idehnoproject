import { memo } from "react";
import ProductCard from "../shop/ProductCard";
import type { Product } from "../../utils/types";

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
        <p className="text-gray-400 font-bold text-2xl">در این مجموعه فعلاً محصولی برای نمایش نیست.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default memo(ProductGrid);
