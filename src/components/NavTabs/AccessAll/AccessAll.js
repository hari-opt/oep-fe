import React from "react";
import TabLinkListRender from "../TabLinkListRender/TabLinkListRender";

import "./AccessAll.css";

const list = [
  {
    id: 1,
    displayText: "HRMS",
    value: "hrms",
    url: "https://optimum.peoplestrong.com/altLogin.jsf",
  },
  {
    id: 2,
    displayText: "Email",
    value: "email",
    url: "https://webmail-box2342.bluehost.com/",
  },
  {
    id: 3,
    displayText: "Web Site",
    value: "website",
    url: "http://www.optimuminfosolutions.com/index.asp",
  },
];

function AccessAll(props) {
  return (
    <ul className="access-all-container">
      {list.map((each) => (
        <TabLinkListRender key={each.id} details={each} />
      ))}
    </ul>
  );
}

export default AccessAll;
