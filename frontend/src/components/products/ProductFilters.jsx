const categories = [
  'Todos',
  'Snacks',
  'Bebidas',
  'Tecnología'
];

function ProductFilters({
  category,
  setCategory
}) {
  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-5 py-3 rounded-xl transition ${
            category === cat
              ? 'bg-black text-white'
              : 'bg-white dark:bg-gray-800 dark:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default ProductFilters;