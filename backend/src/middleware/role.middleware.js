/**
 * Middleware de autorización por roles
 * Permite acceso solo a roles autorizados
 */
const verifyRole = (allowedRoles = []) => {
  return (req, res, next) => {

    // Verifica autenticación
    if (!req.user) {
      return res.status(401).json({
        msg: "No autenticado",
      });
    }

    // Verifica permisos
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        msg: "No autorizado",
      });
    }

    next();
  };
};

export default verifyRole;