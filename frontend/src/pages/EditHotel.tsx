import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { id } = useParams();
  const { data, } = useQuery(
    "fetchMyHotelById",
    () => fetchMyHotelById(id || ""),
    {
      enabled: !!id,
    }
  );



  
  return <ManageHotelForm hotel={data} onSave={() => {}} isLoading={!data} />;
};

export default EditHotel;
