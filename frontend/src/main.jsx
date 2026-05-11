import ReactDOM from 'react-dom/client';

import App from './App';

import { Toaster } from 'react-hot-toast';
import './styles/globals.css';

import CartProvider from './context/CartProvider';
import ThemeProvider from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <CartProvider>
      <App />
      <Toaster position="top-right"/>
    </CartProvider>
  </ThemeProvider>
);