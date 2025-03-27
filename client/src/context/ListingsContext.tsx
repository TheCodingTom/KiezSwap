type ListingsContextProviderProps = {
  children: ReactNode;
};

type ListingsContextType = {
  listings: ListingType[] | null;
  userListings: ListingType[] | null;
  favListings: FavType[] | null;

  getListings: () => void;
  getUserListings: () => void;
  getFavourites: () => void;
};

const initialValue: ListingsContextType = {
  listings: null,
  userListings: null,
  favListings: null,
  getListings: () => {
    throw new Error("Context not initialised");
  },
  getUserListings: () => {
    throw new Error("Context not initialised");
  },
  getFavourites: () => {
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
import { FavType } from "../pages/Favourites";

export const ListingsContext = createContext(initialValue);

export const ListingsContextProvider = ({
  children,
}: ListingsContextProviderProps) => {
  const { user, checkUserStatus } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [listings, setListings] = useState<ListingType[] | null>(null);
  const [userListings, setUserListings] = useState<ListingType[] | null>(null);
  const [favListings, setFavListings] = useState<FavType[] | null>(null);

  const getListings = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/listings/all`);
      const result = await response.json();
      // console.log(result);
      setListings(result.allListings);
    } catch (err) {
      const error = err as Error;
      console.log("error fetching listings :>> ", error.message);
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
          console.log("User didn't post any listings yet");
        }

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setUserListings(result.userListings);
        }
      } catch (error) {
        console.log("error fetching the user's listings :>> ", error);
      }
    }
  };

  const getFavourites = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/profile/favourites`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();

        console.log(result);
        setFavListings(result.favourites);
        checkUserStatus();
      } else {
        console.log("Failed to fetch favourites");
      }
    } catch (error) {
      console.log("Error while fetching favourites: ", error);
    }
  };

  // const updateFavourites = async (listingId: string) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/users/updateFavourites/${listingId}`,
  //       requestOptions
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //       checkUserStatus(); // Refresh user status to reflect changes
  //       // getFavourites();
  //     } else {
  //       console.log("Failed to add/remove favourite");
  //     }
  //   } catch (error) {
  //     console.log("Error adding/removing favourite: ", error);
  //   }
  // };

  useEffect(() => {
    getListings();
    getUserListings();
    getFavourites();
  }, []);

  return (
    <div>
      <ListingsContext.Provider
        value={{
          listings,
          userListings,
          favListings,
          getListings,
          getUserListings,
          getFavourites,
        }}
      >
        {children}
      </ListingsContext.Provider>
    </div>
  );
};
