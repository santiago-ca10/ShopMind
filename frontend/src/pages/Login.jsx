import {
  useContext,
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import { AuthContext }
  from "../context/auth.context";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

  // HANDLE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  // SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const response =
        await login(
          form.email,
          form.password
        );

      if (
        response.success
      ) {
        toast.success(
          "Bienvenido 🔥"
        );

        // REDIRECCIÓN
        if (
          response.usuario
            ?.role === "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } else {
        toast.error(
          response.error
        );
      }
    };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center px-6 transition-colors duration-300">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          Iniciar Sesión
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={
              handleChange
            }
            className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className="bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Iniciar sesión
          </button>

        </form>

        {/* REGISTER */}
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">

          ¿No tienes cuenta?{" "}

          <Link
            to="/register"
            className="font-bold text-black dark:text-white"
          >
            Crear cuenta
          </Link>

        </p>

      </div>
    </main>
  );
}

export default Login;