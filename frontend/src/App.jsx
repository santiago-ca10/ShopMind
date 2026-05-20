import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MisPedidos from "./pages/MisPedidos";
import Assistant from "./pages/Assistant";

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
            <Route
              path="/"
              element={<Home />}
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* CART */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* MIS PEDIDOS */}
            <Route
              path="/mis-pedidos"
              element={
                <ProtectedRoute>
                  <MisPedidos />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* ASSISTANT */}
            <Route
              path="/assistant"
              element={<Assistant />}
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