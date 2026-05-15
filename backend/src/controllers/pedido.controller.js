import Pedido from "../models/pedido.model.js";
import Usuario from "../models/usuario.model.js";
import Producto from "../models/producto.model.js";

/* ========================
   CREAR PEDIDO (CHECKOUT)
======================== */
export const crearPedido = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const usuario = await Usuario.findById(usuarioId).populate(
      "carrito.producto"
    );

    if (!usuario.carrito.length) {
      return res.status(400).json({ msg: "Carrito vacío" });
    }

    let total = 0;

    const productosFormateados = [];

    for (const item of usuario.carrito) {
      const producto = item.producto;

      // validar stock
      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          msg: `Stock insuficiente para ${producto.nombre}`,
        });
      }

      // descontar stock
      producto.stock -= item.cantidad;
      await producto.save();

      total += producto.precio * item.cantidad;

      productosFormateados.push({
        producto: producto._id,
        cantidad: item.cantidad,
        precio: producto.precio,
      });
    }

    const pedido = await Pedido.create({
      usuario: usuarioId,
      productos: productosFormateados,
      total,
      estado: "pendiente",
    });

    // vaciar carrito
    usuario.carrito = [];
    await usuario.save();

    return res.status(201).json({
      msg: "Pedido creado correctamente",
      pedido,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error creando pedido" });
  }
};

/* ========================
   MIS PEDIDOS
======================== */
export const obtenerMisPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.user.id })
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo pedidos" });
  }
};

/* ========================
   ADMIN - TODOS LOS PEDIDOS
======================== */
export const obtenerPedidosAdmin = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre email")
      .populate("productos.producto")
      .sort({ createdAt: -1 });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo pedidos" });
  }
};
