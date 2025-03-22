import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../utils/baseUrl";

function useUpdateFavourites() {
  const { checkUserStatus, getFavourites } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const updateFavourites = async (listingId: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/updateFavourites/${listingId}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        checkUserStatus();
      } else {
        console.log("Failed to add/remove favourite");
      }
    } catch (error) {
      console.log("Error adding/removing favourite: ", error);
    }
  };

  return updateFavourites;
}

export default useUpdateFavourites;
