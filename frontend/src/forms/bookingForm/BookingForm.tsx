import { useForm } from "react-hook-form";
import { createBooking, UserType } from "../../api-client";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";
import { useMutation } from "react-query";
import { BiLoaderCircle } from "react-icons/bi";

type Props = {
  currentUser: UserType;
  pricePerNight: number;
  numberOfNights: number;
};

// type BookingFormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
// };
// const {
//   firstName,
//   lastName,
//   email,
//   phone,
//   hotelId,
//   adultCount,
//   childCount,
//   checkIn,
//   checkOut,
//   totalCost,
// } = req.body;

const BookingForm = ({ pricePerNight, numberOfNights, currentUser }: Props) => {
  // console.log(pricePerNight, numberOfNights);
  const { mutate, isError, error, isLoading } = useMutation(createBooking, {
    onSuccess: (data) => {
      // console.log(data);
      window.location.replace(data.payment_url);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const search = useSearchContext();
  // console.log(currentUser)
  const { id } = useParams();
  // console.log(id)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: "",
    },
  });

  const onSubmit = (formData: any) => {
    const mydata = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      hotel: id,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      totalCost: pricePerNight * numberOfNights,
      numberOfNights: numberOfNights,
    };
    mutate(mydata);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Phone
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            {...register("phone", {
              required: "Phone number cannot be empty.",
            })}
          />
          {errors && (
            <div className="text-red-500 text-sm font-bold">
              {errors.phone?.message}
            </div>
          )}
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total : ${pricePerNight * numberOfNights}
            {/* Total Cost: £{paymentIntent.totalCost.toFixed(2)} */}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        {/* <CardElement
      id="payment-element"
      className="border rounded-md p-2 text-sm"
    /> */}
      </div>

      <div className="flex justify-end">
        <button
          //   disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? (
            <BiLoaderCircle className="animate-spin text-blue-500" size={40} />
          ) : (
            "Pay"
          )}
          {/* {isLoading ? "Loading..." : "Pay"} */}
        </button>
        {isError && (
          <p className="text-red-500">Error: {(error as any)?.message}</p>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
