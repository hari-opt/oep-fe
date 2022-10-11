import React from "react";
import Nav from "react-bootstrap/Nav";

import "./NavItems.css";

function NavItems() {
  return (
    <>
      {/* <div className="nav-container">
        <ul className="nav-ul">
          <li className="nav-li">Access All</li>
          <li className="nav-li">Update Profile</li>
          <li className="nav-li">Referral</li>
        </ul>
      </div> */}
      <Nav
        className="nav-container"
        justify
        variant="tabs"
        defaultActiveKey="link-1"
      >
        <Nav.Item>
          <Nav.Link eventKey="link-1">Access All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Update Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Referral</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default NavItems;
