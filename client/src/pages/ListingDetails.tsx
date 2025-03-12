import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListingCard from "../components/ListingCard";
import { ListingType } from "../types/customTypes";

function ListingDetails() {
  const { listingId } = useParams<string>();
  const [listing, setListing] = useState<ListingType | null>(null);

  const getListingById = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/listings/${listingId}`,
        requestOptions
      );

      const result = await response.json();
      console.log(result);
      setListing(result.listing);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListingById();
  }, []);

  return <div>{listing?.name}</div>;
}

export default ListingDetails;
