import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      console.log("Connecting to MongoDB Development");
      await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING_DEV as string
      );

      return;
    }

    if (process.env.NODE_ENV === "test") {
      console.log("Connecting to MongoDB TestMode");
      await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING_TEST as string
      );

      return;
    }

    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("connected to production Database");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;
