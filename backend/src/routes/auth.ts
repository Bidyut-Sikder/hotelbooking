import express, { Response, Request } from "express";
import { userLoginCheckMiddleware } from "../middleware/middleware";
import { validationResult } from "express-validator";
import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  userLoginCheckMiddleware,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials." });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials." });
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        domain:'.vercel.app'
      });

      res.status(200).json({ userId: user.id });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  // console.log(req.userId)
  res.status(200).send({ userId: req.userId });
  return;
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully." });
  return;
});

export default router;
