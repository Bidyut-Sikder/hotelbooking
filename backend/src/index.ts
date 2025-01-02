import express, { Request, Response,NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import connectDB from "./config/db";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

connectDB()
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
module.exports =app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)




// error handler 
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};


// Use the error handler middleware
app.use(errorHandler);

// Connencting backend to frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
  


  
app.listen(5000, async () => {
  console.log("server is running on localhost:5000");
});



