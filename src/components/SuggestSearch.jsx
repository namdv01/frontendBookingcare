import React, { useEffect, useState } from "react";
import { suggestSearch } from "../utils/constant";
import { FormattedMessage, useIntl } from "react-intl";
import "../scss/suggestSearch.scss";

const SuggestSearch = () => {
  const intl = useIntl();

  return (
    <div className="suggestSearch__container">
      <ul className="list-suggest">
        {suggestSearch.map((item, index) => {
          return (
            <li key={`suggest-item-${index}`}>
              <div className="img"></div>
              <div className="text">
                <FormattedMessage id={`search_suggest.${item}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SuggestSearch;
