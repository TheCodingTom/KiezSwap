import { Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";

import SendMessageModal from "./SendMessageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";

type ListingCardProps = {
  listing: ListingType;
};

function ListingCard({ listing }: ListingCardProps) {
  console.log(listing.seller);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Card style={{ width: "18rem" }}>
      <NavLink to={listing._id}>
        <Card.Img
          variant="top"
          src={listing.image}
          style={{ height: 250, objectFit: "cover" }}
        />
      </NavLink>
      <Card.Body>
        <NavLink className={"card-title"} to={listing._id}>
          <Card.Title>{listing.name}</Card.Title>
        </NavLink>

        {user?._id === listing.seller._id ? (
          <Card.Text className="text-muted small">
            This is your listing.
          </Card.Text>
        ) : (
          <Card.Text className="text-muted small">
            Posted by: {listing.seller.username}
          </Card.Text>
        )}

        {/* <Card.Text>
          {listing.likes ? `Liked by ${listing.likes} people` : ""}
        </Card.Text> */}
        <div>
          {listing.seller._id !== user?._id ? (
            <SendMessageModal listingId={listing._id} />
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
