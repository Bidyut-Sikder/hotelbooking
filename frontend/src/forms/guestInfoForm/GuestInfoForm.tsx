import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInformData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<GuestInformData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInformData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } }); //storing data in navigation state to come back to this page
  };

  const directSubmit = (data: GuestInformData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking/`);
  };
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    const nights =
      Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
      (1000 * 60 * 60 * 24);

    setNumberOfNights(Math.ceil(nights));
  }, [, search.checkIn, search.checkOut]);

  console.log(numberOfNights);

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">
        {" "}
        {numberOfNights > 1 ? (
          <span>
            {" "}
            {`$${pricePerNight} x ${numberOfNights} = $${
              numberOfNights * pricePerNight
            }`}
          </span>
        ) : (
          <span>${pricePerNight}</span>
        )}
      </h3>
      {/* <h3 className="text-md font-bold"> ${pricePerNight}</h3> */}

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(directSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(e) => {
                setValue("checkIn", e as Date);
                search.saveSearchValues(
                  "",
                  e as Date,
                  search.checkOut,
                  search.adultCount,
                  search.childCount
                );
              }}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Chek-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(e) => {
                search.saveSearchValues(
                  "",
                  search.checkIn,
                  e as Date,
                  search.adultCount,
                  search.childCount
                );
                setValue("checkOut", e as Date);
              }}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Chek-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="min-w-full"
            />
          </div>

          {/* <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(e) => setValue("checkIn", e as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Chek-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(e) => setValue("checkOut", e as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Chek-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="min-w-full"
            />
          </div> */}
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                min={1}
                max={10}
                {...register("adultCount", {
                  required: "This field is required.",
                  min: { value: 1, message: "Minimum 1 adult" },
                  max: { value: 10, message: "Maximum 10 adults" },
                })}
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
              />
            </label>
            <label className="items-center flex">
              Child:
              <input
                min={0}
                max={10}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
