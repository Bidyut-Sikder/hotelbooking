import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import connectDB from "./config/db";

connectDB()
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from api" });
});

// connecting frontend and backend
// app.use(express.static("../frontend/dist"));

// app.use("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  
app.listen(7000, async () => {
  console.log("server is running on localhost:7000");
});
