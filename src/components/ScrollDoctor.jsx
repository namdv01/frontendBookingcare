import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../redux/thunk";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import "../scss/scrollDoctor.scss";

const ScrollDoctor = () => {
  const allDoctor = useSelector((state) => state.userSystemReducer.doctors);
  const isVietNam = useSelector((state) => state.translateReducer.isVietNamese);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const rollback = (e) => {
    navigate("../");
  };

  const navigatePage = (e, item) => {
    navigate(`${item.id}`);
  };

  return (
    <div className="scrollDoctor">
      <div className="title">
        <i className="iconRollback">
          <AiOutlineArrowLeft onClick={rollback} />
        </i>
        <span>Bac si</span>
      </div>
      <div className="body">
        {allDoctor.map((item, i) => {
          return (
            <div
              key={`Doctorscroll${i}`}
              className="scrollDoctor__item"
              onClick={(e) => navigatePage(e, item)}
            >
              <img src={item.image} alt="" />
              <div className="name">
                <p>
                  {isVietNam
                    ? item.positionData.valueVi != null
                      ? item.positionData.valueVi
                      : ""
                    : item.positionData.valueEn != null
                    ? item.positionData.valueEn
                    : ""}{" "}
                  {item.fullName}
                </p>
                <p></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollDoctor;
