import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";

function NavBarProfile() {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Nav.Link as={NavLink} to={"/profile/userlistings"}>
          My Listings
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to={"/profile/messages"}>
          Messages
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to={"/profile/favourites"}>
          Favourites
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBarProfile;
