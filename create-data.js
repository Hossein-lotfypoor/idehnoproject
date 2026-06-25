import fs from 'fs';
import path from 'path';

// آدرس پوشه عکس‌ها
const imageDir = './publicimages/products';
// جایی که فایل نهایی ذخیره می‌شود
const outputFilePath = './app/data/products.json';

try {
  const files = fs.readdirSync(imageDir);
  
  const products = files.map((file, index) => {
    // حذف پسوند .jpg و جایگزینی خط تیره با فاصله برای نام محصول
    const cleanName = file.replace(/\.[^/.]+$/, "").replace(/-/g, " ");
    
    // کلمه اول نام فایل را به عنوان دسته (Category) برمی‌داریم
    const category = cleanName.split(" ")[0]; 

    return {
      id: index + 1,
      title: cleanName,
      price: 0, // قیمت را فعلاً صفر می‌گذاریم
      description: `محصول مدل ${cleanName} با طراحی مدرن و ۵ سال ضمانت تعویض.`,
      category: category,
      image: `images/products/${file}`,
      rating: { rate: 5, count: 1 }
    };
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`✅ موفقیت‌آمیز: ${products.length} محصول با موفقیت ساخته شد!`);
} catch (err) {
  console.error("❌ خطایی رخ داد: احتمالا پوشه images/products رو نساختی.");
}