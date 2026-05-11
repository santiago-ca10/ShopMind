import { useEffect, useState } from 'react';

import ProductCard from './ProductCard';

function ProductGrid({
  search,
  category
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((res) => res.json())
      .then((data) =>{console.log(data); setProducts(data)});
  }, []);

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.nombre
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === 'Todos' ||
        product.categoria?.toLowerCase() === category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;