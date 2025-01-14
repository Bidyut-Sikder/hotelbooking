import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3"> Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="email">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex
              message: "Enter a valid email address",
            },
          })}
          type="email"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4 ">
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="email"
        >
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", {
              required: "city is required.",
            })}
            type="text"
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label
          className="text-gray-700 text-sm font-bold flex-1"
          htmlFor="country"
        >
          country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", {
              required: "country is required.",
            })}
            type="text"
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label
        className="text-gray-700 text-sm font-bold flex-1"
        htmlFor="description"
      >
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", {
            required: "description is required.",
          })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label
        className="text-gray-700 text-sm font-bold max-w-[50%]"
        htmlFor="pricePerNight"
      >
        Price Per Night
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", {
            required: "price is required.",
          })}
          type="number"
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label
        className="text-gray-700 text-sm font-bold max-w-[50%]"
        htmlFor="pricePerNight"
      >
        Star Rating
        <select
          className="border rounded w-full p-2 text-gray-700 font-normal "
          {...register("starRating", { required: "Ratting is required." })}
        >
          <option value="1" className="text-sm font-bold">
            Select As Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}

export default DetailsSection;
