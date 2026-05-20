import { useContext } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { CartContext }
  from '../../context/cart.context';

function ProductCard({ product }) {

  const { addToCart } =
    useContext(CartContext);

  const hasStock =
    product.stock > 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4
      }}
      whileHover={{
        y: -5
      }}
      className="
        bg-white
        dark:bg-gray-800
        rounded-2xl
        shadow-md
        p-5
        hover:shadow-xl
        transition
        flex
        flex-col
        h-full
      "
    >

      {/* IMAGE */}
      <img
        src={
          product.imagen ||
          'https://picsum.photos/500'
        }
        alt={product.nombre}
        className="
          w-full
          h-64
          object-cover
          rounded-xl
        "
      />

      {/* CONTENT */}
      <div className="flex flex-col flex-1">

        {/* NAME */}
        <h2 className="
          text-xl
          font-bold
          mt-4
          dark:text-white
        ">
          {product.nombre}
        </h2>

        {/* DESCRIPTION */}
        <p className="
          text-gray-600
          mt-2
          dark:text-gray-300
          flex-1
        ">
          {product.descripcion}
        </p>

        {/* PRICE */}
        <p className="
          text-2xl
          font-bold
          mt-4
          dark:text-white
        ">
          ${product.precio.toLocaleString()}
        </p>

        {/* CATEGORY */}
        <p className="
          text-sm
          text-gray-500
          dark:text-gray-400
          mt-1
        ">
          Categoría:
          {" "}
          {product.categoria}
        </p>

        {/* STOCK */}
        <p
          className={`
            text-sm
            font-semibold
            mt-2
            ${
              hasStock
                ? 'text-green-500'
                : 'text-red-500'
            }
          `}
        >
          {
            hasStock
              ? `Stock disponible: ${product.stock}`
              : 'Sin stock'
          }
        </p>

        {/* BUTTON */}
        <button
          disabled={!hasStock}
          onClick={() => {

            if (!hasStock) return;

            addToCart(product);

            toast.success(
              'Producto agregado 🛒'
            );

          }}
          className={`
            w-full
            py-3
            rounded-xl
            mt-4
            transition
            text-white
            font-semibold
            ${
              hasStock
                ? `
                  bg-black
                  hover:bg-gray-800
                `
                : `
                  bg-gray-400
                  cursor-not-allowed
                `
            }
          `}
        >
          {
            hasStock
              ? 'Agregar al carrito'
              : 'Agotado'
          }
        </button>

      </div>

    </motion.div>
  );
}

export default ProductCard;