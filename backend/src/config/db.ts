import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    console.log(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
