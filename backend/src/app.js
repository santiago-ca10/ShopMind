import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productoRoutes from "./routes/producto.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api", productoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo");
});