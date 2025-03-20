import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListingType } from "../types/customTypes";
import ListingCard from "../components/ListingCard";
import { baseUrl } from "../utils/baseUrl";
import UserListingCard from "../components/UserListingCard";
import { ListingsContext } from "../context/ListingsContext";

function UserListings() {
  const { user } = useContext(AuthContext);
  const { userListings, getUserListings } = useContext(ListingsContext);

  console.log(userListings);

  useEffect(() => {
    getUserListings();
  }, [user]);

  return (
    <div>
      {!userListings ? (
        <h1>No listings yet</h1>
      ) : (
        <div>
          <h1>My Listings</h1>
          <div className="profile-cards-container">
            {userListings &&
              userListings.map((listing) => {
                return <UserListingCard listing={listing} key={listing._id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserListings;
