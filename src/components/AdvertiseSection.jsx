import React from "react";
import adv1 from "../assets/img/advertise1.png";
import adv2 from "../assets/img/advertise2.png";
import adv3 from "../assets/img/advertise3.png";
import adv4 from "../assets/img/advertise4.png";
import adv5 from "../assets/img/advertise5.png";
import { FormattedMessage } from "react-intl";
import "../scss/advertiseSection.scss";

const AdvertiseSection = () => {
  return (
    <div className="advertiseSection">
      <h2>
        <FormattedMessage id="advert" />
      </h2>
      <div className="advertiseContent">
        <div className="video">
          <iframe src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"></iframe>
        </div>
        <div className="logo">
          {/* {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <div key={`adv-logo-${item}`}>
                <img src={adv1} alt="" />
              </div>
            );
          })} */}
          <div key={`adv-logo-${1}`}>
            <img src={adv1} alt="" />
          </div>
          <div key={`adv-logo-${2}`}>
            <img src={adv2} alt="" />
          </div>
          <div key={`adv-logo-${3}`}>
            <img src={adv3} alt="" />
          </div>
          <div key={`adv-logo-${4}`}>
            <img src={adv4} alt="" />
          </div>
          <div key={`adv-logo-${5}`}>
            <img src={adv5} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseSection;
