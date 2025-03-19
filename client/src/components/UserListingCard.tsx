import { Button, Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";

type UserListingCardProps = {
  listing: ListingType;
};

function UserListingCard({ listing }: UserListingCardProps) {
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
          <Button>Update</Button>
          <Button>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserListingCard;
