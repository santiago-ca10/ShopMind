import { useEffect, useState } from 'react';

import { CartContext } from './cart.context';

function CartProvider({ children }) {
  // LOAD FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem('cart');

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );
  }, [cart]);

  // ADD PRODUCT
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.precio,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
