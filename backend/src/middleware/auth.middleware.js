import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token =
        req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await Usuario.findById(decoded.id)
        .select("-password");

      console.log(req.user);

      next();
    } else {
      return res.status(401).json({
        msg: "No token",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      msg: "Token inválido",
    });
  }
};

export default protect;