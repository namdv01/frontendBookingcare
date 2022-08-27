import React from "react";
import img from "../assets/img/handbook.jpg";
import "../scss/handbookCard.scss";

const Handbook = () => {
  return (
    <div className="handbookCard">
      <img src={img} alt="" />
      <div className="text">
        Nha khoa NewGate ưu đãi đến 50% tất cả dịch vụ nha khoa
      </div>
    </div>
  );
};

export default Handbook;
