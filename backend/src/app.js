import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productoRoutes from "./routes/producto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();


app.use("/api", productoRoutes);
app.use("/api", usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo");
});