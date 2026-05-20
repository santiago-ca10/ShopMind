import Producto from "../models/producto.model.js";

/* =========================
   CREATE PRODUCTO
========================= */
export const crearProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    // Validación básica
    if (!nombre || !categoria || precio == null) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
      });
    }

    const producto = new Producto({
      nombre,
      categoria,
      descripcion: req.body.descripcion || "",
      imagen: req.body.imagen || "",
      precio,
      stock: stock || 0,
    });

    await producto.save();

    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear producto",
    });
  }
};

/* =========================
   GET PRODUCTOS
========================= */
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.json(productos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener productos",
    });
  }
};

/* =========================
   UPDATE PRODUCTO
========================= */
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar producto",
    });
  }
};

/* =========================
   DELETE PRODUCTO
========================= */
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(
      req.params.id
    );

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar producto",
    });
  }
};
