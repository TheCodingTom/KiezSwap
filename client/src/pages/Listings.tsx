import { useContext } from "react";
import { ListingsContext } from "../context/ListingsContext";
import { Button, Card } from "react-bootstrap";

function Listings() {
  const { listings } = useContext(ListingsContext);
  console.log("listings :>> ", listings);
  return (
    <div>
      <h2>Items:</h2>
      {listings &&
        listings.map((listing) => {
          return (
            <div key={listing._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={listing.image} />
                <Card.Body>
                  <Card.Title>{listing.name}</Card.Title>
                  <Card.Text>
                    {listing.description}
                  </Card.Text>
                  <Card.Text>
                   {listing.likes ?  `Liked by ${listing.likes} people` : ""}
                  </Card.Text>
                  <Button variant="primary">Contact</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default Listings;
