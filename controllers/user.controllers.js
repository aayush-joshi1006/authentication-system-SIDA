import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Get the current logged in user if authenticated
export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }
  return res.status(200).json({ user: req.user });
};

// Login user with email and password
export const loginUser = async (req, res) => {
  const email = req.body?.email.trim().toLowerCase();
  const password = req.body?.password.trim();

  // check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password both required" });
  }

  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // validate password strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
    });
  }

  try {
    // find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // compare entered password with stored hashed password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // generate auth token
    const token = generateToken(user._id);

    // store token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return success response
    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const email = req.body?.email.trim().toLowerCase();
  const password = req.body?.password.trim();
  const username = req.body.username?.trim();

  // check required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password both required" });
  }

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // validate password strength
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
    });
  }

  try {
    // check if email already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // check if username already taken
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists, try something else" });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // return success response
    return res
      .status(201)
      .json({ message: "User registered successfully. You can login now" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Logout user and clear token cookie
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logout successful" });
};
