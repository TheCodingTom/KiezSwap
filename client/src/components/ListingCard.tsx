import { Button, Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";



type ListingCardProps = {
  listing: ListingType;
};

function ListingCard({ listing }: ListingCardProps) {
  
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={listing.image}
        style={{ height: 250, objectFit: "cover"}}
      />
      <Card.Body  style={{ backgroundColor:"lightgrey"}}>
        <Card.Title>{listing.name}</Card.Title>
        {listing.user.email ? listing.user.username : ""}

        <Card.Text>{listing.description}</Card.Text>
        {/* <Card.Text>{listing.location.city}</Card.Text> */}
        <Card.Text>
          {listing.likes ? `Liked by ${listing.likes} people` : ""}
        </Card.Text>
        <Button variant="primary">Contact</Button>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
