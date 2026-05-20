import Usuario from "../models/usuario.model.js";
import Producto from "../models/producto.model.js";

export const comprar = async (req, res) => {
  try {

    const {
      usuarioId,
      productos
    } = req.body;

    const usuario =
      await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    if (
      !productos ||
      !productos.length
    ) {
      return res.status(400).json({
        error: "No hay productos"
      });
    }

    let total = 0;

    for (const item of productos) {

      const producto =
        await Producto.findById(item._id);

      if (!producto) {
        return res.status(404).json({
          error: "Producto no encontrado"
        });
      }

      if (
        producto.stock <
        item.cantidad
      ) {
        return res.status(400).json({
          error: `Stock insuficiente para ${producto.nombre}`
        });
      }

      producto.stock -= item.cantidad;

      await producto.save();

      total +=
        producto.precio *
        item.cantidad;
    }

    return res.json({
      mensaje: "Compra realizada",
      total
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error: "Error en compra"
    });
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