import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function MisPedidos() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/pedidos/mis-pedidos");
        setOrders(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Error cargando pedidos");
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100 dark:bg-black">

      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Mis Pedidos
      </h1>

      <div className="space-y-4">

        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow"
          >

            <div className="flex justify-between">

              <p className="dark:text-white">
                Pedido #{o._id.slice(-6)}
              </p>

              <span className="px-3 py-1 rounded bg-gray-700 text-white">
                {o.estado}
              </span>

            </div>

            <p className="mt-2 dark:text-gray-300">
              Total: ${o.total}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(o.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MisPedidos;