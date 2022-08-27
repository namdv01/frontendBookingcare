import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../scss/scheduleManage.scss";
import CustomDatePicker from "./CustomDatePicker";
import { useSelector, useDispatch } from "react-redux";
import { getAllDoctors } from "../redux/thunk";
import axios from "axios";
import { BACKEND_API } from "../utils/constant";
import moment from "moment";

const ScheduleManage = () => {
  const options = useSelector((state) => state.userSystemReducer.allDoctors);
  const isVietNam = useSelector((state) => state.translateReducer.isVietNamese);
  const dispatch = useDispatch();
  const [time, setTime] = useState([]);
  const [date, setDate] = useState(null);
  const [idDoctor, setIdDoctor] = useState(null);

  const chooseDateTime = (e, value, i) => {
    time[i].isSelect = !time[i].isSelect;
    setTime([...time]);
  };

  const submitDateTime = (e) => {
    const chooseid = idDoctor.id;
    const choosedate = moment(date).format("DD/MM/YYYY");
    const chooseTime = time
      .filter((t, i) => {
        return t.isSelect;
      })
      .map((_t) => {
        return _t.keyMap;
      });

    const data =
      chooseTime.length > 0
        ? chooseTime.map((t) => {
            return {
              doctorId: chooseid,
              date: choosedate,
              timeType: t,
            };
          })
        : [{ doctorId: chooseid, date: choosedate, timeType: null }];
    const postBulkSchedule = async () => {
      try {
        const result = await axios
          .post(`${BACKEND_API}/doctor/bulkSchedule`, {
            data,
          })
          .then((res) => res.data);
        return result;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    console.log(postBulkSchedule());
  };

  useEffect(() => {
    dispatch(getAllDoctors());
  }, []);

  useEffect(() => {
    const callDateTime = async () => {
      try {
        const result = await axios
          .get(`${BACKEND_API}/service/getTimes`)
          .then((res) => res.data);
        if (result.success) {
          const ts = result.time.map((t) => {
            return { ...t, isSelect: false };
          });
          setTime([...ts]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callDateTime();
  }, []);

  return (
    <div className="scheduleManage-Container">
      <div className="choose">
        <div className="doctor">
          <h3>Chọn bác sĩ</h3>
          <Select
            styles={{ minHeight: "60px" }}
            defaultValue={idDoctor}
            onChange={setIdDoctor}
            options={options}
          />
        </div>
        <div className="date">
          <h3>Chọn ngày</h3>
          <CustomDatePicker date={date} setDate={setDate} />
        </div>
      </div>
      <div className="datetime">
        {time.map((item, i) => {
          return (
            <div
              className={item.isSelect ? "activeTime" : ""}
              onClick={(e) => chooseDateTime(e, item.valueVi, i)}
            >
              {isVietNam ? item.valueVi : item.valueEn}
            </div>
          );
        })}
      </div>
      <div className="btn">
        <button onClick={submitDateTime}>Lưu thông tin </button>
      </div>
    </div>
  );
};

export default ScheduleManage;
