import type { Product } from "../../constants/types";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      {/* بخش تصویر محصول */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* جزئیات محصول */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 h-10">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-blue-600 font-black text-lg">
            ${product.price}
          </span>
          <button className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
}