import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SidebarCart from "./components/layout/SidebarCart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        {/* NAVBAR */}
        <Navbar setIsCartOpen={setIsCartOpen} />

        {/* CART SIDEBAR */}
        <SidebarCart
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />

        {/* PAGES */}
        <main className="flex-1">

          <Routes>

            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* CART */}
            <Route path="/cart" element={<Cart />} />

            {/* CHECKOUT */}
            <Route path="/checkout" element={<Checkout />} />

            {/* ADMIN PROTEGIDO */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />

          </Routes>

        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;