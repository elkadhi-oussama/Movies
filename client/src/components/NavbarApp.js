import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IconUser from "./PartUser/IconUser";

const NavbarApp = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          {" "}
          <Link to={"/"}>MovieApp</Link>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Link to={"/movie"}>Movies</Link>
          <Link> Live </Link>
        </Nav>
        {user.email ? (
          <IconUser />
        ) : (
          <Link to={"/login"}>
            <Button variant="success">Login</Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
