import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "slick-carousel/slick/slick-theme.css";
import Handbook from "./Handbook";
import "../scss/handbookSlider.scss";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const HandbookSlider = () => {
  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineLeft {...props} size="24" color="#959595" />;
  };

  const ArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineRight {...props} size="24" color="#959595" />;
  };

  const navigate = useNavigate();

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    // fade: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  const navigateScroll = (e) => {
    navigate("handbook");
  };

  return (
    <div className="handbookBorder" style={{ marginBottom: "40px" }}>
      <h2>
        <FormattedMessage id="handbook" />
        <span onClick={navigateScroll}>
          <FormattedMessage id="util.posts" />
        </span>
      </h2>

      <div className="handbookSection">
        <Slider {...settings}>
          <div className="slide-item-handbook">
            <Handbook />
          </div>
          <div className="slide-item-handbook">
            <Handbook />
          </div>
          <div className="slide-item-handbook">
            <Handbook />
          </div>
          <div className="slide-item-handbook">
            <Handbook />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HandbookSlider;
