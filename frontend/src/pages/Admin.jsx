import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);

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

  /* ========================
     LOAD ALL DATA (DEBUG REAL)
  ======================== */
  useEffect(() => {
    const loadData = async () => {
      try {
        const productsRes = await API.get("/productos");
        console.log("✔ productos OK");

        const dashboardRes = await API.get("/dashboard");
        console.log("✔ dashboard OK");

        const ordersRes = await API.get("/pedidos");
        console.log("✔ pedidos OK");

        setProducts(productsRes.data);
        setDashboard(dashboardRes.data);
        setOrders(ordersRes.data);

      } catch (error) {
        console.log("🔥 ERROR REAL COMPLETO:");
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.message);

        toast.error(
          error.response?.data?.msg || "Error cargando datos"
        );
      }
    };

    loadData();
  }, []);

  /* ========================
     INPUTS
  ======================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ========================
     EDIT PRODUCT
  ======================== */
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

  /* ========================
     CREATE / UPDATE
  ======================== */
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
      console.log(error);
      toast.error("Error en operación");
    }
  };

  /* ========================
     DELETE PRODUCT
  ======================== */
  const handleDelete = async () => {
    try {
      await API.delete(`/productos/${productToDelete}`);

      setProducts((prev) =>
        prev.filter((p) => p._id !== productToDelete)
      );

      setProductToDelete(null);
      toast.success("Producto eliminado 🗑️");

    } catch (error) {
      console.log(error);
      toast.error("Error eliminando");
    }
  };

  /* ========================
     CHANGE ORDER STATUS
  ======================== */
  const changeOrderStatus = async (id, estado) => {
    try {
      await API.put(`/pedidos/${id}`, { estado });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, estado } : o
        )
      );

      toast.success("Estado actualizado");

    } catch (error) {
      console.log(error);
      toast.error("Error actualizando pedido");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10">

      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Panel Admin
      </h1>

      {/* ================= DASHBOARD ================= */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <Card title="Ventas" value={`$${dashboard.totalVentas}`} />
          <Card title="Pedidos" value={dashboard.totalPedidos} />
          <Card title="Productos" value={dashboard.totalProductos} />
          <Card title="Usuarios" value={dashboard.totalUsuarios} />

        </div>
      )}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {Object.keys(form).map((key) =>
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
        )}

        <button className="bg-black text-white py-4 rounded-xl md:col-span-2">
          {editingProduct ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* ================= PRODUCTS ================= */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden mb-10">

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

      {/* ================= ORDERS ================= */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Pedidos
        </h2>

        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Usuario</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b dark:border-gray-700">

                <td className="p-3 dark:text-white">
                  {o.usuario?.nombre}
                </td>

                <td className="p-3 dark:text-white">
                  ${o.total}
                </td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded bg-gray-700 text-white">
                    {o.estado}
                  </span>
                </td>

                <td className="p-3">
                  <select
                    value={o.estado}
                    onChange={(e) =>
                      changeOrderStatus(o._id, e.target.value)
                    }
                    className="p-2 rounded"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
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

const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-3xl font-bold dark:text-white">{value}</p>
  </div>
);

export default Admin;