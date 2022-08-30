import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClinic } from "../redux/thunk";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import "../scss/scrollClinic.scss";

const ScrollClinic = () => {
  const allClinic = useSelector((state) => state.userSystemReducer.allClinic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllClinic());
  }, []);

  const rollback = (e) => {
    navigate("../");
  };

  const navigatePage = (e, item) => {
    navigate(`/clinic/${item.id}`);
  };

  return (
    <div className="scrollClinic">
      <div className="title">
        <i className="iconRollback">
          <AiOutlineArrowLeft onClick={rollback} />
        </i>
        <span>Co so y te</span>
      </div>
      <div className="body">
        {allClinic.map((item, i) => {
          return (
            <div
              key={`Clinicscroll${i}`}
              className="scrollClinic__item"
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

export default ScrollClinic;
