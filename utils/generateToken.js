import jwt from "jsonwebtoken";

// Create a JWT token using the user ID
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Export the token generator function
export default generateToken;
