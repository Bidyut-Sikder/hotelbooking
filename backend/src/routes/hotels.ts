import express, { Request, Response } from "express";
import HotelModel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import { validateHotelId } from "../middleware/middleware";

const router = express.Router();

//search facilities

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 2; //number of items should be shown on per page
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const query = constructSearchQuery(req.query);

    let sortOption = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOption = { starRating: -1 };
        break;
      case "pricePerNightASC":
        sortOption = { pricePerNight: 1 };
        break;
      case "pricePerNightDSC":
        sortOption = { pricePerNight: -1 };
        break;
      default:
        break;
    }

    const hotels = await HotelModel.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    // let total;
    // if (
    //   req.query.destination === "" &&
    //   req.query.adultCount === "1" &&
    //   req.query.childCount === "0"
    // ) {
    //   total = await HotelModel.countDocuments();
    // }

    const total = await HotelModel.countDocuments(query);

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

//getbyid(this should be placed under search facilities)
router.get("/:id", validateHotelId, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const id = req.params.id.toString();
    const hotel = await HotelModel.findById(id);
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }
    res.json(hotel);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});
export default router;

const constructSearchQuery = (queryParams: any) => {
  // console.log(queryParams)
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
      $all: queryParams.facilities,
      //if we do not put it in [] then it will work too
    };
    // constructedQuery.facilities = {
    //   $all: Array.isArray(queryParams.facilities)
    //     ? queryParams.facilities
    //     : [queryParams.facilities], //if we do not put it in [] then it will work too
    // };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types], //if we do not put it in [] then it will work too
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars
      : [parseInt(queryParams.stars)]; //if we do not put it in [] then it will work too

    constructedQuery.starRating = { $in: starRatings };
  }
  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = { $lte: parseInt(queryParams.maxPrice) };
  }

  // console.log(constructedQuery);

  return constructedQuery;
};
// constructSearchQuery({
//   destination: "ffd",
//   adultCount: 2,
//   childCount: 3,
//   facilities: ["facilty1", "facility2"],
//   types: "ff", //["typp1", "type2"],
//   stars: ["3", "4"],
//   maxPrice: 3,
// });
