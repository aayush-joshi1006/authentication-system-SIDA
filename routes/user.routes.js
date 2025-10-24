import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", protect, getCurrentUser);
userRoutes.post("/signup", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

export default userRoutes;
