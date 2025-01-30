import  { useState } from "react";

const hotelData = [
  {
    userId: "678f0f29cd0990a7b5d36d73",
    name: "Alpine Ridge Ski Resort",
    city: "Aspen",
    country: "USA",
    description:
      "Located in the heart of the Rockies, this ski resort offers world-class slopes, luxurious chalets, and après-ski activities. Whether you're here for skiing or simply to relax by the fire, this resort has something for everyone.",
    type: "Ski Resort",
    adultCount: 150,
    childCount: 40,
    facilities: ["Free WiFi", "Spa", "Outdoor Pool", "Fitness Center"],
    pricePerNight: 350,
    starRating: 5,
    imageUrls: [
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg",
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
    ],
    lastUpdated: "2025-01-12T00:00:00.000Z"
  },
  {
    userId: "678f0f29cd0990a7b5d36d73",
    name: "The Coastal View Inn",
    city: "San Diego",
    country: "USA",
    description:
      "This coastal inn offers sweeping views of the Pacific Ocean, along with a relaxed atmosphere and cozy rooms. Perfect for a weekend getaway, you can enjoy surf lessons, fresh seafood, and beachside lounging.",
    type: "Beach Resort",
    adultCount: 90,
    childCount: 30,
    facilities: ["Free WiFi", "Parking", "Family Rooms", "Outdoor Pool"],
    pricePerNight: 280,
    starRating: 4,
    imageUrls: [
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg",
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
    ],
    lastUpdated: "2025-01-11T00:00:00.000Z"
  }
];

const visitedAreas = [
  {
    name: "Aspen",
    description: "A prime destination for skiing and mountain adventures.",
    imageUrl:
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg"
  },
  {
    name: "San Diego",
    description: "Famous for its beaches, parks, and warm weather.",
    imageUrl:
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
  },
  {
    name: "Lake Tahoe",
    description: "Known for its clear lake, hiking trails, and winter sports.",
    imageUrl:
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg"
  }
];

const weekendDeals = [
  {
    name: "Mountain Escape Weekend",
    description: "Enjoy a 3-night stay at a discounted price in the heart of the mountains.",
    price: 900,
    originalPrice: 1200,
    imageUrl:
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
  },
  {
    name: "Beachfront Bliss",
    description: "Relax by the beach with a special weekend offer for a luxurious stay.",
    price: 750,
    originalPrice: 1000,
    imageUrl:
      "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg"
  }
];

