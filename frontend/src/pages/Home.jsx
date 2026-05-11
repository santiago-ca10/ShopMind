import { useState } from 'react';

import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/products/SearchBar';
import ProductFilters from '../components/products/ProductFilters';

function Home() {
  const [search, setSearch] = useState('');

  const [category, setCategory] =
    useState('Todos');

  return (
    <main className="p-10 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Productos
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <ProductFilters
        category={category}
        setCategory={setCategory}
      />

      <ProductGrid
        search={search}
        category={category}
      />
    </main>
  );
}

export default Home;
