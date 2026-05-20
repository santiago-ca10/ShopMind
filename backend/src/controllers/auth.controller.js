import bcrypt from "bcryptjs";

import Usuario from "../models/usuario.model.js";

import generateToken from "../utils/generateToken.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const {
      nombre,
      email,
      password
    } = req.body;

    // Validación básica
    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    // Verifica usuario existente
    const existingUser =
      await Usuario.findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(400).json({
        error: "El usuario ya existe",
      });
    }

    // Hash password
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // Crear usuario
    const usuario =
      new Usuario({
        nombre,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

    await usuario.save();

    res.status(201).json({
      message: "Usuario registrado",
      token: generateToken(usuario._id),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error(
      "Error register:",
      error.message
    );

    res.status(500).json({
      error: "Error al registrar",
    });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    // Buscar usuario
    const usuario =
      await Usuario.findOne({
        email: email.toLowerCase(),
      });

    if (!usuario) {
      return res.status(400).json({
        error: "Credenciales inválidas",
      });
    }

    // Verificar password
    const isMatch =
      await bcrypt.compare(
        password,
        usuario.password
      );

    if (!isMatch) {
      return res.status(400).json({
        error: "Credenciales inválidas",
      });
    }

    res.json({
      message: "Login exitoso",
      token: generateToken(usuario._id),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error(
      "Error login:",
      error.message
    );

    res.status(500).json({
      error: "Error login",
    });
  }
};
