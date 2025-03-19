type ListingsContextProviderProps = {
  children: ReactNode;
};

type ListingsContextType = {
  listings: ListingType[] | null;

  getListings: () => void;
};

const initialValue: ListingsContextType = {
  listings: null,

  getListings: () => {
    throw new Error("Context not initialised");
  },
};

import { createContext, ReactNode, useEffect, useState } from "react";
import { ListingType } from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";

export const ListingsContext = createContext(initialValue);

export const ListingsContextProvider = ({
  children,
}: ListingsContextProviderProps) => {
  const [listings, setListings] = useState<ListingType[] | null>(null);

  const getListings = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/listings/all`);
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
      <ListingsContext.Provider value={{ listings, getListings }}>
        {children}
      </ListingsContext.Provider>
    </div>
  );
};
