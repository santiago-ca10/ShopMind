import {
  useContext
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import toast from 'react-hot-toast';

import { CartContext }
  from '../context/cart.context';

function Checkout() {
  const navigate =
    useNavigate();

  const {
    cart,
    setCart
  } = useContext(
    CartContext
  );

  // TOTAL
  const total =
    cart.reduce(
      (acc, item) =>
        acc +
        item.precio,
      0
    );

  // HANDLE CHECKOUT
  const handleCheckout =
    async () => {
      try {
        const response =
          await fetch(
            'http://localhost:3000/api/pedidos',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',

                Authorization:
                  `Bearer ${localStorage.getItem(
                    'shopmind-token'
                  )}`
              },

              body:
                JSON.stringify(
                  {
                    productos:
                      cart.map(
                        (
                          item
                        ) => ({
                          nombre:
                            item.nombre,

                          precio:
                            item.precio,

                          cantidad: 1,

                          imagen:
                            item.imagen
                        })
                      ),

                    total
                  }
                )
            }
          );

        const data =
          await response.json();

        if (
          response.ok
        ) {
          toast.success(
            'Compra realizada 🎉'
          );

          // CLEAR CART
          setCart([]);

          navigate('/');
        } else {
          toast.error(
            data.error
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          'Error checkout'
        );
      }
    };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10 transition-colors duration-300">

      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Checkout
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">

        {/* PRODUCTS */}
        <div className="space-y-5">

          {cart.map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b pb-5 dark:border-gray-700"
              >

                <img
                  src={
                    item.imagen
                  }
                  alt={
                    item.nombre
                  }
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    {
                      item.nombre
                    }
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300">
                    $
                    {
                      item.precio
                    }
                  </p>
                </div>

              </div>
            )
          )}

        </div>

        {/* TOTAL */}
        <div className="mt-10 flex justify-between items-center">

          <h2 className="text-3xl font-bold dark:text-white">
            Total: ${total}
          </h2>

          <button
            onClick={
              handleCheckout
            }
            className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Confirmar compra
          </button>

        </div>

      </div>
    </main>
  );
}

export default Checkout;