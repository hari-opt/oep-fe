import React from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import AccessAll from "../NavTabs/AccessAll/AccessAll";
import MyLinks from "../NavTabs/MyLinks/MyLinks";
import Referral from "../NavTabs/Referral/Referral";
import UpdateProfile from "../NavTabs/UpdateProfile/UpdateProfile";
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
      {/* <Nav
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
      </Nav>*/}
      <Tabs
        defaultActiveKey="access-all"
        id="justify-tab-example"
        className="mb-3 nav-container nav-tab-container"
        justify
      >
        <Tab eventKey="access-all" title="Access All">
          <AccessAll />
        </Tab>
        <Tab eventKey="update-profile" title="Update Profile">
          <UpdateProfile />
        </Tab>
        <Tab eventKey="referral" title="Referral">
          <Referral />
        </Tab>
        <Tab eventKey="my-links" title="My Links">
          <MyLinks />
        </Tab>
      </Tabs>
    </>
  );
}

export default NavItems;
