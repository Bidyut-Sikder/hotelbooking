import { useMutation } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import { addMyHotel } from "../api-client"
import { useAppContext } from "../context/AppContext"



function AddHotel() {
  const {showToast}=useAppContext()

  const {mutate,isLoading}=useMutation(addMyHotel,{
    onSuccess: () => {
      showToast({message:'Hotel added successfully',type:"SUCCESS"})
    },
    onError: () => {
      showToast({ message:"Error saving hotel",type:"ERROR"})

    },

  })
  const handleSave = (hotelData:FormData) => {
    mutate(hotelData)
    }

  return (
  <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  )
}

export default AddHotel