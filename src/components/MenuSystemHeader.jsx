import React from "react";
import { systemHeader } from "../utils/constant";
import { FormattedMessage } from "react-intl";
import "../scss/menuSystem.scss";

const MenuSystemHeader = (props) => {
  const closeMenu = (e) => {
    console.log("đã bấm");
    props.toggleMenu(e);
  };

  return (
    <div className="menuSystemHeader">
      <div className="content">
        {systemHeader.map((item, i) => {
          return (
            <div className="menuSystem-item" key={`systemHeader-item${i}`}>
              {typeof item == "string" ? (
                <FormattedMessage id={`system_header.${item}`} />
              ) : (
                <FormattedMessage id={`system_header.${item.parent}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="outContent" onClick={closeMenu}></div>
    </div>
  );
};

export default MenuSystemHeader;
