import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://media.glassdoor.com/l/e6/d0/ec/63/reception.jpg",
  },
  {
    url: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: "https://images.pexels.com/photos/4050298/pexels-photo-4050298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function Carousel(props) {
  return (
    <div style={{ width: "50%" }}>
      <SimpleImageSlider
        width={600}
        height={350}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
    </div>
  );
}

export default Carousel;
