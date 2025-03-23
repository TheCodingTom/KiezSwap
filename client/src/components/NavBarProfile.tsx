import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

function NavBarProfile() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <Nav className="profile-navbar">
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/userlistings"}>
              <ClipboardDocumentListIcon className="icon" /> My Listings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/messages"}>
              <ChatBubbleLeftIcon className="icon" /> Messages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="shake-left-right">
            <Nav.Link as={NavLink} to={"/profile/favourites"}>
              <HeartIcon className="icon" /> Favourites
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
