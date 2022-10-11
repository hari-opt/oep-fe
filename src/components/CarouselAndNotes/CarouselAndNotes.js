import React from "react";
import Carousel from "react-bootstrap/Carousel";

import "./CarouselAndNotes.css";
const randomSentance = [
  "There is no wind in the football..",
  "I talk, he talk, why you middle talk?.",
  "u rotate the ground 4 times..",
  "You go and understand the tree.",
  "I'll give you clap on your cheeks..",
  "Bring your parents and your mother and especially your father.",
  "Close the window airforce is coming.",
  "I have two daughters and both are girls..",
  "Stand in a straight circle..",
  "Don't stand in front of my back",
  "Why Haircut not cut..?",
  "Don't make noise.. principle is rotating in the corridor",
  "Why are you looking at the monkey outside the window when I m here?",
  "You talking bad habit",
  "Give me a red pen of any colour.",
  "Can I have some snow in my cold drink?",
  "Pick the paper and fall into the dustbin.",
  "Both of you stand together separately.",
  "Keep quiet the principal just passed away!...",
  "Don't laugh alone pass it...",
];

function CarouselAndNotes() {
  return (
    <div className="carousel-notes-container">
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1665331935/office-620822__340_dlfxrq.webp"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1665331935/lightbulb-1875247__340_n0k48n.webp"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://res.cloudinary.com/dbdv9w5si/image/upload/v1665331935/keyboard-5017973__340_c7lwqx.webp"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="notes-container">
        <ul className="ul-notes">
          {randomSentance.map((each, index) => (
            <li className="li-notes" key={index}>
              {each}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarouselAndNotes;
