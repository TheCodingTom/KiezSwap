type ListingsContextProviderProps = {
  children: ReactNode;
};

type ListingsContextType = {
  listings: ListingType[] | null;
  userListings: ListingType[] | null;

  getListings: () => void;
  getUserListings: () => void;
};

const initialValue: ListingsContextType = {
  listings: null,
  userListings: null,
  getListings: () => {
    throw new Error("Context not initialised");
  },
  getUserListings: () => {
    throw new Error("Context not initialised");
  },
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ListingType } from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";
import { AuthContext } from "./AuthContext";

export const ListingsContext = createContext(initialValue);

export const ListingsContextProvider = ({
  children,
}: ListingsContextProviderProps) => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState<ListingType[] | null>(null);
  const [userListings, setUserListings] = useState<ListingType[] | null>(null);

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

  const getUserListings = async () => {
    const requestOptions = {
      method: "GET",
    };

    if (user) {
      try {
        const response = await fetch(
          `${baseUrl}/api/listings/all?userId=${user._id}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Something went wrong fetching the user's listings");
        }

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setUserListings(result.userListings);
        }
      } catch (error) {
        console.log("error fetching the single listing :>> ", error);
      }
    }
  };

  useEffect(() => {
    getListings();
    getUserListings();
  }, []);

  return (
    <div>
      <ListingsContext.Provider
        value={{ listings, userListings, getListings, getUserListings }}
      >
        {children}
      </ListingsContext.Provider>
    </div>
  );
};
