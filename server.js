import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 4040;

app.use(cookieParser());

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
