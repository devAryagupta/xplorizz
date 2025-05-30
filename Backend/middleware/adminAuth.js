import jwt from "jsonwebtoken";
/**
 * Middleware to check if the user is an admin.
 * It verifies the JWT token and checks the user's role.
 * If the user is not an admin, it returns a 403 Forbidden response.
 */

const adminAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");// Get the Authorization header from the request
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Admin resource. Access denied" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default adminAuth;