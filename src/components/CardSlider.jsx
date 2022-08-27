import React from "react";
import avatar from "../assets/img/doctor.jpg";
import "../scss/cardSlider.scss";

const CardSlider = (props) => {
  return (
    <div className="cardSlider">
      <img src={props.doctor.image} alt="" />
      <div className="position">Bác sĩ Chuyên Khoa</div>
      <div className="name">{props.doctor.fullName}</div>
      <div className="job">{props.doctor.address}</div>
    </div>
  );
};

export default CardSlider;
