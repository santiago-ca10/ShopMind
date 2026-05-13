import mongoose from 'mongoose';

const productoSchema =
  new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },

    categoria: {
      type: String
    },

    descripcion: {
      type: String
    },

    imagen: {
      type: String
    },

    precio: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    }
  });

const Producto = mongoose.model(
  'Producto',
  productoSchema
);

export default Producto;