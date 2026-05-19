import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

import { CartContext } from "../context/cart.context";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.precio,
    0
  );

  // CHECKOUT
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem(
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
      const productos = cart.map((item) => ({
        producto: item._id,
        cantidad: 1,
        precio: item.precio,
      }));

      // ENVIAR PEDIDO
      const response = await API.post(
        "/pedidos/checkout",
        {
          productos,
          total,
        }
      );

      console.log(response.data);

      toast.success(
        "Compra realizada 🎉"
      );

      // LIMPIAR CARRITO
      clearCart();

      // REDIRECCIÓN
      navigate("/mis-pedidos");

    } catch (error) {
      console.log(error);

      console.log(
        "🔥 ERROR CHECKOUT:"
      );

      console.log(
        error.response?.data
      );

      toast.error(
        error.response?.data?.msg ||
          "Error checkout"
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10 transition-colors duration-300">

      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Checkout
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">

        {/* PRODUCTOS */}
        <div className="space-y-5">

          {cart.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">
              No hay productos en el carrito
            </p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b pb-5 dark:border-gray-700"
              >

                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold dark:text-white">
                    {item.nombre}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.precio}
                  </p>

                  <p className="text-sm text-gray-400">
                    Categoría: {item.categoria}
                  </p>

                </div>

              </div>
            ))
          )}

        </div>

        {/* TOTAL */}
        <div className="mt-10 flex justify-between items-center">

          <h2 className="text-3xl font-bold dark:text-white">
            Total: ${total}
          </h2>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            Confirmar compra
          </button>

        </div>

      </div>
    </main>
  );
}

export default Checkout;