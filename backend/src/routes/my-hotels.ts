import express from "express";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import HotelModel from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { validateHotelData } from "../middleware/middleware";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb file size
  },
});

const uploadToCloudinary = async (imageFiles: Express.Multer.File[]) => {
  //upload images to cloudinary
  const imagesPromises = imageFiles.map(async (image) => {
    const base64 = image.buffer.toString("base64");
    // const base64 = Buffer.from(image.buffer).toString("base64");
    const uploadedImage = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${base64}`, //image Path (dynamicaly stores image in memory)
      {
        format: "webp",
        folder: "hotelBooking", //cloudinary images folder name
      }
    );
    return uploadedImage.secure_url;
  });
  const imagesUrls = await Promise.all(imagesPromises);
  return imagesUrls;
};

//add-hotel
router.post(
  "/",
  verifyToken,
  validateHotelData,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const hotelData: HotelType = req.body;

      // //upload images to cloudinary
      // const imagesPromises = imageFiles.map(async (image) => {
      //   const base64 = image.buffer.toString("base64");
      //   // const base64 = Buffer.from(image.buffer).toString("base64");
      //   const uploadedImage = await cloudinary.uploader.upload(
      //     `data:${image.mimetype};base64,${base64}`, //image Path (dynamicaly stores image in memory)
      //     {
      //       format: "webp",
      //       folder: "hotelBooking", //cloudinary images folder name
      //     }
      //   );
      //   return uploadedImage.secure_url;
      // });

      const imagesUrls = await uploadToCloudinary(imageFiles);
      hotelData.imageUrls = imagesUrls;
      hotelData.lastUpdated = new Date();
      hotelData.userId = req.userId;
      const newHotel = await HotelModel.create(hotelData);

      res.status(201).json(newHotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//get-hotel

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find({ userId: req.userId });
    res.status(200).json(hotels);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
    return;
  }
});

//get-hotel-by-id
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await HotelModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }
    res.status(200).json(hotel);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

//update-hotel-by-id
router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    const id = req.params.id.toString();

    try {
      const updateHotelData: HotelType = req.body;
      updateHotelData.lastUpdated = new Date();
      const updatedHotel = await HotelModel.findOneAndUpdate(
        {
          _id: id,
          userId: req.userId,
        },
        updateHotelData,
        { new: true }
      );

      if (!updatedHotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }
      const imageFiles = req.files as Express.Multer.File[];
      const updatedImagesUrls = await uploadToCloudinary(imageFiles);
      updatedHotel.imageUrls = [
        ...updatedImagesUrls,
        ...(updatedHotel?.imageUrls || []),
      ];

      await updatedHotel.save();

      res.status(200).json(updatedHotel);
      return;
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

export default router;
