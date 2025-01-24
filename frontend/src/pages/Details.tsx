import { useQuery } from "react-query";
import { fetchHotelById } from "../api-client";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const Details = () => {
  const { id } = useParams();

  const { data } = useQuery(
    "fetchHotelById",
    () => fetchHotelById(id as string),
    {
      enabled: !!id,
    }
  );
  console.log(data);

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: data.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Details;
