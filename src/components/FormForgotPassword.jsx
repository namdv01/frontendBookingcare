import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chuyenkhoa from "../assets/img/chuyenkhoa.png";
import nhakhoa from "../assets/img/nha_khoa.png";
// import "../scss/specialist.scss";
const FormForgotPassword = () => {
  const settings = {
    infinite: true,
    // fade: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(1);
    console.log(number);
  }, []);
  return (
    // <div>
    //   <h2> Single Item</h2>

    //   <div
    //     style={{
    //       width: "800px",
    //       backgroundColor: "red",
    //       margin: "0 auto",
    //     }}
    //   >
    //     <Slider {...settings}>
    //       <div>
    //         <img
    //           src={chuyenkhoa}
    //           style={{ height: "100px", margin: "0 auto" }}
    //           alt=""
    //         />
    //       </div>
    //       <div>
    //         <img
    //           src={nhakhoa}
    //           style={{ height: "100px", margin: "0 auto" }}
    //           alt=""
    //         />
    //       </div>
    //       <div>
    //         <img
    //           src={chuyenkhoa}
    //           style={{ height: "100px", margin: "0 auto" }}
    //           alt=""
    //         />
    //       </div>
    //     </Slider>
    //   </div>
    // </div>

    <div>{number}</div>
  );
};

export default FormForgotPassword;
