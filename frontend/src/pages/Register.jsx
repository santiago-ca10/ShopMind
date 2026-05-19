import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      localStorage.setItem(
        "shopmind-token",
        res.data.token
      );

      localStorage.setItem(
        "shopmind-user",
        JSON.stringify(res.data.usuario)
      );

      toast.success(
        "Cuenta creada 🚀"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.error ||
          "Error registrando"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-5">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Crear Cuenta
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition">
            Crear cuenta
          </button>

        </div>

        <p className="text-center mt-6 text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-black dark:text-white font-bold"
          >
            Inicia sesión
          </Link>
        </p>

      </form>
    </main>
  );
}

export default Register;