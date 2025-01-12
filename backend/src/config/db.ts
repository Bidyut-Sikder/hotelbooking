import mongoose from "mongoose";
import "dotenv/config";

console.log(process.env.NODE_ENV);
const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Connecting to MongoDB Development");
      await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING_DEV as string
      );

      return;
    }
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("MongoDB connected");
    console.log("connected to production");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
