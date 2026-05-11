import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

function SidebarCart({
  isCartOpen,
  setIsCartOpen
}) {
  const {
    cart,
    removeFromCart,
    total
  } = useContext(CartContext);

  return (
    <>
      {/* OVERLAY */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isCartOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">
            Carrito
          </h2>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
            className="text-xl"
          >
            ✖
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">
              Tu carrito está vacío
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 shadow-sm"
              >
                <h3 className="font-bold">
                  {item.nombre}
                </h3>

                <p className="text-gray-600">
                  ${item.precio}
                </p>

                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="mt-3 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t p-5">
          <h3 className="text-2xl font-bold mb-4">
            Total: ${total}
          </h3>

          <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition">
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarCart;