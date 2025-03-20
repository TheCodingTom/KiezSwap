import { useContext, useEffect } from "react";
import UserListingCard from "../components/UserListingCard";
import { ListingsContext } from "../context/ListingsContext";

function UserListings() {
  const { userListings, getUserListings } = useContext(ListingsContext);

  console.log(userListings);

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    <div>
      {userListings && userListings.length < 1 ? (
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
