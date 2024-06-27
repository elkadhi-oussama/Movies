import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarApp = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand><Link to={"/"}> MovieApp</Link></Navbar.Brand>
        <Nav className="me-auto">

          <Nav.Link>
            {" "}
            <Link to={"/movie"}> Movies</Link>{" "}
          </Nav.Link>
          <Nav.Link>
            {" "}
            <Link> Live</Link>{" "}
          </Nav.Link>
        </Nav>
        <Button variant="success">
          <Link to={"/login"}>Login</Link>
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
