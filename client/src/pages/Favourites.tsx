import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import UserListingCard from "../components/UserListingCard";

type FavType = {
  image: string;
  name: string;
  seller: string;
  _id: string;
};

function Favourites() {
  const [favListings, setFavListings] = useState<FavType[] | null>(null);
  const token = localStorage.getItem("token");

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
      } else {
        console.log("Failed to fetch favourites");
      }
    } catch (error) {
      console.log("Error while fetching favourites: ", error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div>
      {favListings && favListings.length < 1 ? (
        <h1>No favourites yet</h1>
      ) : (
        <div>
          <h1>My Favourites</h1>
          <div className="profile-cards-container">
            {favListings &&
              favListings.map((listing) => {
                return <UserListingCard listing={listing} key={listing._id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourites;
