import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

/**
 * Middleware de protección de rutas
 * Verifica JWT y adjunta el usuario autenticado
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Verifica encabezado Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verifica token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Busca usuario autenticado
      const user = await Usuario.findById(decoded.id)
        .select("-password");

      // Verifica que el usuario exista
      if (!user) {
        return res.status(401).json({
          msg: "Usuario no encontrado",
        });
      }

      req.user = user;

      next();
    } else {
      return res.status(401).json({
        msg: "No autorizado, token requerido",
      });
    }
  } catch (error) {
    console.error("Error auth middleware:", error.message);

    return res.status(401).json({
      msg: "Token inválido",
    });
  }
};

export default protect;
