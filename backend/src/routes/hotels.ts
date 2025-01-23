import express, { Request, Response } from "express";
import HotelModel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 2; //number of items should be shown on per page
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightASC":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDSC":
        sortOptions = { starRating: -1 };
        break;
      default:
        break;
    }

    const hotels = await HotelModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    let total;
    if (
      req.query.destination === "" &&
      req.query.adultCount === "1" &&
      req.query.childCount === "0"
    ) {
      total = await HotelModel.countDocuments();
    }

    total = await HotelModel.countDocuments(query);

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

const constructSearchQuery = (queryParams: any) => {
  const constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    constructedQuery.starRating = { $eq: parseInt(queryParams.stars) };
  }
  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = { $lte: parseInt(queryParams.maxPrice) };
  }

  // console.log(constructedQuery)

  return constructedQuery;
};
// constructSearchQuery({ destination: "ffd",
//   adultCount: 2, childCount: 3 ,
//   facilities:['facilty1','facility2'],
//   types:['typp1','type2'],
//   stars:"3",
//   maxPrice:3

// });
