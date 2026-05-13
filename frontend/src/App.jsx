import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SidebarCart from './components/layout/SidebarCart';

function App() {
  const [isCartOpen, setIsCartOpen] =
    useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <Navbar
          setIsCartOpen={setIsCartOpen}
        />

        {/* SIDEBAR CART */}
        <SidebarCart
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />

        {/* PAGES */}
        <main className="flex-1">
          <Routes>

            <Route
              path="/admin"
              element={<Admin />}
            />


            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
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