import {
  useEffect,
  useState
} from 'react';

function Admin() {
  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState({
      nombre: '',
      categoria: '',
      precio: '',
      stock: '',
      imagen: '',
      descripcion: ''
    });

  const [productToDelete,
    setProductToDelete] =
    useState(null);

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  // LOAD PRODUCTS
  useEffect(() => {
    fetch(
      'http://localhost:3000/api/productos'
    )
      .then((res) => res.json())
      .then((data) =>
        setProducts(data)
      );
  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditingProduct(product);

    setForm({
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
      descripcion:
        product.descripcion
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // CREATE / UPDATE PRODUCT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      // UPDATE
      if (editingProduct) {
        const response =
          await fetch(
            `http://localhost:3000/api/productos/${editingProduct._id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type':
                  'application/json'
              },
              body: JSON.stringify(
                form
              )
            }
          );

        const updatedProduct =
          await response.json();

        setProducts((prev) =>
          prev.map((product) =>
            product._id ===
            editingProduct._id
              ? updatedProduct
              : product
          )
        );

        setEditingProduct(null);
      }

      // CREATE
      else {
        const response =
          await fetch(
            'http://localhost:3000/api/productos',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json'
              },
              body: JSON.stringify(
                form
              )
            }
          );

        const newProduct =
          await response.json();

        setProducts((prev) => [
          ...prev,
          newProduct
        ]);
      }

      // CLEAR FORM
      setForm({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        imagen: '',
        descripcion: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/productos/${productToDelete}`,
        {
          method: 'DELETE'
        }
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product._id !==
            productToDelete
        )
      );

      setProductToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Panel Admin
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg mb-10 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL Imagen"
          value={form.imagen}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white md:col-span-2"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="p-4 rounded-xl border dark:bg-gray-800 dark:text-white md:col-span-2"
        />

        <button
          type="submit"
          className="bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition md:col-span-2"
        >
          {editingProduct
            ? 'Actualizar producto'
            : 'Crear producto'}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">
                Producto
              </th>

              <th className="p-4 text-left">
                Categoría
              </th>

              <th className="p-4 text-left">
                Precio
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={product._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="p-4 dark:text-white">
                    {
                      product.nombre
                    }
                  </td>

                  <td className="p-4 dark:text-gray-300">
                    {
                      product.categoria
                    }
                  </td>

                  <td className="p-4 dark:text-white">
                    $
                    {
                      product.precio
                    }
                  </td>

                  <td className="p-4 dark:text-white">
                    {
                      product.stock
                    }
                  </td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() =>
                        handleEdit(
                          product
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        setProductToDelete(
                          product._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-[400px]">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Confirmar eliminación
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Deseas eliminar este
              producto?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() =>
                  setProductToDelete(
                    null
                  )
                }
                className="px-5 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Admin;