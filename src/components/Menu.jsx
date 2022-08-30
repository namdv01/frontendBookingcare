import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TRANSLATE_EN, TRANSLATE_VN } from "../redux/constants";
import { FormattedMessage } from "react-intl";
import { menuHeader } from "../utils/constant";
import "../scss/menu.scss";
import { useNavigate } from "react-router-dom";

const Menu = (props) => {
  const closeMenu = (e) => {
    props.toggleMenu(e);
  };

  const navigate = useNavigate();
  const navigatePage = (e, item) => {
    navigate(item);
  };

  const languageVN = useSelector(
    (state) => state.translateReducer.isVietNamese
  );
  const dispatch = useDispatch();

  const toggleLanguage = (e, value) => {
    console.log("đã bắn dispatch " + value);
    dispatch({ type: value });
  };

  return (
    <div className="menu">
      <ul className="menu__content">
        <li>
          <FormattedMessage id="menu.home" />
        </li>
        <li>
          <FormattedMessage id="menu.handbook" />
        </li>
        <li>
          <FormattedMessage id="menu.contact" />
        </li>
        <li>
          <FormattedMessage id="menu.role" />
        </li>
        <li>
          <FormattedMessage id="menu.frequentQuestion" />
        </li>
        <li>
          <FormattedMessage id="menu.operatingRegulation" />
        </li>
        <li>
          <FormattedMessage id="menu.login" />
        </li>

        <li className="menu-translate title">
          <FormattedMessage id="support" />
        </li>
        {languageVN ? (
          <>
            <li
              className="menu-translate active"
              onClick={(e) => {
                toggleLanguage(e, TRANSLATE_VN);
              }}
            >
              VI
            </li>
            <li
              className="menu-translate"
              onClick={(e) => {
                toggleLanguage(e, TRANSLATE_EN);
              }}
            >
              EN
            </li>
          </>
        ) : (
          <>
            <li
              className="menu-translate"
              onClick={(e) => {
                toggleLanguage(e, TRANSLATE_VN);
              }}
            >
              VI
            </li>
            <li
              className="menu-translate active"
              onClick={(e) => {
                toggleLanguage(e, TRANSLATE_EN);
              }}
            >
              EN
            </li>
          </>
        )}

        <li className="menu-category">
          <FormattedMessage id="header.category" />
        </li>

        {menuHeader.map((item, index) => {
          return (
            <li
              className="menu-category-item"
              key={`menu-item-${index}`}
              onClick={(e) => navigatePage(e, item)}
            >
              <FormattedMessage id={`header.${item}`} />
            </li>
          );
        })}

        {/* {menuSub.map((item, index) => {
          return <li key={`menuSub-item-${index}`}>{item.title}</li>;
        })} */}
      </ul>
      <div className="outMenu" onClick={closeMenu}></div>
    </div>
  );
};

export default Menu;
