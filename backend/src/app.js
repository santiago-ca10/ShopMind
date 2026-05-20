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

/* =========================
   ENVIRONMENT VARIABLES
========================= */
dotenv.config();

/* =========================
   EXPRESS APP
========================= */
const app = express();

/* =========================
   GLOBAL MIDDLEWARES
========================= */
app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   API ROUTES
========================= */
app.use("/api/productos", productoRoutes);

app.use("/api/usuarios", usuarioRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/pedidos", pedidoRoutes);

app.use("/api/ia", aiRoutes);

app.use("/api/dashboard", dashboardRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API funcionando",
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
