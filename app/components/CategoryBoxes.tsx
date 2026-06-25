interface CategoryBox {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  size: string;
}

const categoryBoxes: CategoryBox[] = [
  { id: 1, name: "مجموعه دوش و حمام", subtitle: "طراحی‌های ارگونومیک برای آرامش بیشتر", image: "images/cat-shower .jpg", size: "large" },
  { id: 2, name: "آشپزخانه", subtitle: "", image: "images/cat-kitchen.jpg", size: "small" },
  { id: 3, name: "روشویی", subtitle: "", image: "images/cat-basin.jpg", size: "small" },
];

export default function CategoryBoxes() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white" aria-label="Product categories">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
        {categoryBoxes.map((cat) => (
          <article 
            key={cat.id} 
            className="relative group overflow-hidden rounded-[2rem] bg-gray-100 cursor-pointer shadow-lg"
            tabIndex={0}
            role="button"
            aria-label={`Browse ${cat.name} products`}
          >
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
          </article>
        ))}
      </div>
    </section>
  );
}
