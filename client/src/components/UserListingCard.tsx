import { Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";
import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import DeleteModal from "./DeleteModal";

type UserListingCardProps = {
  listing: ListingType;
};

function UserListingCard({ listing }: UserListingCardProps) {
  const { getListings, getUserListings } = useContext(ListingsContext);
  const handleDeleteListing = async () => {
    const requestOptions = {
      method: "DELETE",
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/listings/userListings/${listing._id}`,
        requestOptions
      );

      const result = await response.json();
      console.log(result);
      getUserListings();
      getListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={listing.image}
        style={{ height: 250, objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{listing.name}</Card.Title>

        <Card.Text>
          {listing.likes ? `Liked by ${listing.likes} people` : ""}
        </Card.Text>
        <div className="user-card-buttons">
          <DeleteModal handleDeleteListing={handleDeleteListing} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserListingCard;
