import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchMyHotels } from "../api-client";
// import { BsBuilding, BsMap } from "react-icons/bs";
// import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotels, isLoading } = useQuery("fetchMyHotels", fetchMyHotels, {
    onError: () => {},
  });
  if (isLoading) return <div>Loading...</div>;
  if (!hotels) return <span>No hotels found</span>;

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

      <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
        ))}
      </div>
















        {/* {data.map((hotel) => {
          return (
            <div
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h3 className="text-2xl font-bold"> {hotel.name}</h3>
              <div className="whitespace-pre-line"> {hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
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
              </div> 

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
        })} */}
      </div>
    </div>

    // <>
    //   <Link
    //     className="hover:bg-blue-500 flex bg-blue-600 font-bold items-center text-white px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
    //     // className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500 font-bold"
    //     to="/add-hotel"
    //   >
    //     Add Hotel
    //   </Link>
      // <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      //   {hotels.map((hotel, index) => (
      //     <HotelCard key={index} {...hotel} />
      //   ))}
      // </div>
    // </>
  );
};

export default MyHotels;

interface HotelProps {
  _id: string;
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
}

const HotelCard: React.FC<HotelProps> = ({
  name,
  city,
  country,
  description,
  type,
  _id,
  facilities,
  pricePerNight,
  starRating,
  imageUrls,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col w-full max-w-xs mx-auto transition-transform hover:scale-105">
      {/* Image Section */}
      <div className="relative w-full h-52">
        <img
          src={imageUrls[0]}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Hotel Info */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          {type} in {city}, {country}
        </p>
        <div className="flex mt-1">
          {Array.from({ length: starRating }).map((_, index) => (
            <svg
              key={index}
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.868 1.475 8.253L12 18.896l-7.411 4.53 1.475-8.253L.001 9.306l8.331-1.151z" />
            </svg>
          ))}
        </div>

        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{description}</p>

        {/* Facilities */}
        <h3 className="text-sm font-semibold mt-3">Facilities:</h3>
        <ul className="list-disc list-inside text-gray-600 text-xs">
          {facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>

        <div className="flex justify-between mt-4 items-center">
          <p className="text-lg font-bold text-green-500">
            ${pricePerNight} / night
          </p>
          {/* <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600">
          Book Now
        </button> */}
          <Link
            className="hover:bg-blue-500 flex bg-blue-600 font-bold items-center text-white px-3 py-1 text-sm sm:text-base rounded hover:text-green-500"
            // className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500 font-bold"
            to={`/edit-hotel/${_id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
