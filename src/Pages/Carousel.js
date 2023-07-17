import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../API";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Carousel() {
  const [currentMovie, setCurrentMovie] = useState([]);
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(`${API}movie/getall`);
      const getData = await res.json();
      setCurrentMovie(getData);
      // console.log(getData);
    };
    getMovie();
  }, []);

  const settings = {
    
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplayspeed: 1000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };
  return (
    <div className="big-wrap">
      <Slider {...settings}>
        {currentMovie.data === undefined ? (
          <></>
        ) : (
          currentMovie.data.map((item, index) => {
            return (
              <div key={index} className="slide-item">
                <div
                  className="slide-item-wrap"
                  style={{ backgroundImage: `url("${item.poster}")` }}
                >
                  {/* <img className="slide" alt="" src={item.poster} /> */}
                </div>
              </div>
            );
          })
        )}
      </Slider>
    </div>
  );
}

export default Carousel;
