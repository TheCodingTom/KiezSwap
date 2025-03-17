import { Button, Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";
import { NavLink } from "react-router";

type ListingCardProps = {
  listing: ListingType;
};

function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card style={{ width: "18rem" }}>
      <NavLink to={listing._id}>
        <Card.Img
          variant="top"
          src={listing.image}
          style={{ height: 250, objectFit: "cover" }}
        />
      </NavLink>
      <Card.Body style={{ backgroundColor: "lightgrey" }}>
        <NavLink to={listing._id}>
          <Card.Title>{listing.name}</Card.Title>
        </NavLink>

        <Card.Text>{listing.description}</Card.Text>

        <Card.Text>
          {listing.likes ? `Liked by ${listing.likes} people` : ""}
        </Card.Text>
        <div className="card-button">
          <Button variant="primary">Contact</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
