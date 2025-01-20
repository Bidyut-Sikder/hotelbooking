import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          accept="image/*"
          className="w-full text-gray-700 font-normal "
          {...register("imageFiles", {
            validate: (images) => {
              if (images.length === 0) {
                return "Please select at least one image";
              }
              if (images.length > 6) {
                return "You can only upload up to 6 images";
              }
              return true;
            },
          })}
          type="file"
          multiple
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
