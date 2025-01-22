import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");



  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  className="min-h-full object-cover"
                  src={imageUrl}
                  alt="images"
                />
                <button
                  onClick={(e) => handleDelete(e, imageUrl)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          accept="image/*"
          className="w-full text-gray-700 font-normal "
          {...register("imageFiles", {
            validate: (images) => {
              const totalLength = images.length + existingImageUrls?.length||0;
              if (totalLength === 0) {
                return "Please select at least one image";
              }
              if (totalLength > 6) {
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
