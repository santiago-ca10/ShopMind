import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SidebarCart from './components/layout/SidebarCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar setIsCartOpen={setIsCartOpen} />

      <SidebarCart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;