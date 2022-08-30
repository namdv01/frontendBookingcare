import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_API } from "../utils/constant";
import localization from "moment/locale/vi";
import "../scss/detailScheduleTime.scss";
import { FaCalendarAlt } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import FormBookingExamination from "./FormBookingExamination";

const DetailScheduleTime = (props) => {
  const checkToDay = (value) => {
    const d1 = moment(value).format("DD/MM");
    const d2 = moment(new Date()).format("DD/MM");
    if (d1 == d2) {
      if (isVietNam)
        return {
          check: true,
          value: `Hôm nay - ${d1}`,
        };
      else
        return {
          check: true,
          value: `Today - ${d1}`,
        };
    } else
      return {
        check: false,
        value,
      };
  };
  const [schedule, setSchedule] = useState([]);
  const [time, setTime] = useState([]);
  const isVietNam = useSelector((state) => state.translateReducer.isVietNamese);
  const [openTab, setOpenTab] = useState(false);
  const [timeChoose, setTimeChoose] = useState("");
  const [timeChooseValue, setTimeChooseValue] = useState("");
  const [scheduleChoose, setScheduleChoose] = useState("");

  useEffect(() => {
    const callDetailDoctor = async () => {
      try {
        const result = await axios
          .get(`${BACKEND_API}/doctor/getScheduleDoctor/${props.idDoctor}`)
          .then((res) => res.data);
        if (result.success) {
          console.log(result.schedule);
          setSchedule([...result.schedule]);
          getDate({
            target: {
              value: result.schedule[0].date,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    callDetailDoctor();
  }, []);

  useEffect(() => {
    setScheduleChoose(
      checkToDay(schedule[0]?.date).check
        ? checkToDay(schedule[0]?.date).value
        : isVietNam
        ? firstLetterUpperCase(moment(schedule[0]?.date).format("dddd DD/MM"))
        : moment(schedule[0]?.date).locale("en").format("dddd DD/MM")
    );
  }, [isVietNam]);

  const getDate = async (e) => {
    const date = checkToDay(e.target.value).check
      ? checkToDay(e.target.value).value
      : isVietNam
      ? firstLetterUpperCase(moment(e.target.value).format("dddd DD/MM"))
      : moment(e.target.value).locale("en").format("dddd DD/MM");
    console.log(date);

    setScheduleChoose(date);
    try {
      const result = await axios
        .post(`${BACKEND_API}/doctor/getScheduleOndayDoctor`, {
          idDoctor: props.idDoctor,
          day: e.target.value,
        })
        .then((res) => res.data);
      if (result.success) {
        setTime([...result.schedule]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firstLetterUpperCase = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <div className="detailScheduleTime">
      {openTab ? (
        <FormBookingExamination
          openTab={openTab}
          setOpenTab={setOpenTab}
          timeChoose={timeChoose}
          timeChooseValue={timeChooseValue}
          scheduleChoose={scheduleChoose}
          doctorDetail={props.doctorDetail}
          notify={props.notify}
        ></FormBookingExamination>
      ) : (
        <></>
      )}
      <select name="" id="" onChange={getDate}>
        {schedule.map((item, index) => {
          return (
            <option value={item.date}>
              {checkToDay(item.date).check
                ? checkToDay(item.date).value
                : isVietNam
                ? firstLetterUpperCase(moment(item.date).format("dddd DD/MM"))
                : moment(item.date).locale("en").format("dddd DD/MM")}
              {/* {isVietNam
                ? firstLetterUpperCase(moment(item.date).format("dddd DD/MM"))
                : moment(item.date).locale("en").format("dddd DD/MM")} */}
            </option>
          );
        })}
      </select>
      <div className="tableSchedule">
        <div className="title">
          <FaCalendarAlt size="20" />
          <span>
            <FormattedMessage id="detailDoctor.schedule" />
          </span>
        </div>
        <div className="times">
          {time.map((item, index) => {
            return item.timeType ? (
              <div
                className="time"
                onClick={(e) => {
                  setOpenTab(true);
                  setTimeChoose(
                    isVietNam ? item.timeData.valueVi : item.timeData.valueEn
                  );
                  setTimeChooseValue(item.timeType);
                }}
              >
                {isVietNam ? item.timeData.valueVi : item.timeData.valueEn}
              </div>
            ) : (
              <span>Không có lịch hẹn tại thời điểm này !!!</span>
            );
          })}
        </div>
      </div>
      <div className="bonus-free">
        <FormattedMessage id="detailDoctor.bookFree" />{" "}
        <BsFillHandIndexThumbFill color="green" size="14" />
      </div>
    </div>
  );
};

export default DetailScheduleTime;
