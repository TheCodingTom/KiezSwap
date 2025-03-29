import { useContext, useState } from "react";
import { ListingsContext } from "../context/ListingsContext";
import { AuthContext } from "../context/AuthContext";
import ListingCard from "./ListingCard";
import { baseUrl } from "../utils/baseUrl";

function Grid() {
  const { listings } = useContext(ListingsContext);
  const { user, checkUserStatus } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleUpdateFavourites = async (listingId: string) => {
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
        checkUserStatus(); // Refresh user status to reflect changes
      } else {
        console.log("Failed to add/remove favourite");
      }
    } catch (error) {
      console.log("Error adding/removing favourite: ", error);
    }
  };

  // creating an array of all categories with map, removing duplicates with Set (only unique values), spread operator turns Set into array

  const categories = [...new Set(listings?.map((listing) => listing.category))];
  const districts = [...new Set(listings?.map((listing) => listing.district))];

  // filter creates new array with items the have a that condition - include listings where category/district match the selected one

  const filteredListings = listings?.filter((listing) => {
    return (
      (selectedCategory === "" || listing.category === selectedCategory) &&
      (selectedDistrict === "" || listing.district === selectedDistrict) &&
      listing.seller._id !== user?._id
    );
  });

  return (
    <div>
      <div className="filters-container">
        <select
          id="myForm"
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option className="select-option" key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-container">
        {filteredListings && filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard
              listing={listing}
              key={listing._id}
              handleUpdateFavourites={handleUpdateFavourites}
            />
          ))
        ) : (
          <h3>No listings found.</h3>
        )}
      </div>
    </div>
  );
}

export default Grid;
