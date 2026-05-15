import { Router } from "express";

import {
  crearPedido,
  obtenerMisPedidos,
  obtenerPedidosAdmin,
  actualizarEstadoPedido,
} from "../controllers/pedido.controller.js";

import protect from "../middleware/auth.middleware.js";
import verifyRole from "../middleware/role.middleware.js";

const router = Router();

/* ========================
   CHECKOUT (USUARIO)
======================== */
router.post(
  "/checkout",
  protect,
  crearPedido
);

/* ========================
   MIS PEDIDOS (USUARIO)
======================== */
router.get(
  "/mis-pedidos",
  protect,
  obtenerMisPedidos
);

/* ========================
   TODOS LOS PEDIDOS (ADMIN)
======================== */
router.get(
  "/",
  protect,
  verifyRole(["admin"]),
  obtenerPedidosAdmin
);

/* ========================
   ACTUALIZAR ESTADO DEL PEDIDO (ADMIN)
======================== */
router.put(
  "/:id/estado",
  protect,
  verifyRole(["admin"]),
  actualizarEstadoPedido
);

export default router;