import express, { Request, Response } from "express";

import { HotelType } from "../shared/types";
import { verifyToken } from "../middleware/auth";
import { BookingModel } from "../models/hotel";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    await BookingModel.deleteMany({ status: { $ne: "confirmed" } });

    const mybookings = await BookingModel.find({ userId: req.userId }).populate(
      "hotel"
    );

    res.status(200).json(mybookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

const bookingRoutes = router;

export default bookingRoutes;
