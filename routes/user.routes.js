import express from "express";
import { protect } from "../middlewares/user.middlewares";

const userRoutes = express.Router();

userRoutes.get("/", protect, getCurrentUser);
userRoutes.post("/signup", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

export default userRoutes;
