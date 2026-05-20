import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";

import productoRoutes from "./routes/producto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import authRoutes from "./routes/auth.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();

const app = express();

/* ========================
   MIDDLEWARES
======================== */
app.use(cors());

app.use(express.json());

/* ========================
   DATABASE
======================== */
connectDB();

/* ========================
   ROUTES
======================== */

// productos
app.use("/api/productos", productoRoutes);

// usuarios
app.use("/api/usuarios", usuarioRoutes);

// auth
app.use("/api/auth", authRoutes);

// pedidos
app.use("/api/pedidos", pedidoRoutes);

// IA
app.use("/api/ia", aiRoutes);

// dashboard
app.use("/api/dashboard", dashboardRoutes);

/* ========================
   TEST
======================== */
app.get("/", (req, res) => {
  res.json({
    msg: "API funcionando 🚀",
  });
});

/* ========================
   SERVER
======================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});