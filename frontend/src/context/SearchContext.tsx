import { createContext, useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;

  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childrenCount: number
  ) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

type SearchProviderProps = {
  children: React.ReactNode;
};
const getSession = (key: string) => sessionStorage.getItem(key);
export const SearchContextProvider = ({ children }: SearchProviderProps) => {
  const [destination, setDestination] = useState<string>(
    getSession("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    new Date(getSession("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(getSession("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState<number>(
    parseInt(getSession("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(
    parseInt(getSession("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState<string>(getSession("hotelId") || "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
