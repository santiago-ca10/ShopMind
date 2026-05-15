import {
  useContext,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import toast from 'react-hot-toast';

import { AuthContext }
  from '../context/auth.context';

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form, setForm] =
    useState({
      email: '',
      password: ''
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(
      form.email,
      form.password
    );

    if (success) {
      toast.success(
        'Bienvenido admin 🔥'
      );

      navigate('/admin');
    } else {
      toast.error(
        'Credenciales incorrectas'
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center px-6 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
          Login Admin
        </h1>

        <form
          onSubmit={handleSubmit}
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

        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <p className="text-sm dark:text-gray-300">
            Demo Admin:
          </p>

          <p className="text-sm font-bold dark:text-white">
            admin@shopmind.com
          </p>

          <p className="text-sm font-bold dark:text-white">
            123456
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;