import { FormType } from "./pages/Register";


const API_BASE_URL=import.meta.env.VITE_API_BASE_URL

export const register = async function name(formData: FormType) {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
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
