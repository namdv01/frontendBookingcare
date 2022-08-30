import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { getAllCodes, getDoctorInfo } from "../redux/thunk";
import { BACKEND_API } from "../utils/constant";
import axios from "axios";
import "../scss/formBooking.scss";
import { useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormBookingExamination = (props) => {
  const formRef = useRef(null);
  const isVietNam = useSelector((state) => state.translateReducer.isVietNamese);
  const genders = useSelector((state) => state.userSystemReducer.genders);
  const doctorInfo = useSelector((state) => state.userSystemReducer.doctorInfo);

  const dispatch = useDispatch();
  const params = useParams();
  const [defaultInfo, setDetaultInfo] = useState({});

  const close = (e) => {
    console.log("đã đóng");
    props.setOpenTab(false);
    console.log(props.timeChoose);
    console.log(props.scheduleChoose);
    console.log(params.idDoctor);
    console.log(props.doctorDetail);
  };

  useEffect(() => {
    dispatch(getAllCodes("gender"));
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutSide, true);
    //kết thúc bắt sự kiện
    return () => {
      document.removeEventListener("click", handleOutSide, true);
    };
  }, [props.openTab]);

  const handleOutSide = (e) => {
    if (!formRef.current?.contains(e.target)) {
      close(e);
    } else {
    }
  };

  const handleFocus = (e, key) => {
    errorMes[key] = "";
    setErrorMes({ ...errorMes });
  };

  const onChangeFormValue = (e, key) => {
    formValue[key] = e.target.value;
    setFormValue({ ...formValue });
  };

  const handleSubmit = (e) => {
    if (
      validator.isEmail(formValue.email) &&
      moment(formValue.date, "DD/MM/YYYY", true).isValid() &&
      formValue.fullName &&
      formValue.genderId &&
      formValue.address &&
      formValue.phoneNumber &&
      formValue.reason
    ) {
      formValue.chooseDate = moment(formValue.date).format("DD/MM/YYYY");
      setFormValue({ ...formValue });
      const createSchedule = async () => {
        const result = await axios
          .post(`${BACKEND_API}/user/bookingSchedule`, {
            email: formValue.email,
            fullName: formValue.fullName,
            address: formValue.address,
            phoneNumber: formValue.phoneNumber,
            reason: formValue.reason,
            date: formValue.chooseDate,
            doctorId: props.doctorDetail.id,
            timeType: props.timeChooseValue,
            isVietNam,
            dateSchedule: props.scheduleChoose,
          })
          .then((res) => res.data);
        if (result.success) {
          return true;
        }
        return false;
      };
      if (createSchedule()) {
        props.notify("success", "tạo lịch thành công,vui lòng kiểm tra email");
        close(e);
        setFormValue({
          ...formValue,
          email: "",
          fullName: "",
          address: "",
          genderId: "M",
          phoneNumber: "",
          reason: "",
          date: null,
          chooseDate: "",
        });
      } else {
        props.notify("error", "tại không thành công");
      }
    } else if (!validator.isEmail(formValue.email)) {
      errorMes.email = isVietNam ? "Email không hợp lệ" : "Email not valid";
      setErrorMes({ ...errorMes });
    }
  };

  const [errorMes, setErrorMes] = useState({
    email: "",
    date: "",
  });

  const [formValue, setFormValue] = useState({
    email: "",
    fullName: "",
    address: "",
    genderId: "M",
    phoneNumber: "",
    reason: "",
    date: null,
    chooseDate: "",
  });

  const clearAllFields = (e) => {
    setFormValue({
      ...formValue,
      address: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      phoneNumber: "",
      genderId: "M",
      date: null,
      chooseDate: "",
      reason: "",
    });
  };

  return (
    <div className="formBookingExamination">
      <form ref={formRef}>
        <div className="title">
          <div className="close" onClick={close}>
            <AiOutlineClose color="#ccc" size="24" />
          </div>
          <span>
            <FormattedMessage id={`system.createnewScheduleExamination`} />
          </span>
        </div>
        <div className="defaultInfo">
          <div className="left">
            <img src={props.doctorDetail.image} alt="" />
          </div>
          <div className="right">
            <div className="name">
              <h3>{props.doctorDetail.fullName}</h3>
              <p>{props.doctorDetail.idData.description}</p>
              <p>
                <FormattedMessage id="doctorInfoEle.examinationPrice" />:
                {isVietNam
                  ? doctorInfo.priceData.valueVi + " đ"
                  : doctorInfo.priceData.valueEn + " USD"}
              </p>
            </div>
            <div className="time">
              <span>
                <FormattedMessage id="detailDoctor.schedule" />:
              </span>
              <span>{props.timeChoose}, </span>
              <span>{props.scheduleChoose}</span>
            </div>
          </div>
        </div>
        <TextField
          label={<FormattedMessage id="system.email" />}
          error={errorMes.email != "" ? true : false}
          onFocus={(e) => handleFocus(e, "email")}
          value={formValue.email}
          onChange={(e) => {
            onChangeFormValue(e, "email");
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ margin: "8px 5%", width: "40%" }}
          helperText={errorMes.email}
        />
        <TextField
          label={<FormattedMessage id="system.fullname" />}
          value={formValue.fullName}
          onChange={(e) => {
            onChangeFormValue(e, "fullName");
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ margin: "8px 5%", width: "40%" }}
        />

        <TextField
          label={<FormattedMessage id="system.phonenumber" />}
          value={formValue.phoneNumber}
          onChange={(e) => {
            onChangeFormValue(e, "phoneNumber");
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ margin: "8px 5%", width: "40%" }}
        />

        <TextField
          label={<FormattedMessage id="system.address" />}
          value={formValue.address}
          onChange={(e) => {
            onChangeFormValue(e, "address");
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ margin: "8px 5%", width: "40%" }}
        />

        <FormControl
          style={{ width: "40%", margin: "8px 5%" }}
          variant="outlined"
        >
          <InputLabel shrink htmlFor="gender" variant="outlined">
            {<FormattedMessage id="system.gender" />}
          </InputLabel>
          <NativeSelect
            native
            value={formValue.genderId}
            onChange={(e) => {
              onChangeFormValue(e, "genderId");
            }}
            inputProps={{
              name: "genderId",
              id: "gender",
            }}
          >
            {genders.map((item, index) => {
              return (
                <option key={`gender${index}`} value={item.keyMap}>
                  {isVietNam ? item.valueVi : item.valueEn}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        <div
          className="date"
          style={{
            margin: "8px 5%",
            width: "40%",
            height: "51px",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <h4 style={{ marginRight: "12px" }}>
            <FormattedMessage id="system.birthday" />
          </h4>
          <DatePicker
            placeholderText={isVietNam ? "ngày/tháng/năm" : "day/month/year"}
            maxDate={new Date()}
            minDate={new Date("1/1/1900")}
            dateFormat="dd/MM/yyyy"
            styles={{ minHeight: "60px", padding: "15px 0" }}
            selected={formValue.date}
            onChange={(date) => {
              setFormValue({
                ...formValue,
                date,
              });
            }}
          />
        </div>

        <TextField
          label={<FormattedMessage id="system.reason" />}
          value={formValue.reason}
          onChange={(e) => {
            onChangeFormValue(e, "reason");
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ margin: "8px 5%", width: "90%" }}
        />

        <div className="btns">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ margin: "8px" }}
          >
            <FormattedMessage id={`system.btnCreateExamination`} />
          </Button>
          <Button
            onClick={clearAllFields}
            variant="contained"
            color="default"
            style={{ margin: "8px" }}
          >
            <FormattedMessage id={`system.btnRemoveExamination`} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormBookingExamination;
