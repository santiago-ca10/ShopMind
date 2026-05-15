import bcrypt from 'bcryptjs';

import Usuario from '../models/usuario.model.js';

import generateToken from '../utils/generateToken.js';


// REGISTER
export const register =
  async (req, res) => {
    try {
      const {
        nombre,
        email,
        password
      } = req.body;

      // CHECK USER
      const existingUser =
        await Usuario.findOne({
          email
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            error:
              'El usuario ya existe'
          });
      }

      // HASH PASSWORD
      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // CREATE USER
      const usuario =
        new Usuario({
          nombre,
          email,
          password:
            hashedPassword
        });

      await usuario.save();

      res.json({
        message:
          'Usuario registrado',
        token:
          generateToken(
            usuario._id
          ),
        usuario: {
          id: usuario._id,
          nombre:
            usuario.nombre,
          email:
            usuario.email,
          role:
            usuario.role
        }
      });
    } catch (error) {
      res.status(500).json({
        error:
          'Error al registrar'
      });
    }
  };


// LOGIN
export const login =
  async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;

      // FIND USER
      const usuario =
        await Usuario.findOne({
          email
        });

      if (!usuario) {
        return res
          .status(400)
          .json({
            error:
              'Usuario no encontrado'
          });
      }

      // CHECK PASSWORD
      const isMatch =
        await bcrypt.compare(
          password,
          usuario.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            error:
              'Contraseña incorrecta'
          });
      }

      res.json({
        message:
          'Login exitoso',
        token:
          generateToken(
            usuario._id
          ),
        usuario: {
          id: usuario._id,
          nombre:
            usuario.nombre,
          email:
            usuario.email,
          role:
            usuario.role
        }
      });
    } catch (error) {
      res.status(500).json({
        error:
          'Error login'
      });
    }
  };