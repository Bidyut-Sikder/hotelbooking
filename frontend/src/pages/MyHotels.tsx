import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchMyHotels } from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data, isLoading } = useQuery("fetchMyHotels", fetchMyHotels, {
    onError: () => {},
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <span>No hotels found</span>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        {/* <h1 className="text-3xl font-bold">My Hotels</h1> */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
          My Hotels
        </h1>

        <Link
          className="hover:bg-blue-500 flex bg-blue-600 font-bold items-center text-white px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
          // className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500 font-bold"
          to="/add-hotel"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {data.map((hotel) => {
          return (
            <div
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h3 className="text-2xl font-bold"> {hotel.name}</h3>
              <div className="whitespace-pre-line"> {hotel.description}</div>
              {/* <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city},{" "}
                  {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />${hotel.pricePerNight}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>

                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 p-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                  <BiMoney className="mr-1" />${hotel.pricePerNight}
                  $200
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                  <BiStar className="mr-1" /> {hotel.starRating} Star Rating
                </div>
              </div>

              <span className="flex justify-end">
                <Link
                  className="hover:bg-blue-500 flex bg-blue-600 font-bold items-center text-white px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
                  // className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500 font-bold"
                  to={`/edit-hotel/${hotel._id}`}
                >
                  View Details
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
