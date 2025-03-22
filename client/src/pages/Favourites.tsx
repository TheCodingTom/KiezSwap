import { useEffect } from "react";
import { baseUrl } from "../utils/baseUrl";

function Favourites() {
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
      <h1>My fav page</h1>
    </div>
  );
}

export default Favourites;
