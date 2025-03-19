import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListingType } from "../types/customTypes";
import ListingCard from "../components/ListingCard";
import { baseUrl } from "../utils/baseUrl";
import UserListingCard from "../components/UserListingCard";

function UserListings() {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState<ListingType[] | null>(null);

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
      {!listings ? (
        <h1>No listings yet</h1>
      ) : (
        <div>
          <h1>My Listings</h1>
          <div className="profile-cards-container">
            {listings &&
              listings.map((listing) => {
                return <UserListingCard listing={listing} key={listing._id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserListings;
