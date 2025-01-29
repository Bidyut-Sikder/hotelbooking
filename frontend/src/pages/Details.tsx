import { useQuery } from "react-query";
import { fetchHotelById } from "../api-client";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guestInfoForm/GuestInfoForm";

const Details = () => {
  const { id } = useParams();

  const { data } = useQuery("fetchHotelById", () => fetchHotelById(id || ""), {
    enabled: !!id,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: data.starRating }).map((_, i) => (
            <AiFillStar key={i} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data.imageUrls.map((image: any) => (
          <div key={image} className="h-[300px]">
            <img
              src={image}
              alt={data.name}
              className="rounded-md w-full h-full  object-cover object-center "
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {data.facilities.map((facility) => (
          <div
            key={facility}
            className="border border-slate-300 rounded-sm p-3"
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{data.description}</div>

        <div className="h-fit">
          {" "}
          <GuestInfoForm
            hotelId={data._id}
            pricePerNight={data.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
