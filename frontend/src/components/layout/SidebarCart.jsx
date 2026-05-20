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
            bg-black/40
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
          w-[390px]
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

          <div>
            <h2 className="
              text-2xl
              font-bold
              dark:text-white
            ">
              🛒 Carrito
            </h2>

            <p className="
              text-sm
              text-gray-500
              dark:text-gray-400
            ">
              {cart.length}
              {" "}
              productos agregados
            </p>
          </div>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
            className="
              w-10
              h-10
              rounded-full
              bg-gray-100
              dark:bg-gray-800
              dark:text-white
              hover:scale-105
              transition
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

            <div className="
              h-full
              flex
              flex-col
              justify-center
              items-center
              text-center
            ">

              <p className="
                text-6xl
                mb-4
              ">
                🛒
              </p>

              <p className="
                text-gray-500
                dark:text-gray-400
                text-lg
              ">
                Tu carrito está vacío
              </p>

            </div>

          ) : (

            cart.map((item) => (

              <div
                key={item._id}
                className="
                  rounded-3xl
                  p-4
                  bg-gray-50
                  dark:bg-gray-800
                  border
                  dark:border-gray-700
                  shadow-sm
                "
              >

                <div className="
                  flex
                  gap-4
                ">

                  {/* IMAGE */}
                  <img
                    src={
                      item.imagen ||
                      'https://picsum.photos/200'
                    }
                    alt={item.nombre}
                    className="
                      w-24
                      h-24
                      rounded-2xl
                      object-cover
                    "
                  />

                  {/* INFO */}
                  <div className="
                    flex-1
                    flex
                    flex-col
                    justify-between
                  ">

                    <div>

                      <h3 className="
                        font-bold
                        text-lg
                        dark:text-white
                      ">
                        {item.nombre}
                      </h3>

                      <p className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      ">
                        $
                        {item.precio.toLocaleString(
                          'es-CO'
                        )}
                      </p>

                    </div>

                    {/* CONTROLS */}
                    <div className="
                      flex
                      items-center
                      justify-between
                      mt-4
                    ">

                      {/* QUANTITY */}
                      <div className="
                        flex
                        items-center
                        gap-3
                        bg-white
                        dark:bg-gray-900
                        px-3
                        py-2
                        rounded-full
                        shadow-sm
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
                            bg-gray-200
                            dark:bg-gray-700
                            dark:text-white
                            hover:scale-105
                            transition
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
                            hover:scale-105
                            transition
                          "
                        >
                          +
                        </button>

                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          transition
                        "
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>

                </div>

                {/* SUBTOTAL */}
                <div className="
                  mt-4
                  pt-4
                  border-t
                  dark:border-gray-700
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-gray-500
                    dark:text-gray-400
                    text-sm
                  ">
                    Subtotal
                  </span>

                  <span className="
                    font-bold
                    text-lg
                    dark:text-white
                  ">
                    $
                    {(
                      item.precio *
                      item.cantidad
                    ).toLocaleString(
                      'es-CO'
                    )}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

        {/* FOOTER */}
        <div className="
          border-t
          dark:border-gray-700
          p-5
          bg-white
          dark:bg-gray-900
        ">

          <div className="
            flex
            justify-between
            items-center
            mb-5
          ">

            <span className="
              text-lg
              text-gray-500
              dark:text-gray-400
            ">
              Total
            </span>

            <h3 className="
              text-3xl
              font-bold
              dark:text-white
            ">
              $
              {total.toLocaleString(
                'es-CO'
              )}
            </h3>

          </div>

          <Link to="/checkout">

            <button
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-2xl
                hover:bg-gray-800
                transition
                text-lg
                font-semibold
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