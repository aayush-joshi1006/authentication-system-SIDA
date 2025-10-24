import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect using the MONGO_URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    // Log any connection errors and exit the process
    console.error("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

// Export the connectDB function for use in server setup
export default connectDB;
