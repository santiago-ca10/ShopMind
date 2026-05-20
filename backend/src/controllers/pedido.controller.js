import Pedido from "../models/pedido.model.js";
import Producto from "../models/producto.model.js";

/* ========================
   CREAR PEDIDO
======================== */
export const crearPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({
        msg: "No hay productos",
      });
    }

    // 1. VALIDAR TODO EL STOCK PRIMERO
    for (const item of productos) {
      const productoDB = await Producto.findById(item.producto);

      if (!productoDB) {
        return res.status(404).json({
          msg: "Producto no encontrado",
        });
      }

      if (productoDB.stock < item.cantidad) {
        return res.status(400).json({
          msg: `Stock insuficiente para ${productoDB.nombre}`,
        });
      }
    }

    // 2. DESCONTAR STOCK
    for (const item of productos) {
      await Producto.findByIdAndUpdate(item.producto, {
        $inc: { stock: -item.cantidad },
      });
    }

    // 3. CALCULAR TOTAL EN BACKEND (IMPORTANTE)
    let total = 0;

    for (const item of productos) {
      const productoDB = await Producto.findById(item.producto);
      total += productoDB.precio * item.cantidad;
    }

    // 4. CREAR PEDIDO
    const pedido = await Pedido.create({
      usuario: usuarioId,
      productos,
      total,
      estado: "pendiente",
    });

    res.status(201).json({
      msg: "Pedido creado",
      pedido,
    });

  } catch (error) {
    res.status(500).json({
      msg: "Error creando pedido",
    });
  }
};

/* ========================
   MIS PEDIDOS
======================== */
export const obtenerMisPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({
      usuario: req.user.id,
    })
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);

  } catch {
    res.status(500).json({
      msg: "Error obteniendo pedidos",
    });
  }
};

/* ========================
   ADMIN PEDIDOS
======================== */
export const obtenerPedidosAdmin = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre email")
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);

  } catch {
    res.status(500).json({
      msg: "Error obteniendo pedidos",
    });
  }
};

/* ========================
   ACTUALIZAR ESTADO
======================== */
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = [
      "pendiente",
      "enviado",
      "entregado",
    ];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        msg: "Estado inválido",
      });
    }

    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({
        msg: "Pedido no encontrado",
      });
    }

    pedido.estado = estado;

    await pedido.save();

    res.json({
      msg: "Estado actualizado",
      pedido,
    });

  } catch {
    res.status(500).json({
      msg: "Error actualizando estado",
    });
  }
};
