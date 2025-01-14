import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import Facilities from "./Facilities";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

//if we do this configuration.all the children of the FormProvider
// will be avialable to access the form methods
function ManageHotelForm() {
  const fromMethods = useForm<HotelFormData>();

  return (
    <FormProvider {...fromMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <Facilities />
        <GuestSection />
        <ImagesSection />
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
