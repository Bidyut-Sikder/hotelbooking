import express, { Request, Response } from "express";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";
import { userRegisterCheckMiddleware } from "../middleware/middleware";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.post(
  "/register",
  userRegisterCheckMiddleware,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      user = new UserModel(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true, // process.env.NODE_ENV === "production", // true only in production
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ message: "User created successfully." });

      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering user." });
    }
  }
);

export default router;
