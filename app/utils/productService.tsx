// import axios from "axios";
// import { BASE_URL } from "./api";
// import type { Product } from "./types";

// // تابعی برای گرفتن تمام محصولات از API
// export const getProducts = async (): Promise<Product[]> => {
//   const response = await axios.get<Product[]>(`${BASE_URL}/products`);
//   return response.data;
// };

// // ۱. وارد کردن دیتای محلی که ساختی
// import productsData from "../data/products.json";
// import type { Product } from "./types";

// // ۲. تابعی که به جای اینترنت، دیتای فایل را برمی‌گرداند
// export const getProducts = async (): Promise<Product[]> => {
//   // ما از Promise استفاده می‌کنیم تا ساختار کد قبلی در صفحه اصلی (home.tsx) بهم نخورد
//   return productsData as Product[];
// };


import type { Product } from "./types";
// وارد کردن مستقیم فایل جیسون که با اسکریپت ساختیم
import productsData from "../data/products.json"; 

// تابعی برای گرفتن تمام محصولات (حالا از فایل محلی)
export const getProducts = async (): Promise<Product[]> => {
  // یک تاخیر کوچک نمایشی (اختیاری) برای اینکه لودینگ سایت را ببینی
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as Product[]);
    }, 500); 
  });
};

// تابعی برای گرفتن یک محصول خاص (برای صفحه جزئیات که بعداً می‌سازیم)
export const getProductById = async (id: number): Promise<Product | undefined> => {
  return productsData.find((p) => p.id === id) as Product | undefined;
};