import { model, Schema } from "mongoose";
import { BookingType, HotelType } from "../shared/types";

const hotelSchema = new Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const HotelModel = model<HotelType>("hotel", hotelSchema);
export default HotelModel;

const bookingSchema = new Schema<BookingType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  hotelId: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  tranId: String,
});

export const BookingModel = model<BookingType>("booking", bookingSchema);

// _id: string;
// userId: string;
// firstName: string;
// lastName: string;
// email: string;
// phoneNumber: string;
// adultCount: number;
// childCount: number;
// checkIn: Date;
// checkOut: Date;
// totalCost: number;
