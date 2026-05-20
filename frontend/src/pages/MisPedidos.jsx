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

  // FORMAT HELPERS
  const formatPrice = (value) =>
    value.toLocaleString("es-CO");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // ESTADOS STYLE
  const estadoStyles = {
    pendiente: "bg-yellow-100 text-yellow-700",
    enviado: "bg-blue-100 text-blue-700",
    entregado: "bg-green-100 text-green-700",
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-10">
      
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-10 dark:text-white">
        Mis Pedidos
      </h1>

      {/* LISTA */}
      <div className="space-y-6 max-w-5xl mx-auto">

        {pedidos.map((pedido) => (
          <div
            key={pedido._id}
            className="
              bg-white
              dark:bg-gray-900
              border
              dark:border-gray-800
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* HEADER */}
            <div className="flex justify-between items-start mb-5">

              <div>
                <h2 className="text-lg font-bold dark:text-white">
                  Pedido #{pedido._id.slice(-6).toUpperCase()}
                </h2>

                <p className="text-sm text-gray-500">
                  {formatDate(pedido.createdAt)}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  estadoStyles[pedido.estado] || "bg-gray-200 text-gray-700"
                }`}
              >
                {pedido.estado}
              </span>

            </div>

            {/* PRODUCTOS */}
            <div className="space-y-4">

              {pedido.productos.map((item) => (
                <div
                  key={item.producto?._id}
                  className="flex items-center gap-4"
                >

                  {/* IMG */}
                  <img
                    src={
                      item.producto?.imagen ||
                      "https://picsum.photos/200"
                    }
                    alt={item.producto?.nombre}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    <p className="font-semibold dark:text-white">
                      {item.producto?.nombre}
                    </p>

                    <p className="text-sm text-gray-500">
                      Cantidad: {item.cantidad}
                    </p>

                  </div>

                  {/* SUBTOTAL */}
                  <p className="font-bold dark:text-white">
                    $
                    {formatPrice(
                      (item.precio || 0) * item.cantidad
                    )}
                  </p>

                </div>
              ))}

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-800">

              <span className="text-gray-500">
                Total
              </span>

              <span className="text-2xl font-bold dark:text-white">
                ${formatPrice(pedido.total)}
              </span>

            </div>

          </div>
        ))}

      </div>
    </main>
  );
}

export default MisPedidos;