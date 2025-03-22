import { Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";
import SendMessageModal from "./SendMessageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";
import LikeUnlikeButton from "./LikeUnlikeButton";

type ListingCardProps = {
  listing: ListingType;
  handleUpdateFavourites: (listingId: string) => void;
};

function ListingCard({ listing, handleUpdateFavourites }: ListingCardProps) {
  const { user } = useContext(AuthContext);

  const isLiked =
    Array.isArray(user?.favourites) && user.favourites.includes(listing._id);

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

        <div className="listingCard-buttons">
          {listing.seller._id !== user?._id && (
            <>
              <SendMessageModal listingId={listing._id} />

              <LikeUnlikeButton
                isLiked={isLiked}
                onClick={() => handleUpdateFavourites(listing._id)}
              />
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
