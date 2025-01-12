import { React, useContext } from 'react';
import Slider from 'react-slick';
import { FetchContext } from "../../context/FetchContex";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css'
const Banner = () => {
  const { banner } = useContext(FetchContext)

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: (i) => (
      <div className="custom-dot">
        <span className="dot-line"></span>
      </div>
    )
  };

  return (
    <Slider {...settings}>
      {
        banner.map((banner, index) => (
          <div key={index} className="image-container">
            <img src={`http://localhost:5002/product-images/banner-images/${banner._id}.jpg`} alt={`Slide ${index}`}
              className="banner-image" />
          </div>
        ))
      }
    </Slider>
  );
};

export default Banner;

