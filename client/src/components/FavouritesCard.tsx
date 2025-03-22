import { Card } from "react-bootstrap";

import { FavType } from "../pages/Favourites";
import SendMessageModal from "./SendMessageModal";

type FavouritesCardProps = {
  listing: FavType;
};

function FavouritesCard({ listing }: FavouritesCardProps) {
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={listing.image}
        style={{ height: 250, objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{listing.name}</Card.Title>

        <div className="user-card-buttons">
          <SendMessageModal listingId={listing._id} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default FavouritesCard;
