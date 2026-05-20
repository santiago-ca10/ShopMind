import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

import { CartContext } from "../context/cart.context";

function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    clearCart
  } = useContext(CartContext);

  // TOTAL REAL
  const total = cart.reduce(
    (acc, item) =>
      acc + (item.precio * item.cantidad),
    0
  );

  // CHECKOUT
  const handleCheckout = async () => {

    try {

      const token =
        localStorage.getItem(
          "shopmind-token"
        );

      // VALIDAR LOGIN
      if (!token) {

        toast.error(
          "Debes iniciar sesión"
        );

        navigate("/login");

        return;
      }

      // FORMATEAR PRODUCTOS
      const productos = cart.map(
        (item) => ({
          producto: item._id,
          cantidad: item.cantidad,
          precio: item.precio
        })
      );

      // ENVIAR PEDIDO
      await API.post(
        "/pedidos/checkout",
        {
          productos,
          total
        }
      );

      toast.success(
        "Compra realizada"
      );

      // LIMPIAR CARRITO
      clearCart();

      // REDIRECCIÓN
      navigate("/mis-pedidos");

    } catch (error) {

      console.log(
        "ERROR CHECKOUT:",
        error.response?.data ||
        error.message
      );

      toast.error(
        error.response?.data?.msg ||
        "Error checkout"
      );
    }

  };

  return (

    <main
      className="
        min-h-screen
        bg-gray-100
        dark:bg-black
        p-6
        md:p-10
        transition-colors
      "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-black
            dark:text-white
          "
        >
          Checkout
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
            mt-2
          "
        >
          Revisa tus productos antes de finalizar la compra.
        </p>

      </div>

      {/* CARD */}
      <div
        className="
          bg-white
          dark:bg-gray-900
          rounded-3xl
          shadow-xl
          overflow-hidden
          border
          border-gray-200
          dark:border-gray-800
        "
      >

        {/* PRODUCTOS */}
        <div className="p-6 md:p-8">

          {cart.length === 0 ? (

            <div
              className="
                py-20
                text-center
              "
            >

              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                  text-lg
                "
              >
                No hay productos en el carrito
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="
                    flex
                    gap-4
                    items-center
                    border-b
                    pb-5
                    dark:border-gray-800
                  "
                >

                  {/* IMAGE */}
                  <img
                    src={
                      item.imagen ||
                      "https://placehold.co/100x100"
                    }
                    alt={item.nombre}
                    className="
                      w-24
                      h-24
                      rounded-2xl
                      object-cover
                      bg-gray-100
                    "
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    <h2
                      className="
                        text-xl
                        font-bold
                        dark:text-white
                      "
                    >
                      {item.nombre}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Categoría:
                      {" "}
                      {item.categoria}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                        mt-3
                      "
                    >

                      <span
                        className="
                          text-sm
                          px-3
                          py-1
                          rounded-full
                          bg-gray-200
                          dark:bg-gray-800
                          dark:text-white
                        "
                      >
                        Cantidad:
                        {" "}
                        {item.cantidad}
                      </span>

                      <span
                        className="
                          font-bold
                          text-lg
                          dark:text-white
                        "
                      >
                        $
                        {(
                          item.precio *
                          item.cantidad
                        ).toLocaleString("es-CO")}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* FOOTER */}
        {cart.length > 0 && (

          <div
            className="
              border-t
              dark:border-gray-800
              p-6
              md:p-8
              flex
              flex-col
              md:flex-row
              gap-5
              md:items-center
              md:justify-between
            "
          >

            <div>

              <p
                className="
                  text-gray-500
                  dark:text-gray-400
                  text-sm
                "
              >
                Total de la compra
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  dark:text-white
                "
              >
                $
                {total.toLocaleString(
                  "es-CO"
                )}
              </h2>

            </div>

            <button
              onClick={handleCheckout}
              className="
                bg-black
                hover:bg-gray-800
                text-white
                px-8
                py-5
                rounded-2xl
                transition
                font-bold
                text-lg
                shadow-lg
              "
            >
              Confirmar compra
            </button>

          </div>

        )}

      </div>

    </main>

  );

}

export default Checkout;