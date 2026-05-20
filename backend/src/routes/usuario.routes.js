import express from "express";

import {
  comprar,
  crearUsuario
} from "../controllers/usuario.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Usuarios
|--------------------------------------------------------------------------
*/

router.post(
  "/crear",
  crearUsuario
);

/*
|--------------------------------------------------------------------------
| Compras
|--------------------------------------------------------------------------
*/

router.post(
  "/comprar",
  comprar
);

export default router;