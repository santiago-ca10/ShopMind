import { Router } from "express";

import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto.controller.js";

import protect from "../middleware/auth.middleware.js";
import verifyRole from "../middleware/role.middleware.js";

const router = Router();

/* ========================
   CREATE (ADMIN ONLY)
======================== */
router.post(
  "/",
  protect,
  verifyRole(["admin"]),
  crearProducto
);

/* ========================
   READ (PUBLICO)
======================== */
router.get("/", obtenerProductos);

/* ========================
   UPDATE (ADMIN ONLY)
======================== */
router.put(
  "/:id",
  protect,
  verifyRole(["admin"]),
  actualizarProducto
);

/* ========================
   DELETE (ADMIN ONLY)
======================== */
router.delete(
  "/:id",
  protect,
  verifyRole(["admin"]),
  eliminarProducto
);

export default router;
