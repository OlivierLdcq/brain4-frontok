import React from "react";
import star from "./star.png";
import "./Navigation.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
const Navigation = ({ navList, isUserLoggedIn, route, changeRoute }) => {
  return (
    <div className="Navigation">
      <Navbar bg="" expand="lg" className="pmain" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="">
            {" "}
            <img src={star} width="20px" className="rotate" />
            <span className="ms-3">Smart Systems</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav ms-auto">
            <Nav className="ms-auto">
              {navList.map((item) => {
                return (
                  <Nav.Link
                    value={item}
                    key={item}
                    onClick={() => changeRoute(item)}
                  >
                    {item}
                  </Nav.Link>
                );
              })}
              {/* <Nav.Link href="#home">Logout</Nav.Link>
              <Nav.Link href="#link">Register</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
