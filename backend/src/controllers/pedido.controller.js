import Pedido from "../models/pedido.model.js";
import Usuario from "../models/usuario.model.js";
import Producto from "../models/producto.model.js";

/* ========================
   CREAR PEDIDO
======================== */
export const crearPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const { productos, total } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({
        msg: "No hay productos",
      });
    }

    // VALIDAR STOCK
    for (const item of productos) {
      const productoDB = await Producto.findById(
        item.producto
      );

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

      // DESCONTAR STOCK
      productoDB.stock -= item.cantidad;

      await productoDB.save();
    }

    // CREAR PEDIDO
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
    console.log(error);

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

  } catch (error) {
    console.log(error);

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

  } catch (error) {
    console.log(error);

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

  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error actualizando estado",
    });
  }
};