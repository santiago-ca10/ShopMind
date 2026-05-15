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

    if (!usuario || usuario.carrito.length === 0) {
      return res.status(400).json({ msg: "Carrito vacío" });
    }

    let total = 0;
    const productosFormateados = [];

    for (const item of usuario.carrito) {
      const producto = item.producto;

      if (!producto) continue;

      //  validación stock
      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          msg: `Stock insuficiente para ${producto.nombre}`,
        });
      }

      //  descontar stock
      producto.stock -= item.cantidad;
      await producto.save();

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

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

    //  limpiar carrito
    usuario.carrito = [];
    await usuario.save();

    return res.status(201).json(pedido);

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

    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ msg: "Error obteniendo pedidos" });
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

    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ msg: "Error obteniendo pedidos" });
  }
};

/* ========================
    ACTUALIZAR ESTADO (ADMIN)
======================== */
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["pendiente", "enviado", "entregado"];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ msg: "Estado inválido" });
    }

    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }

    pedido.estado = estado;
    await pedido.save();

    return res.json(pedido);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error actualizando pedido" });
  }
};