import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSUbmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    // <form
    //   onSubmit={handleSUbmit}
    //   className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    // >
    //   <div className="flex flex-row items-center flex-1 bg-white p-2">
    //     <MdTravelExplore size={25} className="mr-2" />
    //     <input
    //       type="text"
    //       placeholder="Where are you going?"
    //       value={destination}
    //       onChange={(e) => setDestination(e.target.value)}
    //       className="text-md w-full focus:outline-none"
    //     />
    //   </div>

    //   <div className="flex bg-white px-2 py-1 gap-2">
    //     <label className="items-center flex">
    //       Adults:
    //       <input
    //         value={adultCount}
    //         onChange={(e) => setAdultCount(parseInt(e.target.value))}
    //         type="number"
    //         min={1}
    //         max={20}
    //         className="w-full p-1 focus:outline-none font-bold"
    //       />
    //     </label>
    //     <label className="items-center flex">
    //       Child:
    //       <input
    //         value={childCount}
    //         onChange={(e) => setChildCount(parseInt(e.target.value))}
    //         type="number"
    //         min={0}
    //         max={20}
    //         className="w-full p-1 focus:outline-none font-bold"
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <DatePicker
    //       selected={checkIn}
    //       onChange={(e) => setCheckIn(e as Date)}
    //       selectsStart
    //       startDate={checkIn}
    //       endDate={checkOut}
    //       minDate={minDate}
    //       maxDate={maxDate}
    //       placeholderText="Chek-in Date"
    //       className="min-w-full bg-white p-2 focus:outline-none"
    //       dateFormat="dd/MM/yyyy"
    //       wrapperClassName="min-w-full"
    //     />
    //   </div>

    //   <div>
    //     <DatePicker
    //       selected={checkOut}
    //       onChange={(e) => setCheckOut(e as Date)}
    //       selectsStart
    //       startDate={checkIn}
    //       endDate={checkOut}
    //       minDate={minDate}
    //       maxDate={maxDate}
    //       placeholderText="Chek-in Date"
    //       className="min-w-full bg-white p-2 focus:outline-none"
    //       dateFormat="dd/MM/yyyy"
    //       wrapperClassName="min-w-full"
    //     />
    //   </div>

    //   <div className="flex gap-1">
    //     <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
    //       Search
    //     </button>
    //     <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
    //       Clear
    //     </button>
    //   </div>
    // </form>

    <form  onSubmit={handleSUbmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center bg-white p-2 rounded">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="text-md w-full focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap bg-white px-2 py-1 gap-2 rounded">
        <label className="items-center flex">
          Adults:
          {/* <input
            type="number"
            min="1"
            max="20"
            className="w-16 p-1 focus:outline-none font-bold text-center"
            value="1"
          /> */}
          <input
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            type="number"
            min={1}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
          />
        </label>
        <label className="items-center flex">
          Child:
          {/* <input
            type="number"
            min="0"
            max="20"
            className="w-16 p-1 focus:outline-none font-bold text-center"
            value="0"
          /> */}
          <input
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            type="number"
            min={0}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
          />
        </label>
      </div>

      <div>
        {/* <input
          type="text"
          placeholder="Check-in Date"
          className="w-full bg-white p-2 rounded focus:outline-none"
          value="25/01/2025"
        /> */}
        <DatePicker
          selected={checkIn}
          onChange={(e) => setCheckIn(e as Date)}
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
        {/* <input
          type="text"
          placeholder="Check-out Date"
          className="w-full bg-white p-2 rounded focus:outline-none"
          value="25/01/2025"
        /> */}

        <DatePicker
          selected={checkOut}
          onChange={(e) => setCheckOut(e as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Chek-out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          dateFormat="dd/MM/yyyy"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-2">
        <button className="w-1/2 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/2 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
