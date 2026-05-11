import { useContext } from 'react';
import toast from 'react-hot-toast';

import { CartContext } from '../../context/cart.context';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="w-full h-48 object-cover rounded-xl"
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
    </div>
  );
}

export default ProductCard;