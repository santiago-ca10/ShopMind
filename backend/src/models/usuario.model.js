import mongoose from 'mongoose';

const usuarioSchema =
  new mongoose.Schema(
    {
      nombre: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },

      password: {
        type: String,
        required: true
      },

      role: {
        type: String,
        default: 'user'
      }
    },
    {
      timestamps: true
    }
  );

const Usuario =
  mongoose.model(
    'Usuario',
    usuarioSchema
  );

export default Usuario;