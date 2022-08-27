import React from "react";
import adv1 from "../assets/img/advertise1.png";
import "../scss/advertiseSection.scss";

const AdvertiseSection = () => {
  return (
    <div className="advertiseSection">
      <h2>Truyền thông nói về BookingCare</h2>
      <div className="advertiseContent">
        <div className="video">
          <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
        </div>
        <div className="logo">
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <div key={`adv-logo-${item}`}>
                <img src={adv1} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdvertiseSection;
