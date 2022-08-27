import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";
import validator from "validator";
import "../scss/systemEditUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../redux/thunk";
import { FormattedMessage } from "react-intl";

const SystemEditUser = (props) => {
  const close = (e) => {
    props.setOpenForm();
  };

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.userSystemReducer.roles);
  const genders = useSelector((state) => state.userSystemReducer.genders);
  const isVietNam = useSelector((state) => state.translateReducer.isVietNamese);
  const positions = useSelector((state) => state.userSystemReducer.positions);

  const [formValue, setFormValue] = useState({
    email: props.user.email,
    fullName: props.user.fullName,
    address: props.user.address,
    genderId: props.user.genderId,
    roleId: props.user.roleId,
    phoneNumber: props.user.phoneNumber,
    positionId: props.user.positionId,
  });

  const [errorMes, setErrorMes] = useState({
    email: "",
  });

  const onChangeFormValue = (e, key) => {
    formValue[key] = e.target.value;
    setFormValue({ ...formValue });
  };

  const formRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutSide, true);
    //kết thúc bắt sự kiện
    return () => {
      document.removeEventListener("click", handleOutSide, true);
    };
  }, [props.openForm]);

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

  const handleSubmit = (e) => {
    if (validator.isEmail(formValue.email)) {
      console.log("email hợp lệ");
      // console.log(formValue);
      if (dispatch(editUser(props.user.id, formValue))) {
        props.notify("success", "Edit user success");
        props.setOpenForm(false);
      } else {
        props.notify("error", "Edit user fail");
      }
    } else {
      errorMes.email = "Email không hợp lệ";
      setErrorMes({ ...errorMes });
    }
  };

  const clearAll = (e) => {
    setFormValue({
      ...formValue,
      // email: "",
      fullName: "",
      address: "",
      genderId: "",
      roleId: "",
      phoneNumber: "",
      positionId: "",
    });
  };

  return (
    <div className="systemEditUser">
      <form ref={formRef}>
        <div className="title">
          <div className="close" onClick={close}>
            <AiOutlineClose color="#ccc" size="24" />
          </div>
          {<FormattedMessage id="system.editUser" />}
        </div>
        {/* <TextField
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
          style={{ margin: "12px 5%", width: "40%" }}
          helperText={errorMes.email}
        /> */}
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
          style={{ margin: "12px 5%", width: "40%" }}
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
          style={{ margin: "12px 5%", width: "40%" }}
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
          style={{ margin: "12px 5%", width: "90%" }}
        />

        <FormControl style={{ width: "15%", margin: "12px 5%" }}>
          <InputLabel shrink htmlFor="gender">
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
                <option key={`$gender${index}`} value={item.key}>
                  {isVietNam ? item.valueVi : item.valueEn}
                </option>
              );
            })}

            {/* <option vallue="">None</option>
            <option value={"M"}>Male</option>
            <option value={"F"}>Female</option>
            <option value={"O"}>Other</option> */}
          </NativeSelect>
        </FormControl>

        <FormControl style={{ width: "15%", margin: "12px 5%" }}>
          <InputLabel shrink htmlFor="roleId">
            {<FormattedMessage id="system.role" />}
          </InputLabel>
          <NativeSelect
            native
            value={formValue.roleId}
            onChange={(e) => {
              onChangeFormValue(e, "roleId");
            }}
            inputProps={{
              name: "roleId",
              id: "roleId",
            }}
          >
            {roles.map((item, index) => {
              return (
                <option key={`$role{index}`} value={item.key}>
                  {isVietNam ? item.valueVi : item.valueEn}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        <FormControl style={{ width: "15%", margin: "12px 5%" }}>
          <InputLabel shrink htmlFor="positionId">
            {<FormattedMessage id="system.position" />}
          </InputLabel>
          <NativeSelect
            native
            value={formValue.positionId}
            onChange={(e) => {
              onChangeFormValue(e, "positionId");
            }}
            inputProps={{
              name: "roleId",
              id: "positionId",
            }}
          >
            {positions.map((item, index) => {
              return (
                <option value={item.key}>
                  {isVietNam ? item.valueVi : item.valueEn}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        <div className="btns">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ margin: "8px" }}
          >
            {<FormattedMessage id="system.save" />}
          </Button>
          <Button
            variant="contained"
            onClick={clearAll}
            color="default"
            style={{ margin: "8px" }}
          >
            {<FormattedMessage id="system.clearAll" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SystemEditUser;
