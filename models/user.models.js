import mongoose from "mongoose";

// Define the user schema with required fields
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // user email must be unique
  username: { type: String, required: true, unique: true }, // username must be unique
  password: { type: String, required: true }, // store hashed password
});

// Create a model based on the schema
const userModel = mongoose.model("User", userSchema);

// Export the model for use in other files
export default userModel;
