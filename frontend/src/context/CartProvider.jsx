import { useEffect, useState } from 'react';

import { CartContext }
  from './cart.context';

function CartProvider({ children }) {

  // LOAD STORAGE
  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem('cart');

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  // SAVE STORAGE
  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

  }, [cart]);

  // ADD PRODUCT
  const addToCart = (product) => {

    setCart((prev) => {

      const existing =
        prev.find(
          (item) =>
            item._id === product._id
        );

      // SI YA EXISTE
      if (existing) {

        return prev.map((item) =>

          item._id === product._id
            ? {
                ...item,
                cantidad:
                  item.cantidad + 1
              }
            : item

        );

      }

      // SI NO EXISTE
      return [
        ...prev,
        {
          ...product,
          cantidad: 1
        }
      ];

    });

  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {

    setCart((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );

  };

  // INCREASE
  const increaseQuantity = (id) => {

    setCart((prev) =>
      prev.map((item) =>

        item._id === id
          ? {
              ...item,
              cantidad:
                item.cantidad + 1
            }
          : item

      )
    );

  };

  // DECREASE
  const decreaseQuantity = (id) => {

    setCart((prev) =>

      prev
        .map((item) => {

          if (item._id === id) {

            return {
              ...item,
              cantidad:
                item.cantidad - 1
            };

          }

          return item;

        })
        .filter(
          (item) => item.cantidad > 0
        )

    );

  };

  // CLEAR
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL
  const total = cart.reduce(

    (acc, item) =>

      acc +
      item.precio * item.cantidad,

    0

  );

  // TOTAL ITEMS
  const totalItems = cart.reduce(

    (acc, item) =>

      acc + item.cantidad,

    0

  );

  return (
    <CartContext.Provider
      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        total,

        totalItems

      }}
    >
      {children}
    </CartContext.Provider>
  );

}

export default CartProvider;