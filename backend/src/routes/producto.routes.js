import { Router } from "express";
import {
  crearProducto,
  obtenerProductos
} from "../controllers/producto.controller.js";

const router = Router();

router.post("/productos", crearProducto);
router.get("/productos", obtenerProductos);

export default router;