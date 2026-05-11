function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-4 rounded-2xl border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

export default SearchBar;