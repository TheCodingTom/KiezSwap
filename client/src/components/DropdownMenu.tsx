import { Dropdown } from "react-bootstrap";

function DropdownMenu() {
  return (
    <div className="dropdown-container">
    <Dropdown>
      <Dropdown.Toggle className="dropdown" variant="info" id="dropdown-basic">
        
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item href="#/action-1">Home</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Listings</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Login</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default DropdownMenu