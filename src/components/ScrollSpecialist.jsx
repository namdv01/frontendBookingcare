import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecialist } from "../redux/thunk";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import "../scss/scrollSpecialist.scss";

const ScrollSpecialist = () => {
  const allspecialist = useSelector(
    (state) => state.userSystemReducer.allSpecialist
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllSpecialist());
  }, []);

  const rollback = (e) => {
    navigate("../");
  };

  const navigatePage = (e, item) => {
    navigate(`/specialty/${item.id}`);
  };

  return (
    <div className="scrollSpecialist">
      <div className="title">
        <i className="iconRollback">
          <AiOutlineArrowLeft onClick={rollback} />
        </i>
        <span>Chuyen Khoa</span>
      </div>
      <div className="body">
        {allspecialist.map((item, i) => {
          return (
            <div
              key={`specialistscroll${i}`}
              className="scrollSpecialist__item"
              onClick={(e) => navigatePage(e, item)}
            >
              <img src={item.image} alt="" />
              <div className="name">{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollSpecialist;
