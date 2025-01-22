import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById, updateMyHotelById } from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { id } = useParams();
  const { showToast } = useAppContext();
  const { data } = useQuery(
    "fetchMyHotelById",
    () => fetchMyHotelById(id || ""),
    {
      enabled: !!id,
    }
  );

  const { mutate, isLoading } = useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Hotel updated Failed", type: "ERROR" });
    },
  });

  const handleSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <ManageHotelForm hotel={data} onSave={handleSubmit} isLoading={isLoading} />
  );
};

export default EditHotel;
