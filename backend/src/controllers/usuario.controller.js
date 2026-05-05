import Usuario from "../models/usuario.model.js";
import Producto from "../models/producto.model.js";

export const agregarAlCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    const producto = await Producto.findById(productoId);

    if (!producto || producto.stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente" });
    }

    // Ver si ya está en carrito
    const item = usuario.carrito.find(
      p => p.productoId.toString() === productoId
    );

    if (item) {
      item.cantidad += cantidad;
    } else {
      usuario.carrito.push({ productoId, cantidad });
    }

    await usuario.save();

    res.json(usuario.carrito);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

export const verCarrito = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId)
      .populate("carrito.productoId");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario.carrito || []);
  } catch (error) {
    res.status(500).json({ error: "Error al ver carrito" });
  }
};


export const comprar = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!usuario.carrito.length) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    let total = 0;

    for (let item of usuario.carrito) {
      const producto = await Producto.findById(item.productoId);

      if (!producto || producto.stock < item.cantidad) {
        return res.status(400).json({ error: "Stock insuficiente" });
      }

      producto.stock -= item.cantidad;
      total += producto.precio * item.cantidad;

      await producto.save();
    }

    usuario.historial.push({
      productos: usuario.carrito,
      total
    });

    usuario.carrito = [];

    await usuario.save();

    res.json({ mensaje: "Compra realizada", total });

  } catch (error) {
    res.status(500).json({ error: "Error en compra" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};