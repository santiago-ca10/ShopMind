import { useEffect, useState } from "react";
import { CartContext } from "./cart.context";

function CartProvider({ children }) {
  // LOAD STORAGE (con protección anti-corrupt JSON)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // SAVE STORAGE
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // evita crash si storage falla
    }
  }, [cart]);

  // ADD PRODUCT
  const addToCart = (product) => {
    if (!product?._id) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cantidad: 1,
        },
      ];
    });
  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // INCREASE
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
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
              cantidad: item.cantidad - 1,
            };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // TOTAL PRICE
  const total = cart.reduce(
    (acc, item) =>
      acc + item.precio * item.cantidad,
    0
  );

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (acc, item) => acc + item.cantidad,
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
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;