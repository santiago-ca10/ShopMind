import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // 📦 LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, dashboardRes] = await Promise.all([
          API.get("/productos"),
          API.get("/dashboard"),
        ]);

        setProducts(productsRes.data);
        setDashboard(dashboardRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Error cargando datos");
      }
    };

    loadData();
  }, []);

  // INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // EDIT
  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
      descripcion: product.descripcion,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        const res = await API.put(
          `/productos/${editingProduct._id}`,
          form
        );

        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id ? res.data : p
          )
        );

        toast.success("Producto actualizado ✨");
        setEditingProduct(null);
      } else {
        const res = await API.post("/productos", form);

        setProducts((prev) => [...prev, res.data]);

        toast.success("Producto creado 🚀");
      }

      setForm({
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        imagen: "",
        descripcion: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error en operación");
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      await API.delete(`/productos/${productToDelete}`);

      setProducts((prev) =>
        prev.filter((p) => p._id !== productToDelete)
      );

      setProductToDelete(null);
      toast.success("Producto eliminado 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Error eliminando");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10">

      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Panel Admin
      </h1>

      {/* DASHBOARD */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <Card title="Ventas" value={`$${dashboard.totalVentas}`} />
          <Card title="Pedidos" value={dashboard.totalPedidos} />
          <Card title="Productos" value={dashboard.totalProductos} />
          <Card title="Usuarios" value={dashboard.totalUsuarios} />

        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {Object.keys(form).map((key) => (
          key !== "descripcion" ? (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
            />
          ) : (
            <textarea
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder="Descripción"
              className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white md:col-span-2"
            />
          )
        ))}

        <button className="bg-black text-white py-4 rounded-xl md:col-span-2">
          {editingProduct ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b dark:border-gray-700">

                <td className="p-4 dark:text-white">{p.nombre}</td>
                <td className="p-4 dark:text-gray-300">{p.categoria}</td>
                <td className="p-4 dark:text-white">${p.precio}</td>
                <td className="p-4 dark:text-white">{p.stock}</td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => setProductToDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">

            <p className="mb-4">¿Eliminar producto?</p>

            <div className="flex gap-4 justify-end">

              <button onClick={() => setProductToDelete(null)}>
                Cancelar
              </button>

              <button onClick={handleDelete} className="text-red-500">
                Eliminar
              </button>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}

// mini card component
const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-3xl font-bold dark:text-white">{value}</p>
  </div>
);

export default Admin;