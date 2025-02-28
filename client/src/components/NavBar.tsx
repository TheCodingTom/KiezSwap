
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand as={NavLink} to={"/"}>
            KIEZSWAP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/listings"}>
                Listings
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/register"}>
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/login"}>
                Login
              </Nav.Link>

             
            </Nav>
            <Nav>
              <div>
                <Button color="inherit">Something</Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
