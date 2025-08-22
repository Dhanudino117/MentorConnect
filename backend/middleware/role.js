// backend/middleware/role.js
export const requireRole = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });
    if (!allowed.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden for role: " + req.user.role });
    next();
  };
};