function HotelBookingLandingPage() {
  const [featuredHotel] = useState(hotelData[0]);
  return (
    <div className="p-4 sm:p-6 space-y-8 font-sans">
      {/* Hero Section */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to Our Hotel Booking Service</h1>
        <p className="text-base sm:text-lg">Find your perfect getaway from beachside relaxation to thrilling ski resorts.</p>
      </header>

      {/* Featured Hotel Section */}
      <section className="bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Featured Hotel</h2>
        <div>
          <img
            src={featuredHotel.imageUrls[0]}
            alt={featuredHotel.name}
            className="w-full rounded-t-2xl object-cover"
          />
          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-semibold">{featuredHotel.name}</h3>
            <p className="text-sm sm:text-base">{featuredHotel.description}</p>
            <p className="mt-4 text-xs sm:text-sm text-gray-600">
              Located in {featuredHotel.city}, {featuredHotel.country}
            </p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Book Now at ${featuredHotel.pricePerNight}/night</button>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Hotels</h2>
        <div className="flex flex-wrap sm:flex-nowrap overflow-x-scroll sm:overflow-x-auto space-x-4">
          {hotelData.map((hotel) => (
            <div key={hotel.name} className="min-w-[280px] sm:min-w-[300px] bg-white rounded-lg shadow-md mb-4 sm:mb-0">
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-600">
                  {hotel.city}, {hotel.country}
                </p>
                <button className="text-blue-500 mt-2">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Most Visited Areas Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Most Visited Areas</h2>
        <div className="flex flex-wrap sm:flex-nowrap space-x-4">
          {visitedAreas.map((area) => (
            <div key={area.name} className="bg-white rounded-lg shadow-md w-full sm:w-64 mb-4 sm:mb-0">
              <img
                src={area.imageUrl}
                alt={area.name}
                className="w-full rounded-t-lg h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{area.name}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals for the Weekend Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Deals for the Weekend</h2>
        <div className="flex flex-wrap sm:flex-nowrap space-x-4">
          {weekendDeals.map((deal) => (
            <div key={deal.name} className="bg-white rounded-lg shadow-md w-full sm:w-64 mb-4 sm:mb-0">
              <img
                src={deal.imageUrl}
                alt={deal.name}
                className="w-full rounded-t-lg h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{deal.name}</h3>
                <p className="text-sm text-gray-600">{deal.description}</p>
                <p className="text-lg font-semibold text-blue-500">
                  ${deal.price} <span className="line-through text-gray-500">${deal.originalPrice}</span>
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm sm:text-base font-medium">Your Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium">Message</label>
            <textarea
              rows={4}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default HotelBookingLandingPage;





























































// import React, { useState } from "react";

// const hotelData = [
//   {
//     userId: "678f0f29cd0990a7b5d36d73",
//     name: "Alpine Ridge Ski Resort",
//     city: "Aspen",
//     country: "USA",
//     description:
//       "Located in the heart of the Rockies, this ski resort offers world-class slopes, luxurious chalets, and après-ski activities. Whether you're here for skiing or simply to relax by the fire, this resort has something for everyone.",
//     type: "Ski Resort",
//     adultCount: 150,
//     childCount: 40,
//     facilities: ["Free WiFi", "Spa", "Outdoor Pool", "Fitness Center"],
//     pricePerNight: 350,
//     starRating: 5,
//     imageUrls: [
//       "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg",
//       "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
//     ],
//     lastUpdated: "2025-01-12T00:00:00.000Z"
//   },
//   {
//     userId: "678f0f29cd0990a7b5d36d73",
//     name: "The Coastal View Inn",
//     city: "San Diego",
//     country: "USA",
//     description:
//       "This coastal inn offers sweeping views of the Pacific Ocean, along with a relaxed atmosphere and cozy rooms. Perfect for a weekend getaway, you can enjoy surf lessons, fresh seafood, and beachside lounging.",
//     type: "Beach Resort",
//     adultCount: 90,
//     childCount: 30,
//     facilities: ["Free WiFi", "Parking", "Family Rooms", "Outdoor Pool"],
//     pricePerNight: 280,
//     starRating: 4,
//     imageUrls: [
//       "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/ys2wodklysitrvevkx7p.jpg",
//       "https://res.cloudinary.com/doozndhqq/image/upload/v1738213548/hotelBooking/yhk49wvgqiby0u7cculo.jpg"
//     ],
//     lastUpdated: "2025-01-11T00:00:00.000Z"
//   }
// ];

// function HotelBookingLandingPage() {
//   const [featuredHotel] = useState(hotelData[0]);

//   return (
//     <div className="p-6 space-y-8 font-sans">
//       {/* Hero Section */}
//       <header className="text-center space-y-4">
//         <h1 className="text-4xl font-bold">Welcome to Our Hotel Booking Service</h1>
//         <p className="text-lg">Find your perfect getaway from beachside relaxation to thrilling ski resorts.</p>
//       </header>

//       {/* Featured Hotel Section */}
//       <section className="bg-gray-100 p-6 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-semibold mb-4">Featured Hotel</h2>
//         <div>
//           <img
//             src={featuredHotel.imageUrls[0]}
//             alt={featuredHotel.name}
//             className="w-full rounded-t-2xl"
//           />
//           <div className="mt-4">
//             <h3 className="text-2xl font-semibold">{featuredHotel.name}</h3>
//             <p>{featuredHotel.description}</p>
//             <p className="mt-4 text-sm text-gray-600">
//               Located in {featuredHotel.city}, {featuredHotel.country}
//             </p>
//             <div className="mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Book Now at ${featuredHotel.pricePerNight}/night</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Carousel Section */}
//       <section>
//         <h2 className="text-3xl font-semibold mb-4">Our Hotels</h2>
//         <div className="flex overflow-x-scroll space-x-4">
//           {hotelData.map((hotel) => (
//             <div key={hotel.name} className="min-w-[300px] bg-white rounded-lg shadow-md">
//               <img
//                 src={hotel.imageUrls[0]}
//                 alt={hotel.name}
//                 className="w-full rounded-t-lg"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold">{hotel.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   {hotel.city}, {hotel.country}
//                 </p>
//                 <button className="text-blue-500 mt-2">View Details</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gray-100 p-6 rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Your Name</label>
//             <input
//               type="text"
//               className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Message</label>
//             <textarea
//               rows={4}
//               className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
//             ></textarea>
//           </div>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default HotelBookingLandingPage;
