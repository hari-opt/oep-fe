import React from "react";
import CarouselAndNotes from "../CarouselAndNotes/CarouselAndNotes";
import NavItems from "../NavItems/NavItems";

import "./HomeBody.css";

const HomeBody = () => {
  return (
    <div className="home-container">
      <CarouselAndNotes />
      <NavItems />
    </div>
  );
};

export default HomeBody;
