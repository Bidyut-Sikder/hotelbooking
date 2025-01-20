import { FormType } from "./pages/Register";
import { SignInFormType } from "./pages/SignIn";

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



export const addMyHotel = async (hotelFormData:FormData) => {

  //FormData is a class in the browser that allows us to easily create a form data object
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body:hotelFormData,

  });

  if (!res.ok) {
    throw new Error("Error adding hotel");
  }
  
  return res.json()
};

