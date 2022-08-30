import React, { useEffect, useState } from "react";
import MarkDown from "./MarkDown";
import Select from "react-select";
import "../scss/systemManageDoctor.scss";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllClinic,
  getAllDoctors,
  getAllSpecialist,
  getCodeDoctorInfo,
  getDoctorInfo,
  postDetailDoctor,
} from "../redux/thunk";

const SystemManageDoctor = () => {
  const options = useSelector((state) => state.userSystemReducer.allDoctors);
  const codes = useSelector((state) => state.userSystemReducer.codeDoctorInfo);
  const allSpecialist = useSelector(
    (state) => state.userSystemReducer.allSpecialist
  );
  const allClinic = useSelector((state) => state.userSystemReducer.allClinic);
  const doctorInfos = useSelector(
    (state) => state.userSystemReducer.doctorInfo
  );
  const isVietNamese = useSelector(
    (state) => state.translateReducer.isVietNamese
  );
  const dispatch = useDispatch();

  const [textValue, setTextValue] = useState({
    doctorOption: null,
    idDoctorOption: null,
    priceOption: null,
    paymentOption: null,
    provinceOption: null,
    specialistOption: null,
    clinicOption: null,
    listPrice: [],
    listPayment: [],
    listProvince: [],
    introDoctor: "",
    markdown: {
      contentHTML: "",
      contentText: "",
    },
    nameClinic: "",
    addressClinic: "",
    noteClinic: "",
    idInfoData: {},
  });

  const notify = (type, value) =>
    toast[type](value, {
      draggable: false,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: "3000",
      closeOnClick: true,
    });

  const submitFormDoctor = (e) => {
    console.log(textValue);
    if (
      textValue.introDoctor != "" &&
      textValue.markdown.contentHTML != "" &&
      textValue.markdown.contentText != "" &&
      textValue.priceOption != null &&
      textValue.specialistOption != null &&
      textValue.clinicOption != null &&
      textValue.provinceOption != null &&
      textValue.paymentOption != null &&
      textValue.nameClinic != "" &&
      textValue.addressClinic != "" &&
      textValue.noteClinic != ""
    ) {
      if (
        dispatch(
          postDetailDoctor({
            doctorId: textValue.idDoctorOption,
            contentHTML: textValue.markdown.contentHTML,
            contentMarkdown: textValue.markdown.contentText,
            description: textValue.introDoctor,
            priceId: textValue.priceOption,
            provinceId: textValue.provinceOption,
            paymentId: textValue.paymentOption,
            specialtyId: textValue.specialistOption,
            clinicId: textValue.clinicOption,
            nameClinic: textValue.nameClinic,
            addressClinic: textValue.addressClinic,
            note: textValue.noteClinic,
          })
        )
      )
        notify("success", "Thêm thông tin bác sĩ thành công");
    } else {
      notify("error", "Thêm thông tin bác sĩ thất bại");
    }
  };

  const onChange = (e, id) => {
    const value = e.target.value;
    setTextValue({ ...textValue, [id]: value });
  };

  const onChangeMarkdown = ({ html, text }) => {
    setTextValue({
      ...textValue,
      markdown: { ...textValue.markdown, contentHTML: html, contentText: text },
    });
  };

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getCodeDoctorInfo());
    dispatch(getAllSpecialist());
    dispatch(getAllClinic());
  }, []);

  const updateState = () => {
    let _prices = codes.filter((item) => item.type == "PRICE");
    let _payments = codes.filter((item) => item.type == "PAYMENT");
    let _provinces = codes.filter((item) => item.type == "PROVINCE");
    if (isVietNamese) {
      _prices = _prices.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueVi };
      });
      _payments = _payments.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueVi };
      });
      _provinces = _provinces.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueVi };
      });
    } else {
      _prices = _prices.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueEn };
      });
      _payments = _payments.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueEn };
      });
      _provinces = _provinces.map((item) => {
        return { ...item, value: item.keyMap, label: item.valueEn };
      });
    }
    setTextValue({
      ...textValue,
      listPrice: _prices,
      listPayment: _payments,
      listProvince: _provinces,
    });
  };

  useEffect(() => {
    updateState();
  }, [codes]);

  useEffect(() => {
    updateState();
  }, [isVietNamese]);

  return (
    <div className="systemManageDoctor">
      <h2 className="title">
        <FormattedMessage id="systemManageDoctor.title" />
      </h2>
      <div className="topConent">
        <div className="left">
          <FormattedMessage id="systemManageDoctor.chooseDoctor" />
          <Select
            defaultValue={textValue.doctorOption}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.chooseDoctor" />
                ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                doctorOption: e.value,
                idDoctorOption: e.id,
                introDoctor: e.introDoctor,
                markdown: {
                  ...textValue.markdown,
                  contentHTML: e.contentHTML,
                  contentText: e.contentText,
                },
                idInfoData: e.idInfoData,
                nameClinic: e.idInfoData.nameClinic,
                addressClinic: e.idInfoData.addressClinic,
                noteClinic: e.idInfoData.note,
                priceOption: e.idInfoData.priceId,
                provinceOption: e.idInfoData.provinceId,
                paymentOption: e.idInfoData.paymentId,
                specialistOption: e.idInfoData.specialtyId,
                clinicOption: e.idInfoData.clinicId,
              });
              // callDetail(e.value);
            }}
            options={options}
          />
        </div>
        <div className="right">
          <FormattedMessage id="systemManageDoctor.introDoctor" />
          <textarea
            name=""
            id=""
            onChange={(e) => onChange(e, "introDoctor")}
            value={textValue.introDoctor}
          >
            {textValue.introDoctor}
          </textarea>
        </div>
      </div>
      <div className="centerContent">
        <div className="price">
          <FormattedMessage id="systemManageDoctor.price" />
          <Select
            value={{
              label: textValue.listPrice.find(
                (item) => item.value == textValue.priceOption
              )?.label,
              value: textValue.priceOption,
            }}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.price" /> ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                priceOption: e.value,
              });
            }}
            options={textValue.listPrice}
          />
        </div>
        <div className="payment">
          <FormattedMessage id="systemManageDoctor.payment" />
          <Select
            value={{
              label: textValue.listPayment.find(
                (item) => item.value == textValue.paymentOption
              )?.label,
              value: textValue.paymentOption,
            }}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.payment" /> ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                paymentOption: e.value,
              });
            }}
            options={textValue.listPayment}
          />
        </div>
        <div className="province">
          <FormattedMessage id="systemManageDoctor.province" />
          <Select
            value={{
              label: textValue.listProvince.find(
                (item) => item.value == textValue.provinceOption
              )?.label,
              value: textValue.provinceOption,
            }}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.province" /> ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                provinceOption: e.value,
              });
            }}
            options={textValue.listProvince}
          />
        </div>
        <div className="specialist">
          <FormattedMessage id="systemManageDoctor.specialist" />
          <Select
            value={{
              label: allSpecialist.find(
                (item) => item.value == textValue.specialistOption
              )?.label,
              value: textValue.specialistOption,
            }}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.price" /> ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                specialistOption: e.value,
              });
            }}
            options={allSpecialist}
          />
        </div>
        <div className="clinic">
          <FormattedMessage id="systemManageDoctor.clinic" />
          <Select
            value={{
              label: allClinic.find(
                (item) => item.value == textValue.clinicOption
              )?.label,
              value: textValue.clinicOption,
            }}
            placeholder={
              <>
                <FormattedMessage id="systemManageDoctor.clinic" /> ...
              </>
            }
            onChange={(e) => {
              setTextValue({
                ...textValue,
                clinicOption: e.value,
              });
            }}
            options={allClinic}
          />
        </div>
      </div>
      <div className="bottomContent">
        <div className="nameClinic">
          <label htmlFor="">
            <FormattedMessage id="systemManageDoctor.nameClinic" />
          </label>
          <input
            type="text"
            name="nameClinic"
            value={textValue.nameClinic}
            onChange={(e) => onChange(e, "nameClinic")}
          />
        </div>
        <div className="addressClinic">
          <label htmlFor="">
            <FormattedMessage id="systemManageDoctor.addressClinic" />
          </label>
          <input
            type="text"
            name="addressClinic"
            value={textValue.addressClinic}
            onChange={(e) => onChange(e, "addressClinic")}
          />
        </div>
        <div className="noteClinic">
          <label htmlFor="">
            <FormattedMessage id="systemManageDoctor.note" />
          </label>
          <input
            type="text"
            name="note"
            value={textValue.noteClinic}
            onChange={(e) => onChange(e, "noteClinic")}
          />
        </div>
      </div>
      <MarkDown
        state={textValue.markdown}
        onChangeMarkdown={onChangeMarkdown}
      />
      <button onClick={submitFormDoctor}>
        <FormattedMessage id="systemManageDoctor.buttonSave" />
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SystemManageDoctor;
