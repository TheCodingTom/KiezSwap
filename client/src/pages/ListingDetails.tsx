import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingType } from "../types/customTypes";
import { Card } from "react-bootstrap";
import { baseUrl } from "../utils/baseUrl";
import SendMessageModal from "../components/SendMessageModal";
import { AuthContext } from "../context/AuthContext";

function ListingDetails() {
  const { listingId } = useParams<string>();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState<ListingType | null>(null);

  const getListingById = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `${baseUrl}/api/listings/${listingId}`,
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
          {user?._id === listing?.seller._id ? (
            <Card.Text className="text-muted small">
              This is your listing.
            </Card.Text>
          ) : (
            <Card.Text className="text-muted small">
              Posted by: {listing?.seller.username}
            </Card.Text>
          )}

          <Card.Text>{listing?.description}</Card.Text>
          {listing && listing?.seller._id !== user?._id ? (
            <SendMessageModal listingId={listing._id} />
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListingDetails;
