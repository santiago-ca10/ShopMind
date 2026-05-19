import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        const res = await API.get("/pedidos/mis-pedidos");
        setPedidos(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Error cargando pedidos");
      }
    };

    loadPedidos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10">
      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Mis Pedidos
      </h1>

      <div className="space-y-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido._id}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow"
          >
            <div className="flex justify-between mb-4">
              <h2 className="font-bold dark:text-white">
                Pedido #{pedido._id.slice(-6)}
              </h2>

              <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
                {pedido.estado}
              </span>
            </div>

            <div className="space-y-3">
              {pedido.productos.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between dark:text-white"
                >
                  <span>
                    {item.producto?.nombre}
                  </span>

                  <span>
                    x{item.cantidad}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <p className="text-2xl font-bold dark:text-white">
                ${pedido.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MisPedidos;