import { useContext } from 'react';

import { Link }
  from 'react-router-dom';

import { CartContext }
  from '../../context/cart.context';

function SidebarCart({
  isCartOpen,
  setIsCartOpen
}) {

  const {

    cart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    total

  } = useContext(CartContext);

  return (
    <>
      {/* OVERLAY */}
      {isCartOpen && (
        <div
          onClick={() =>
            setIsCartOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
          "
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed
          top-0
          right-0
          h-full
          w-[380px]
          bg-white
          dark:bg-gray-900
          shadow-2xl
          z-50
          transform
          transition-transform
          duration-300
          flex
          flex-col
          ${
            isCartOpen
              ? 'translate-x-0'
              : 'translate-x-full'
          }
        `}
      >

        {/* HEADER */}
        <div className="
          flex
          justify-between
          items-center
          p-5
          border-b
          dark:border-gray-700
        ">

          <h2 className="
            text-2xl
            font-bold
            dark:text-white
          ">
            🛒 Carrito
          </h2>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
            className="
              text-xl
              dark:text-white
            "
          >
            ✖
          </button>

        </div>

        {/* PRODUCTS */}
        <div className="
          flex-1
          overflow-y-auto
          p-5
          space-y-4
        ">

          {cart.length === 0 ? (

            <p className="
              text-gray-500
              dark:text-gray-400
            ">
              Tu carrito está vacío
            </p>

          ) : (

            cart.map((item) => (

              <div
                key={item._id}
                className="
                  border
                  dark:border-gray-700
                  rounded-2xl
                  p-4
                  shadow-sm
                  bg-gray-50
                  dark:bg-gray-800
                "
              >

                {/* NAME */}
                <h3 className="
                  font-bold
                  text-lg
                  dark:text-white
                ">
                  {item.nombre}
                </h3>

                {/* PRICE */}
                <p className="
                  text-gray-600
                  dark:text-gray-300
                  mt-1
                ">
                  $
                  {(
                    item.precio *
                    item.cantidad
                  ).toLocaleString('es-CO')}
                </p>

                {/* QUANTITY */}
                <div className="
                  flex
                  items-center
                  gap-3
                  mt-4
                ">

                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item._id
                      )
                    }
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-gray-300
                      dark:bg-gray-700
                      dark:text-white
                    "
                  >
                    -
                  </button>

                  <span className="
                    font-bold
                    dark:text-white
                  ">
                    {item.cantidad}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item._id
                      )
                    }
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-black
                      text-white
                    "
                  >
                    +
                  </button>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeFromCart(
                      item._id
                    )
                  }
                  className="
                    mt-4
                    text-sm
                    text-red-500
                    hover:underline
                  "
                >
                  Eliminar
                </button>

              </div>

            ))

          )}

        </div>

        {/* FOOTER */}
        <div className="
          border-t
          dark:border-gray-700
          p-5
        ">

          <h3 className="
            text-2xl
            font-bold
            mb-4
            dark:text-white
          ">
            Total:
            {" "}
            $
            {total.toLocaleString('es-CO')}
          </h3>

          <Link to="/checkout">

            <button
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-xl
                hover:bg-gray-800
                transition
              "
            >
              Finalizar compra
            </button>

          </Link>

        </div>

      </div>
    </>
  );

}

export default SidebarCart;