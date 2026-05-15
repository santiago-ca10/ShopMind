import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function PedidoDetalle() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/pedidos/mis-pedidos`);
      const found = res.data.find((p) => p._id === id);
      setPedido(found);
    };

    load();
  }, [id]);

  if (!pedido) return <p className="p-10">Cargando...</p>;

  return (
    <div className="p-10 dark:bg-black min-h-screen">

      <h1 className="text-3xl font-bold dark:text-white">
        Pedido Detalle
      </h1>

      <p className="text-gray-400">
        Estado: {pedido.estado}
      </p>

      <p className="text-white mt-2">
        Total: ${pedido.total}
      </p>

      <div className="mt-6">

        {pedido.productos.map((p, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 p-4 rounded-xl mb-2"
          >
            <p className="dark:text-white">
              Producto ID: {p.producto}
            </p>

            <p className="dark:text-gray-300">
              Cantidad: {p.cantidad}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default PedidoDetalle;
