import { useContext } from 'react';

import { CartContext } from '../context/cart.context';

function Checkout() {
  const { cart, total } =
    useContext(CartContext);

  const taxes = total * 0.19;

  const finalTotal = total + taxes;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* PRODUCTS */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Productos
          </h2>

          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-bold dark:text-white">
                    {item.nombre}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    ${item.precio}
                  </p>
                </div>

                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Resumen
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="dark:text-gray-300">
                Subtotal
              </span>

              <span className="font-bold dark:text-white">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="dark:text-gray-300">
                IVA (19%)
              </span>

              <span className="font-bold dark:text-white">
                ${taxes.toFixed(2)}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span className="dark:text-white">
                Total
              </span>

              <span className="dark:text-white">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button className="w-full mt-8 bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition">
            Proceder al pago
          </button>
        </div>
      </div>
    </main>
  );
}

export default Checkout;