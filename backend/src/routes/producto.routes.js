import { Router } from "express";

import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto.controller.js";

const router = Router();

// CREATE
router.post(
  "/productos",
  crearProducto
);

// READ
router.get(
  "/productos",
  obtenerProductos
);

// UPDATE
router.put(
  "/productos/:id",
  actualizarProducto
);

// DELETE
router.delete(
  "/productos/:id",
  eliminarProducto
);

export default router;
