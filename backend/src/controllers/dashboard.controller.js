import Usuario from "../models/usuario.model.js";
import Producto from "../models/producto.model.js";
import Pedido from "../models/pedido.model.js";

/* ========================
   DASHBOARD GENERAL
======================== */
export const getStats = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalProductos = await Producto.countDocuments();
    const totalPedidos = await Pedido.countDocuments();

    // ventas totales
    const pedidos = await Pedido.find();

    const totalVentas = pedidos.reduce(
      (acc, p) => acc + (p.total || 0),
      0
    );

    /* ========================
       GRÁFICO DE VENTAS POR DÍA
    ======================== */

    const ventasPorDiaMap = {};

    pedidos.forEach((pedido) => {
      const fecha = new Date(pedido.createdAt)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD

      if (!ventasPorDiaMap[fecha]) {
        ventasPorDiaMap[fecha] = 0;
      }

      ventasPorDiaMap[fecha] += pedido.total;
    });

    const ventasPorDia = Object.entries(ventasPorDiaMap).map(
      ([date, total]) => ({
        date,
        total,
      })
    );

    // pedidos recientes
    const ultimosPedidos = await Pedido.find()
      .populate("usuario", "nombre email")
      .sort({ createdAt: -1 })
      .limit(5);

    // productos más vendidos
    const productosVendidos = {};

    pedidos.forEach((pedido) => {
      pedido.productos.forEach((p) => {
        const id = p.producto.toString();

        if (!productosVendidos[id]) {
          productosVendidos[id] = 0;
        }

        productosVendidos[id] += p.cantidad;
      });
    });

    const topProductosIds = Object.entries(productosVendidos)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topProductos = await Producto.find({
      _id: { $in: topProductosIds },
    });

    res.json({
      totalUsuarios,
      totalProductos,
      totalPedidos,
      totalVentas,

      
      ventasPorDia,

      ultimosPedidos,
      topProductos,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en dashboard" });
  }
};