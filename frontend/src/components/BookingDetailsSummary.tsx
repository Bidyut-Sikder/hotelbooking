export interface HotelType {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
}

type Props = {
  checkIn: Date;
  checkOut: Date;
  childCount: number;
  adultCount: number;
  numberOfNights: number;
  hotel: HotelType;
  pricePerNight: number;
};

const BookingDetailsSummary = ({
  adultCount,
  numberOfNights,
  hotel,
  checkIn,
  checkOut,
  childCount,
  pricePerNight,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} Nights</div>
        {/* <div className="font-bold">${pricePerNight} Per Night</div> */}
      </div>
      <div className="border-t border-b py-2">
        Price:
        <div className="font-bold">${pricePerNight} Per Night</div>
      </div>

      <div>
        Guests{" "}
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
