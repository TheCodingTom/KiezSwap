import { Dropdown } from "react-bootstrap";

function DropdownMenu() {
  return (
    <div className="dropdown-container">
    <Dropdown>
      <Dropdown.Toggle className="" variant="info" id="dropdown-basic">
        User
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item href="#/action-1">My Listings</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Messages</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Favourites</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default DropdownMenu