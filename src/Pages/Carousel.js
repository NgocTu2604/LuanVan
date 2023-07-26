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
    // rtl: true,
    
  };
  const listImage = [
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690270239/movie/oodinocpb8liftu0enrd.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690270238/movie/sldacaacmqgwvzvszah0.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690271162/movie/oko8iyl6jrjvutti6wua.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690272059/movie/fcaozn8x43orpkfadd2s.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690273293/xoq7eroby6bj47hrtkcw.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690273290/movie/x7k50vrr6avw1zpup1b1.jpg',
    'https://res.cloudinary.com/dia5z4i6s/image/upload/v1690273290/movie/zsuhaorslhvlzl62kphg.jpg'
  ]
  return (
    <div className="big-wrap">
      <Slider {...settings}>
        {
          listImage.map((item, index) => {
            return (
              <div key={index} className="slide-item">
                <div
                  className="slide-item-wrap"
                  style={{ backgroundImage: `url("${item}")` }}
                >
                  {/* <img className="slide" alt="" src={item.poster} /> */}
                </div>
              </div>
            );
          })
        }
      </Slider>
    </div>
  );
}

export default Carousel;
