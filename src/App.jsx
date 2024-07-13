import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProgressBar from "@ramonak/react-progress-bar";
import vida from "./assets/Example/DJ Jade.mp4";
import vidb from "./assets/Example/¡Cascaritas con el BSC Femenino!.mp4";
import useResizeOnIntersection from "./hooks/useScaleOnIntersection";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      description: "Science Tribe A",
      vid: vida,
    },
    {
      description: "Science Tribe B",
      vid: vidb,
    },
    {
      description: "Science Tribe C",
      vid: vida,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const progressPercentage = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center my-8">
        What is your tribe?
      </h1>
      <div className="w-full mb-8 p-4">
        <ProgressBar
          completed={progressPercentage}
          bgColor="#b100e8"
          height="8px"
          labelAlignment="none"
          labelSize="12px"
          labelColor="transparent"
        />
      </div>
      <div className="w-full max-w-3xl">
        <Slider {...settings} className="px-4">
          {cards.map((card, index) => (
            <div key={index} className="p-2">
              <CardComponent
                card={card}
                index={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            </div>
          ))}
        </Slider>
        <div className="flex justify-center w-full mt-4">
          <span className="bg-pink-500 py-2 px-4 rounded-lg flex items-center justify-center w-96">
            <p className="text-white">Here we go!</p>
          </span>
        </div>
      </div>
    </div>
  );
}

const CardComponent = ({ card, index, currentIndex, setCurrentIndex }) => {
  const ref = useResizeOnIntersection(index, currentIndex, setCurrentIndex);

  return (
    <div className="flex flex-col items-center">
      <div>
        <div
          ref={ref}
          className="relative flex items-center justify-center overflow-hidden rounded-lg shadow-lg bg-black"
          style={{ height: "400px", width: "100%" }}
        >
          <video
            src={card.vid}
            controls
            className="w-full h-full object-cover"
            autoPlay={index === currentIndex}
            muted
          />
          <div className="absolute bottom-12 left-5 bg-black bg-opacity-50 text-white p-4 rounded-lg text-lg font-bold">
            {card.description}
          </div>
        </div>
      </div>
    </div>
  );
};
