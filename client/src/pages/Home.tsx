import { useEffect, useState } from "react";

type ListingType = {
    _id: string;
    name: string;
    description: string;
    location: LocationType;
    category: string;
    likes: number
  };

  type LocationType = {
    city: string;
    district: string;
  }

function Home() {

    const [listings, setListings] = useState<ListingType[] | null>(null);

  const fetchAllItems = async () => {
    fetch("http://localhost:4000/api/listings/all")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setListings(result.allListings);
      })
      .catch((error) => console.error(error));
  };

  

  useEffect(() => {
    fetchAllItems();
  }, []);
  return (
    <div>
      <h1>Hello World!</h1>
      <div>
        <h2>Items:</h2>
        {listings &&
          listings.map((listing) => {
            return (
              <div key={listing._id}>
                <p>{listing.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
