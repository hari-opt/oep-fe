import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

import "./Header.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="nav-bar" expand="lg">
      <Container className="header-container hearder-margin">
        <Navbar.Brand href="/">
          <img
            src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1664366511/optimumsolutions_vsbhkt.svg"
            className="home-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <div className="logout-container">
              <button
                type="button"
                className="logout-button"
                onClick={() => {
                  Cookies.remove("jwt_token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
