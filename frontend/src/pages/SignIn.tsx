import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignInFormType = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const { showToast, refreshAuth } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  const { mutate } = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in successful.", type: "SUCCESS" });
      navigate("/");
      refreshAuth();
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });

      console.log(error.message);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="email"
        >
          Email
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex
                message: "Enter a valid email address",
              },
            })}
            type="email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="password"
        >
          Password
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not Registered? <Link className="underline" to="/register">Register here.</Link>
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Login
          </button>
        </span>
      </form>
    </div>
  );
}

export default SignIn;
