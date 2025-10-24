import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

// Middleware to protect routes and verify user authentication
export const protect = async (req, res, next) => {
  const token = req.cookies.token; // get token from cookies

  // if token is missing return unauthorized
  if (!token) {
    return res.status(401).json({ messsage: "Not authorized, no token" });
  }

  try {
    // verify token using jwt secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user by id from decoded token and remove password from result
    req.user = await userModel.findById(decoded.userId).select("-password");

    // move to next middleware or controller
    next();
  } catch (error) {
    // if verification fails return error
    return res.status(500).json({ message: "Not authorized, token failed" });
  }
};
