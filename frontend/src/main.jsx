import ReactDOM from 'react-dom/client';

import App from './App';

import { Toaster } from 'react-hot-toast';

import './styles/globals.css';

import CartProvider from './context/CartProvider';
import ThemeProvider from './context/ThemeProvider';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <ThemeProvider>
    <CartProvider>
      <AuthProvider>
        <App />

        <Toaster position="top-right" />
      </AuthProvider>
    </CartProvider>
  </ThemeProvider>
);