import { FormType } from "./pages/Register";
import { SignInFormType } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
// this project The Frontend and Backend are hosted on the same domain
//when we host this on render on the same domain API_BASE_URL will be undefined
// so we need to use "" as a fallback value

export const register = async (formData: FormType) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", // sets cookies to every post request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }
};

export const verifyToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormType) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }
  return resData;
};

export const logOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error logging out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  //FormData is a class in the browser that allows us to easily create a form data object
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!res.ok) {
    throw new Error("Error adding hotel");
  }

  return res.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error Fetcing hotels");
  }

  return res.json();
};

export const fetchMyHotelById = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error Fetcing hotel");
  }

  return res.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("id")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Error updating hotel");
  }

  return res.json();
};

//search api calls
type SearchParams = {
  destination: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  hotelId?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  // these are array of strings thats way we can use forEach loop
  //if we do this if we select one facility it will send as a string but
  //if we select multiple facilities it will send as an array of strings

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));

  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error searching hotels");
  }
  return res.json();
};
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
//logged in user
export const fetchCurrentUser = async (): Promise<UserType> => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Error fetching hotel by id");
  }
  return res.json();
};

//unauthorized
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!res.ok) {
    throw new Error("Error fetching hotel by id");
  }
  return res.json();
};

//booking.....

export const createBooking = async (data: any) => {
  // console.log(data)
  const res = await fetch(`${API_BASE_URL}/api/payments/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials:"include"
  });

  if (!res.ok) {
    throw new Error("Error fetching hotel by id");
  }
  return res.json();
};
//fetch my bookings
export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response .json();
};