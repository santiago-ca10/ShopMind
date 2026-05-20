import { useContext, useState } from 'react';

import {
  Link,
  useLocation
} from 'react-router-dom';

import { CartContext }
  from '../../context/cart.context';

import { ThemeContext }
  from '../../context/theme.context';

import { AuthContext }
  from '../../context/auth.context';

function Navbar({
  setIsCartOpen
}) {

  const [showLogoutModal,
    setShowLogoutModal] =
      useState(false);

  const { cart } =
    useContext(CartContext);

  const {
    toggleDarkMode,
    darkMode
  } = useContext(ThemeContext);

  const {
    user,
    logout
  } = useContext(AuthContext);

  const location =
    useLocation();

  const isLoginPage =
    location.pathname ===
    '/login';

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (acc, item) =>
      acc + (item.cantidad || 1),
    0
  );

  return (
    <>
      <nav className="
        sticky
        top-0
        z-30
        bg-white
        dark:bg-gray-900
        border-b
        border-gray-200
        dark:border-gray-800
        px-8
        py-4
        flex
        justify-between
        items-center
        transition-colors
        duration-300
      ">

        {/* LOGO */}
        {isLoginPage ? (
          <h1 className="
            text-3xl
            font-black
            dark:text-white
            tracking-tight
          ">
            ShopMind
          </h1>
        ) : (
          <Link to="/">
            <h1 className="
              text-3xl
              font-black
              dark:text-white
              cursor-pointer
              tracking-tight
              hover:opacity-80
              transition
            ">
              ShopMind
            </h1>
          </Link>
        )}

        {/* ACTIONS */}
        {!isLoginPage && (
          <div className="
            flex
            items-center
            gap-3
            flex-wrap
          ">

            {/* IA */}
            <Link to="/assistant">
              <button className="
                bg-purple-600
                hover:bg-purple-700
                text-white
                px-5
                py-3
                rounded-2xl
                transition
                shadow-md
                hover:scale-105
                active:scale-95
                font-medium
              ">
                🤖 IA
              </button>
            </Link>

            {/* USER */}
            {user ? (
              <>

                {/* ADMIN */}
                {user.role === 'admin' && (
                  <Link to="/admin">
                    <button className="
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      transition
                      shadow-md
                      hover:scale-105
                      active:scale-95
                      font-medium
                    ">
                      Administración
                    </button>
                  </Link>
                )}

                {/* USER */}
                {user.role === 'user' && (
                  <Link to="/mis-pedidos">
                    <button className="
                      bg-indigo-500
                      hover:bg-indigo-600
                      text-white
                      px-5
                      py-3
                      rounded-2xl
                      transition
                      shadow-md
                      hover:scale-105
                      active:scale-95
                      font-medium
                    ">
                      Mis pedidos
                    </button>
                  </Link>
                )}

                {/* LOGOUT */}
                <button
                  onClick={() =>
                    setShowLogoutModal(true)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    transition
                    shadow-md
                    hover:scale-105
                    active:scale-95
                    font-medium
                  "
                >
                  Cerrar sesión
                </button>

              </>
            ) : (

              <Link to="/login">
                <button className="
                  bg-green-500
                  hover:bg-green-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  transition
                  shadow-md
                  hover:scale-105
                  active:scale-95
                  font-medium
                ">
                  Login
                </button>
              </Link>

            )}

            {/* DARK MODE */}
            <button
              onClick={toggleDarkMode}
              className="
                bg-gray-100
                hover:bg-gray-200
                dark:bg-gray-800
                dark:hover:bg-gray-700
                dark:text-white
                px-4
                py-3
                rounded-2xl
                transition
                shadow-sm
                text-lg
              "
            >
              {darkMode
                ? '☀️'
                : '🌙'}
            </button>

            {/* CART */}
            <button
              onClick={() =>
                setIsCartOpen(true)
              }
              className="
                relative
                bg-black
                hover:bg-gray-800
                text-white
                px-5
                py-3
                rounded-2xl
                transition
                shadow-md
                hover:scale-105
                active:scale-95
                font-medium
              "
            >
              🛒 Carrito

              <span className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                min-w-[24px]
                h-6
                px-1
                rounded-full
                flex
                items-center
                justify-center
                font-bold
                shadow-lg
              ">
                {totalItems}
              </span>

            </button>

          </div>
        )}
      </nav>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
        ">

          <div className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            dark:bg-gray-900
            p-8
            shadow-2xl
            border
            border-gray-200
            dark:border-gray-800
          ">

            {/* ICON */}
            <div className="
              w-20
              h-20
              mx-auto
              rounded-3xl
              bg-red-100
              dark:bg-red-500/10
              flex
              items-center
              justify-center
              text-4xl
              mb-5
            ">
              ⚠️
            </div>

            {/* TITLE */}
            <h2 className="
              text-3xl
              font-bold
              text-center
              dark:text-white
            ">
              ¿Cerrar sesión?
            </h2>

            <p className="
              text-center
              text-gray-500
              dark:text-gray-400
              mt-3
              leading-relaxed
            ">
              Tu sesión actual se cerrará
              en este dispositivo.
            </p>

            {/* BUTTONS */}
            <div className="
              flex
              gap-3
              mt-8
            ">

              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="
                  flex-1
                  py-3
                  rounded-2xl
                  bg-gray-100
                  hover:bg-gray-200
                  dark:bg-gray-800
                  dark:hover:bg-gray-700
                  dark:text-white
                  transition
                  font-medium
                "
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="
                  flex-1
                  py-3
                  rounded-2xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition
                  font-medium
                "
              >
                Sí, salir
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

export default Navbar;