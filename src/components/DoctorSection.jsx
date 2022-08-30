import React, { useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardSlider from "./CardSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/doctorSection.scss";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "../redux/thunk";
import { useNavigate } from "react-router-dom";

const DoctorSection = () => {
  const doctors = useSelector((state) => state.userSystemReducer.doctors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctors(4));
  }, []);

  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineLeft {...props} size="24" color="#959595" />;
  };

  const ArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineRight {...props} size="24" color="#959595" />;
  };

  const settings = {
    infinite: true,
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

  const moveDetailDoctor = (e, idDoctor) => {
    navigate(`/doctor/${idDoctor}`);
  };

  const navigateScroll = (e) => navigate("doctor");

  return (
    <div className="doctorSectionBorder" style={{ marginBottom: "40px" }}>
      <h2>
        <FormattedMessage id="doctor" />
        <span onClick={navigateScroll}>
          <FormattedMessage id="util.find" />
        </span>
      </h2>

      <div className="doctorSectionSection">
        <Slider {...settings}>
          {doctors.map((doctor, index) => {
            return (
              <div
                key={`doctor-${index}`}
                className="slide-item-doctorSection"
                onClick={(e) => moveDetailDoctor(e, doctor.id)}
              >
                <CardSlider doctor={doctor} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default DoctorSection;
