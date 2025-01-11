import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("MongoDB connected");
    console.log(process.env.MONGODB_CONNECTION_STRING);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
