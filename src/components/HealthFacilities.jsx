import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../scss/healthFacilities.scss";
import img from "../assets/img/health_facilities.jpg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllClinic } from "../redux/thunk";

const HealthFacilities = () => {
  const ArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineLeft {...props} size="24" color="#959595" />;
  };

  const ArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return <AiOutlineRight {...props} size="24" color="#959595" />;
  };

  const allclinic = useSelector((state) => state.userSystemReducer.allClinic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClinic());
  }, []);

  const navigateDetail = (e, item) => {
    navigate(`clinic/${item.id}`);
  };

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    // fade: true,
    speed: 1000,
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

  const navigateScroll = (e) => navigate("health_facilities");

  return (
    <div className="healthFacilitiesBorder" style={{ marginBottom: "40px" }}>
      <h2>
        <FormattedMessage id="clinic" />
        <span onClick={navigateScroll}>
          <FormattedMessage id="util.find" />
        </span>
      </h2>

      <div className="healthFacilitiesSection">
        <Slider {...settings}>
          {allclinic.map((item, i) => {
            return (
              <div
                onClick={(e) => navigateDetail(e, item)}
                key={`specialist-item-${i}`}
                className="slide-item-healthFacilities"
              >
                <img src={item.image} alt="" />
                <h3>{item.name}</h3>
              </div>
            );
          })}
          {/* <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div>
          <div className="slide-item-healthFacilities">
            <img src={img} alt="" />
            <h3>Bệnh viện Hữu Nghị Việt Đức</h3>
          </div> */}
        </Slider>
      </div>
    </div>
  );
};

export default HealthFacilities;
