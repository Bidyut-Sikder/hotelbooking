import { useQuery } from "react-query";
import { fetchCurrentUser, fetchHotelById } from "../api-client";
import BookingForm from "../forms/bookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const { data } = useQuery("fetchCurrentUser", fetchCurrentUser);
  const search = useSearchContext();
  const { id } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => fetchHotelById(id as string),
    {
      enabled: !!id,
    }
  );
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [, search.checkIn, search.checkOut]);

  // console.log(hotel);
  if (!data) return <div>Loading...</div>;
  if (!hotel) return <div>Loading...</div>;
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
     
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
          pricePerNight={hotel.pricePerNight}
        />


      <BookingForm   numberOfNights={numberOfNights}  pricePerNight={hotel.pricePerNight} currentUser={data} />
    </div>
  );
};

export default Booking;
