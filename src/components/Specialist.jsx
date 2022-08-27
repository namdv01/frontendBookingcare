import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/specialist.scss";
import img from "../assets/img/specialist.jpg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

const Specialist = () => {
  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineLeft {...props} size="24" color="#959595" />;
  };

  const ArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineRight {...props} size="24" color="#959595" />;
  };

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    // fade: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  return (
    <div className="specialistBorder" style={{ marginBottom: "40px" }}>
      <h2>
        Chuyên khoa phổ biến
        <span>
          <FormattedMessage id="util.seeMore" />
        </span>
      </h2>

      <div className="specialistSection">
        <Slider {...settings}>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
          <div className="slide-item-specialist">
            <img src={img} alt="" />
            <h3>Cơ xương khớp</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Specialist;
