import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';
import { ThemeContext } from '../../context/theme.context';

function Navbar({ setIsCartOpen }) {
  const { cart } = useContext(CartContext);

  const { toggleDarkMode, darkMode } =
    useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md px-8 py-5 flex justify-between items-center transition-colors duration-300">
      
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-3xl font-bold dark:text-white cursor-pointer">
          ShopMind
        </h1>
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">

        {/* ADMIN */}
        <Link to="/admin">
          <button className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition">
            Admin
          </button>
        </Link>

        {/* DARK MODE */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-3 rounded-xl transition"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* CART */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          🛒 Carrito

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;