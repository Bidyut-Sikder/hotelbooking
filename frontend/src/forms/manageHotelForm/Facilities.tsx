import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options.config";

function Facilities() {
  const {
    formState: { errors },

    register,
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>

      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="text-sm flex gap-1 text-gray-700">
            <input
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Please select at least one facility";
                  }
                },
              })}
              type="checkbox"
              value={facility}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default Facilities;
