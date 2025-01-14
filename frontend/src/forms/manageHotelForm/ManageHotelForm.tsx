import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

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
      <DetailsSection />
      <TypeSection/>
    </FormProvider>
  );
}

export default ManageHotelForm;
