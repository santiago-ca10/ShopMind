import { Router } from "express";
import {
  agregarAlCarrito,
  verCarrito,
  comprar
} from "../controllers/usuario.controller.js";
import { crearUsuario } from "../controllers/usuario.controller.js";
    
const router = Router();

router.post("/carrito", agregarAlCarrito);
router.get("/carrito/:usuarioId", verCarrito);
router.post("/comprar/:usuarioId", comprar);
router.post("/usuarios", crearUsuario);

export default router;