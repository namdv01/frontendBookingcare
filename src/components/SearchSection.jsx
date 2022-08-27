import React, { useEffect, useState } from "react";
import "../scss/searchSection.scss";
import FormSearch from "./FormSearch";
import { FormattedMessage } from "react-intl";
import SuggestSearch from "./SuggestSearch";
import ggplay from "../assets/ggplay.webp";
import appstore from "../assets/appstore.webp";

const SearchSection = () => {
  return (
    <div className="searchSection">
      <div className="search">
        <h1 className="title">
          <FormattedMessage id="search.title" />
          <div>
            <FormattedMessage id="search.subTitle" />
          </div>
        </h1>
        <FormSearch />
        <div className="app">
          <img src={ggplay} style={{ width: "100px", height: "32px" }} />
          <img src={appstore} style={{ width: "100px", height: "32px" }} />
        </div>
      </div>
      <div className="option">
        <SuggestSearch />
      </div>
    </div>
  );
};

export default SearchSection;
