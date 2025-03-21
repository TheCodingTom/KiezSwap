import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function NavBarProfile() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <Nav className="justify-content-center">
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/userlistings"}>
              My Listings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/messages"}>
              Messages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/favourites"}>
              Favourites
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        ""
      )}
    </div>
  );
}

export default NavBarProfile;
