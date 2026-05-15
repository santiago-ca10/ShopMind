import Producto from "../models/producto.model.js";

// CREATE
export const crearProducto = async (
  req,
  res
) => {
  try {
    const producto = new Producto(
      req.body
    );

    await producto.save();

    res.json(producto);
  } catch (error) {
    res.status(500).json({
      error:
        "Error al crear producto",
    });
  }
};

// READ
export const obtenerProductos =
  async (req, res) => {
    try {
      const productos =
        await Producto.find();

      res.json(productos);
    } catch (error) {
      res.status(500).json({
        error:
          "Error al obtener productos",
      });
    }
  };

// UPDATE
export const actualizarProducto =
  async (req, res) => {
    try {
      const producto =
        await Producto.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(producto);
    } catch (error) {
      res.status(500).json({
        error:
          "Error al actualizar producto",
      });
    }
  };

// DELETE
export const eliminarProducto =
  async (req, res) => {
    try {
      await Producto.findByIdAndDelete(
        req.params.id
      );

      res.json({
        mensaje:
          "Producto eliminado",
      });
    } catch (error) {
      res.status(500).json({
        error:
          "Error al eliminar producto",
      });
    }
  };
