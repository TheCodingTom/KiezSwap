import { useContext, useState } from "react";
import { ListingsContext } from "../context/ListingsContext";
import ListingCard from "./ListingCard";

function Grid() {
  const { listings } = useContext(ListingsContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  if (!listings) {
    return <h3>Loading listings...</h3>;
  }

  console.log(listings);

  // .map creates array of all categories from listings, with Set we remove duplicates and the spread operator converts the set in an array

  const categories = [...new Set(listings.map((listing) => listing.category))];
  const districts = [...new Set(listings.map((listing) => listing.district))];

  const filteredListings = listings.filter((listing) => {
    return (
      // If no category/district is selected, all listings will be shown
      (selectedCategory === "" || listing.category === selectedCategory) &&
      (selectedDistrict === "" || listing.district === selectedDistrict)
    );
  });

  return (
    <div>
      <div className="">
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {listings &&
            categories.map((category) => (
              <option key={category} value={category}>
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
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ListingCard listing={listing} key={listing._id} />
          ))
        ) : (
          <h3>No listings found.</h3>
        )}
      </div>
    </div>
  );
}

export default Grid;
