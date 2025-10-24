import express from "express";
import { protect } from "../middlewares/user.middlewares.js";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/", protect, getCurrentUser);
userRoutes.post("/signup", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

export default userRoutes;
