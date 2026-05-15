import { useContext } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { CartContext } from '../../context/cart.context';

function ProductCard({ product }) {
  const { addToCart } =
    useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 hover:shadow-xl transition flex flex-col h-full"
    >
      {/* IMAGE */}
      <img
        src={
          product.imagen ||
          'https://picsum.photos/500'
        }
        alt={product.nombre}
        className="w-full h-64 object-cover rounded-xl"
      />

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-bold mt-4 dark:text-white">
          {product.nombre}
        </h2>

        <p className="text-gray-600 mt-2 dark:text-gray-300 flex-1">
          {product.descripcion}
        </p>

        <p className="text-2xl font-bold mt-4 dark:text-white">
          ${product.precio}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {
            addToCart(product);

            toast.success(
              'Producto agregado 🛒'
            );
          }}
          className="w-full bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition"
        >
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;