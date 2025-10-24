import express from "express";
import { protect } from "../middlewares/user.middlewares.js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";

// Create a new router for user related routes
const userRoutes = express.Router();

// Get current logged in user only if authenticated
userRoutes.get("/", protect, getCurrentUser);

// Register a new user
userRoutes.post("/signup", registerUser);

// Login an existing user
userRoutes.post("/login", loginUser);

// Logout the current user
userRoutes.post("/logout", logoutUser);

// Export the router
export default userRoutes;
