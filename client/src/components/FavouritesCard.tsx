import { Card } from "react-bootstrap";

import { FavType } from "../pages/Favourites";
import SendMessageModal from "./SendMessageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LikeUnlikeButton from "./LikeUnlikeButton";

type FavouritesCardProps = {
  listing: FavType;
  handleUpdateFavourites: (listingId: string) => void;
};

function FavouritesCard({
  listing,
  handleUpdateFavourites,
}: FavouritesCardProps) {
  const { user } = useContext(AuthContext);

  const isLiked =
    Array.isArray(user?.favourites) && user.favourites.includes(listing._id);
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={listing.image}
        style={{ height: 250, objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{listing.name}</Card.Title>

        <div className="listingCard-buttons">
          <SendMessageModal listingId={listing._id} />
          <LikeUnlikeButton
            isLiked={isLiked}
            handleUpdateFavourites={() => handleUpdateFavourites(listing._id)}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default FavouritesCard;
