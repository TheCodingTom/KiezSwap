import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingType } from "../types/customTypes";
import { Button, Card } from "react-bootstrap";
import UserModal from "../components/UserModal";

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

      if (!response.ok) {
        throw new Error("Something went wrong fetching the single listing");
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setListing(result.listing);
      }
    } catch (error) {
      console.log("error fetching the single listing :>> ", error);
    }
  };

  useEffect(() => {
    getListingById();
  }, []);

  return (
    <div className="single-listing-container">
      <Card style={{ width: "23rem" }}>
        <Card.Img variant="top" src={listing?.image} />
        <Card.Body>
          <Card.Title>{listing?.name}</Card.Title>
          <UserModal user={listing?.user} />

          <Card.Text>{listing?.description}</Card.Text>
          <Button variant="primary">Contact</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListingDetails;
