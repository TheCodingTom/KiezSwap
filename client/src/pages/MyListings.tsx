import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function MyListings() {
  const { user } = useContext(AuthContext);

  const userId = user?.id;

  const getUserListings = async () => {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:4000/api/listings/all?userId=${userId}`,
      requestOptions
    );

    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    <div>
      <h1>My listings page</h1>
    </div>
  );
}

export default MyListings;
