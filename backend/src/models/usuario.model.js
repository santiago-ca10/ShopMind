import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,

  carrito: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto"
      },
      cantidad: Number
    }
  ],

  historial: [
    {
      productos: [],
      total: Number,
      fecha: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export default mongoose.model("Usuario", usuarioSchema);
