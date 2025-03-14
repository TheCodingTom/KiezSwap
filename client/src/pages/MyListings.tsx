import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListingType } from "../types/customTypes";
import ListingCard from "../components/ListingCard";

function MyListings() {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState<ListingType[] | null>(null);

  const getUserListings = async () => {
    const requestOptions = {
      method: "GET",
    };

    if (user) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/listings/all?userId=${user.id}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Something went wrong fetching the user's listings");
        }

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setListings(result.userListings);
        }
      } catch (error) {
        console.log("error fetching the single listing :>> ", error);
      }
    }
  };

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    <div>
      <h1>My Listings</h1>
      <div className="profile-cards-container">
        {listings &&
          listings.map((listing) => {
            return <ListingCard listing={listing} key={listing._id} />;
          })}
      </div>
    </div>
  );
}

export default MyListings;
