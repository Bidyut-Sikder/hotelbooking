import { useForm } from "react-hook-form";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState,
  } = useForm<FormType>();
  console.log(formState)
  const onSubmit = handleSubmit((data) => {
    console.log(data);

  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="firstName"
        >
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required." })}
            type="text"
          />
          {/* {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )} */}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="lastName"
        >
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required." })}
            type="text"
          />
          {/* {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )} */}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="email">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required." })}
          type="email"
        />
        {/* {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )} */}
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
        {/* {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )} */}
      </label>
      <label
        className="text-gray-700 text-sm font-bold flex-1"
        htmlFor="confirmpassword"
      >
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Confirm password is required";
              } else if (watch("password") !== val) {
                return "Passwords do not match";
              }
            },
          })}
          type="password"
        />
        {/* {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )} */}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
