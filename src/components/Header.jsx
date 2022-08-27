import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineQuestion } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/bookingcare-logo.svg";
import "../scss/header.scss";
import Menu from "./Menu";
import { FormattedMessage } from "react-intl";
import { TRANSLATE_EN, TRANSLATE_VN } from "../redux/constants";
import { menuHeader } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const languageVN = useSelector(
    (state) => state.translateReducer.isVietNamese
  );
  const dispatch = useDispatch();
  // const openDetail = (e, title) => {};

  const toggleMenu = (e) => {
    setMenu(!menu);
  };

  const toggleLanguage = (e, value) => {
    dispatch({ type: value });
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="leftHeader">
          <AiOutlineMenu size={32} color="#969495" onClick={toggleMenu} />
          {menu ? <Menu menu={menu} toggleMenu={toggleMenu} /> : <></>}
          <img src={logo} alt="" onClick={goHome} />
        </div>
        <ul className="centerHeader">
          {menuHeader.map((item, index) => {
            return (
              <li key={`menu-item-${index}`}>
                <FormattedMessage id={`header.${item}`} />
                <span>
                  <FormattedMessage id={`header_detail.${item}`} />
                </span>
              </li>
            );
          })}
        </ul>
        <div className="rightHeader">
          <AiOutlineQuestion
            size={18}
            color="white"
            style={{ background: "#45c3d2", borderRadius: "50%" }}
          />
          <span>
            <FormattedMessage id="support" />
            {languageVN ? (
              <span>
                <p
                  className="active"
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_VN);
                  }}
                >
                  VI
                </p>
                <p
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_EN);
                  }}
                >
                  EN
                </p>
              </span>
            ) : (
              <span>
                <p
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_VN);
                  }}
                >
                  VI
                </p>
                <p
                  className="active"
                  onClick={(e) => {
                    toggleLanguage(e, TRANSLATE_VN);
                  }}
                >
                  EN
                </p>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
