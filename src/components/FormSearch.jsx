import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { placeHolderSearch } from "../utils/constant";
import { FormattedMessage, useIntl } from "react-intl";
import "../scss/formSearch.scss";

const FormSearch = () => {
  const intl = useIntl();
  const [indexPH, setIndexPH] = useState(0);
  const loopPlaceHolderSearch = () => {
    var newIndexPH = (indexPH + 1) % placeHolderSearch.length;
    setIndexPH(newIndexPH);
  };
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setTimeout(() => {
      loopPlaceHolderSearch();
    }, 5000);
  }, [indexPH]);
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  const removeSearchValue = (e) => {
    setSearchValue("");
  };
  return (
    <div className="formSearch">
      <div className="borderSearch">
        <BsSearch size={20} color="#333" />
        <input
          type="text"
          value={searchValue}
          onChange={changeSearchValue}
          placeholder={intl.formatMessage({
            id: `searh_form.${placeHolderSearch[indexPH]}`,
          })}
        />
      </div>
      {searchValue ? (
        <AiFillCloseCircle size={18} color="#333" onClick={removeSearchValue} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormSearch;
