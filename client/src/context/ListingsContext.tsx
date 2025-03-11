type ListingsContextProviderProps = {
  children: ReactNode;
};

type ListingsContextType = {
  listings: ListingType[] | null;
  url: string;
  getListings: () => void;
};

const initialValue: ListingsContextType = {
  listings: null,
  url: "",
  getListings: () => {
    throw new Error("Context not initialised");
  },
};

import { createContext, ReactNode, useEffect, useState } from "react";
import { ListingType } from "../types/customTypes";

export const ListingsContext = createContext(initialValue);

export const ListingsContextProvider = ({
  children,
}: ListingsContextProviderProps) => {
  const [listings, setListings] = useState<ListingType[] | null>(null);

  const url = "http://localhost:4000/api/listings/all";

  const getListings = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      // console.log(result);
      setListings(result.allListings);
    } catch (error) {
      console.log("error fetching listings :>> ", error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div>
      <ListingsContext.Provider value={{ listings, url, getListings }}>
        {children}
      </ListingsContext.Provider>
    </div>
  );
};
