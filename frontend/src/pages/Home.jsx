import { useMemo, useState } from "react";

import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import ProductFilters from "../components/products/ProductFilters";

function Home() {
  const ALL_CATEGORIES = "Todos";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);

  // evita recreaciones innecesarias (micro optimización)
  const filters = useMemo(
    () => ({
      search,
      category,
    }),
    [search, category]
  );

  return (
    <main className="
      p-10
      min-h-screen
      transition-colors duration-300
      bg-gradient-to-b
      from-gray-100 to-gray-200
      dark:from-gray-900 dark:to-black
    ">

      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold dark:text-white">
          🛍️ Productos
        </h1>

        <p className="text-gray-500 mt-2">
          Encuentra lo que necesitas rápido y fácil
        </p>
      </header>

      {/* SEARCH */}
      <div className="mb-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* FILTERS */}
      <div className="mb-8">
        <ProductFilters
          category={category}
          setCategory={setCategory}
          ALL_CATEGORIES={ALL_CATEGORIES}
        />
      </div>

      {/* GRID */}
      <ProductGrid
        search={filters.search}
        category={filters.category}
      />

    </main>
  );
}

export default Home;
