import { Button, Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";

import SendMessageModal from "./SendMessageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router";
import { baseUrl } from "../utils/baseUrl";
import { ListingsContext } from "../context/ListingsContext";

type ListingCardProps = {
  listing: ListingType;
};

function ListingCard({ listing }: ListingCardProps) {
  console.log(listing.seller);

  const { user, checkUserStatus } = useContext(AuthContext);

  console.log(user);
  const token = localStorage.getItem("token");

  const handleUpdateFavourites = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/updateFavourites/${listing._id}`,
        requestOptions
      );

      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        checkUserStatus();
      } else {
        console.log("Failed to add/remove fav");
      }
    } catch (error) {
      console.log("Error add/removing fav: ", error);
    }
  };

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
        <div className="listingCard-buttons">
          {listing.seller._id !== user?._id ? (
            <SendMessageModal listingId={listing._id} />
          ) : (
            ""
          )}

          {listing.seller._id !== user?._id ? (
            user?.favourites.includes(listing._id) ? (
              <Button onClick={handleUpdateFavourites}>Unlike</Button>
            ) : (
              <Button onClick={handleUpdateFavourites}>Like</Button>
            )
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
