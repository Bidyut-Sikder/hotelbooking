import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import { searchHotels } from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars:selectedStars
  };


  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    
    setSelectedStars((previousStars) =>
      //creates toggle functionality
      event.target.checked
        ? [...previousStars, starRating]
        : previousStars.filter((star) => star !== starRating)
    );
  };





  console.log(selectedStars);

  const { data } = useQuery(
    ["searchHotels", searchParams],
    () => searchHotels(searchParams)
    // {
    //   // does not refetch after first load for certain time
    //   staleTime: 1000 * 60 * 5,
    //   cacheTime: 1000 * 60 * 60,
    //   refetchOnWindowFocus: false,
    //   enabled: !!searchParams,
    // }
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
        </div>
      </div>
      <div className=" flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found.
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {data &&
          data.data.map((hotel: any) => (
            <SearchResultsCard key={hotel._id} hotel={hotel} />
          ))}
        <div>
          <Pagination
            page={data?.pagination.page || 1}
            pages={data?.pagination.pages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
