import { useContext } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { CartContext } from '../../context/cart.context';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover= {{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
    >
      <img
        src={product.imagen || 'https://picsum.photos/500'}
        alt={product.nombre}
        className="w-full h-56 object-cover rounded-xl hover:scale-105 transition duration-300"
      />

      <h2 className="text-xl font-bold mt-4 dark:text-white">
        {product.nombre}
      </h2>

      <p className="text-gray-600 mt-2 dark:text-gray-300">
        {product.descripcion}
      </p>

      <p className="text-2xl font-bold mt-4 dark:text-white">
        ${product.precio}
      </p>

      <button
        onClick={() => {
          addToCart(product);
          toast.success('Producto agregado 🛒');
        }}
        className="w-full bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition"
      >
        Agregar al carrito
      </button>
    </motion.div>
  );
}

export default ProductCard;