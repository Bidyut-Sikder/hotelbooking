import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Calendar, Users, DollarSign, Star } from "lucide-react";

const MyBookings = () => {
  const { data: bookings } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  console.log(bookings);
  if (!bookings || bookings.length === 0) {
    return <span>No bookings found</span>;
  }

  // return (
  //   <div className="space-y-5">
  //     <h1 className="text-3xl font-bold">My Bookings</h1>
  //     {bookings.map((booking) => (
  //       <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
  //         {/* <div className="lg:w-full lg:h-[250px]">
  //           <img
  //             src={booking.hotel.imageUrls[0]}
  //             className="w-full h-full object-cover object-center"
  //           />
  //         </div> */}
  //         <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
  //           <div className="text-2xl font-bold">
  //             {hotel.name}
  //             <div className="text-xs font-normal">
  //               {hotel.city}, {hotel.country}
  //             </div>
  //           </div>
  //           {hotel.bookings.map((booking) => (
  //             <div>
  //               <div>
  //                 <span className="font-bold mr-2">Dates: </span>
  //                 <span>
  //                   {new Date(booking.checkIn).toDateString()} -
  //                   {new Date(booking.checkOut).toDateString()}
  //                 </span>
  //               </div>
  //               <div>
  //                 <span className="font-bold mr-2">Guests:</span>
  //                 <span>
  //                   {booking.adultCount} adults, {booking.childCount} children
  //                 </span>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    // <div className="p-4 bg-gray-100 min-h-screen">
    //   <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {bookings.map((booking: any, index: number) => (
    //       <div key={index} className="bg-white p-4 shadow-md rounded-2xl">
    //         <img
    //           src={booking.hotel.imageUrls[0]}
    //           alt={booking.hotel.name}
    //           className="w-full h-48 object-cover rounded-xl"
    //         />
    //         <h2 className="text-lg font-semibold mt-4">{booking.hotel.name}</h2>
    //         <p className="text-sm text-gray-500">
    //           {booking.hotel.city}, {booking.hotel.country}
    //         </p>
    //         <p className="mt-2">
    //           <span className="text-yellow-500 font-semibold">
    //             {booking.hotel.starRating} ★
    //           </span>{" "}
    //           {booking.hotel.type}
    //         </p>
    //         <p className="mt-2 text-gray-600">
    //           <strong>Check-in:</strong>{" "}
    //           {new Date(booking.checkIn).toLocaleDateString()}
    //           <br />
    //           <strong>Check-out:</strong>{" "}
    //           {new Date(booking.checkOut).toLocaleDateString()}
    //         </p>
    //         <p className="mt-2">
    //           <strong>Guests:</strong> {booking.adultCount} Adults,{" "}
    //           {booking.childCount} Children
    //         </p>
    //         <p className="mt-2">
    //           <strong>Price per Night:</strong> ${booking.hotel.pricePerNight}
    //         </p>
    //         <ul className="mt-2">
    //           <strong>Facilities:</strong>
    //           {booking.hotel.facilities.map(
    //             (facility: string, index: number) => (
    //               <li key={index} className="text-sm text-green-600">
    //                 - {facility}
    //               </li>
    //             )
    //           )}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src={booking.hotel.imageUrls[0]}
                alt={booking.hotel.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {booking.hotel.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {booking.hotel.city}, {booking.hotel.country}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <Star className="text-yellow-500 w-4 h-4" />
                  <span className="text-gray-600">
                    {booking.hotel.starRating} Stars
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  {booking.hotel.type} Hotel
                </p>

                <div className="mt-4">
                  <div className="flex items-center text-gray-600 text-sm gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      <strong>Check-in:</strong>{" "}
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      <strong>Check-out:</strong>{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm gap-2 mt-2">
                    <Users className="w-4 h-4" />
                    <span>
                      <strong>Guests:</strong> {booking.adultCount} Adults,{" "}
                      {booking.childCount} Children
                    </span>
                  </div>
                  <div className="flex items-center text-green-600 text-sm gap-2 mt-2 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>${booking.hotel.pricePerNight} / Night</span>
                  </div>

                  <div className="flex items-center text-green-600 text-sm gap-2 mt-2 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    <span>  Cost: ${booking.totalCost}  </span>
                  </div>

                </div>

                <ul className="mt-4">
                  <strong>Facilities:</strong>
                  {booking.hotel.facilities.map(
                    (facility: any, index: number) => (
                      <li key={index} className="text-sm text-gray-700 mt-1">
                        - {facility}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

// import React from 'react';
// import { Calendar, Users, DollarSign, Star } from 'lucide-react';

// interface BookingData {
//   hotel: {
//     name: string;
//     city: string;
//     country: string;
//     facilities: string[];
//     imageUrls: string[];
//     pricePerNight: number;
//     starRating: number;
//     type: string;
//   };
//   checkIn: string;
//   checkOut: string;
//   adultCount: number;
//   childCount: number;
// }

// const MyBookings: React.FC<{ bookings: BookingData[] }> = ({ bookings }) => {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Your Bookings</h1>

//       {bookings.length === 0 ? (
//         <p className="text-gray-500 text-center">No bookings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bookings.map((booking, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden">
//               <img
//                 src={booking.hotel.imageUrls[0]}
//                 alt={booking.hotel.name}
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-800">{booking.hotel.name}</h2>
//                 <p className="text-gray-600 text-sm">
//                   {booking.hotel.city}, {booking.hotel.country}
//                 </p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <Star className="text-yellow-500 w-4 h-4" />
//                   <span className="text-gray-600">{booking.hotel.starRating} Stars</span>
//                 </div>

//                 <p className="mt-3 text-sm text-gray-500">{booking.hotel.type} Hotel</p>

//                 <div className="mt-4">
//                   <div className="flex items-center text-gray-600 text-sm gap-2">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm gap-2 mt-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm gap-2 mt-2">
//                     <Users className="w-4 h-4" />
//                     <span>
//                       <strong>Guests:</strong> {booking.adultCount} Adults, {booking.childCount} Children
//                     </span>
//                   </div>
//                   <div className="flex items-center text-green-600 text-sm gap-2 mt-2 font-semibold">
//                     <DollarSign className="w-4 h-4" />
//                     <span>${booking.hotel.pricePerNight} / Night</span>
//                   </div>
//                 </div>

//                 <ul className="mt-4">
//                   <strong>Facilities:</strong>
//                   {booking.hotel.facilities.map((facility, index) => (
//                     <li key={index} className="text-sm text-gray-700 mt-1">
//                       - {facility}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;
