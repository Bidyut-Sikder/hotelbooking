import { FormType } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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















