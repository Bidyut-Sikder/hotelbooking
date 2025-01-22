import express, { Request, Response } from "express";
import HotelModel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );


    const skip = (pageNumber - 1) * pageSize;

    const hotels = await HotelModel.find().skip(skip).limit(pageSize);
    const total = await HotelModel.countDocuments();

    const totalPages = Math.ceil(total / pageSize);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: totalPages, // total number of pages
      },
    };

    res.status(200).json(response);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

export default router;
