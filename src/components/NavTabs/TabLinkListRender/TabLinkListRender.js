import React from "react";

import "./TabLinkListRender.css";

function TabLinkListRender({ details }) {
  const { displayText, url } = details;
  return (
    <li className="tab-li">
      <a className="tab-a-text" href={url} target="_blank">
        {displayText}
      </a>
    </li>
  );
}

export default TabLinkListRender;
