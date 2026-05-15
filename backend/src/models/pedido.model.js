import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
        },
        cantidad: Number,
        precio: Number,
      },
    ],
    total: Number,
    estado: {
      type: String,
      enum: ["pendiente", "enviado", "entregado"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pedido", pedidoSchema);
