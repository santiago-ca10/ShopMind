const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {

    console.log("ROLE:", req.user?.role);

    if (!req.user) {
      return res.status(401).json({
        msg: "No autenticado",
      });
    }

    if (
      !rolesPermitidos.includes(req.user.role)
    ) {
      return res.status(403).json({
        msg: "No autorizado",
      });
    }

    next();
  };
};

export default verifyRole;