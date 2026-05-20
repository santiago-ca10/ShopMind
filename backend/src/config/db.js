import mongoose from "mongoose";

/**
 * Conexión principal a MongoDB
 */
export const connectDB = async () => {
  try {
    // Verifica que exista la URI
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no está definida");
    }

    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);

    // Detiene la app si falla la DB
    process.exit(1);
  }
};