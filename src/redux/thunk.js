import axios from "axios";
import {
  LOGIN,
  BEGIN_STATE,
  LOGOUT,
  GET_ALL_USER,
  CREATE_NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_ALL_GENDER,
  GET_ALL_ROLE,
  GET_ALL_POSITION,
  GET_LIMIT_DOCTOR,
  GET_ALL_DOCTOR,
  POST_DETAIL_DOCTOR,
  GET_CODE_DOCTOR_INFO,
  GET_DOCTOR_INFO,
} from "./constants";
import { BACKEND_API } from "../utils/constant";
import configHeaderToken from "../utils/axios";

export const getUser = (value) => {
  return async (dispatch, getState) => {
    try {
      console.log(value);
      //isLoading
      getState().authReducer.isLoading = true;

      const user = await axios
        .post(`${BACKEND_API}/user/login`, {
          username: value.email,
          password: value.password.value,
        })
        .then((res) => res.data);
      console.log(user);
      dispatch({ type: LOGIN, payload: user.token });
    } catch (error) {
      console.log(`error: ${error.response.data.error}`);
    }
  };
};

export const getTestToken = () => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .get(`${BACKEND_API}/service/getAllCodes`)
        .then((res) => res.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
};

export const beginAuthState = () => {
  return async (dispatch, getState) => {
    try {
      getState().authReducer.isLoading = true;

      if (localStorage.getItem("bookingcareToken")) {
        const token = localStorage.getItem("bookingcareToken");
        configHeaderToken(token);
        const check = await axios
          .get(`${BACKEND_API}/service/verifyToken`)
          .then((res) => res.data);
        if (check.success) {
          dispatch({ type: BEGIN_STATE, payload: { isLogin: true, token } });
        } else {
          localStorage.removeItem("bookingcareToken");
          dispatch({
            type: BEGIN_STATE,
            payload: { isLogin: false, token: "" },
          });
        }
      } else {
        dispatch({
          type: BEGIN_STATE,
          payload: { isLogin: false, token: "" },
        });
      }
    } catch (error) {
      localStorage.removeItem("bookingcareToken");
      dispatch({
        type: BEGIN_STATE,
        payload: { isLogin: false, token: "" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      await axios.get(`${BACKEND_API}/user/logout`);
      dispatch({ type: LOGOUT });
    } catch (error) {
      dispatch({ type: LOGOUT });
    }
  };
};

export const getAllUser = (value) => {
  return async (dispatch, getState) => {
    try {
      const users = await axios
        .post(`${BACKEND_API}/user/getUser`, {
          id: value,
        })
        .then((res) => res.data);
      dispatch({ type: GET_ALL_USER, payload: users.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewUser = (value) => {
  return async (dispatch, getState) => {
    try {
      const {
        email,
        password,
        fullName,
        address,
        genderId,
        roleId,
        phoneNumber,
        positionId,
      } = value;
      const result = await axios
        .post(`${BACKEND_API}/user/createNewUser`, value, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
      if (result.success) {
        dispatch({ type: CREATE_NEW_USER, payload: result.user });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const deleteUser = (value) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .delete(`${BACKEND_API}/user/deleteUser/${value}`)
        .then((res) => res.data);
      console.log(result);
      if (result.success) {
        dispatch({ type: DELETE_USER, payload: value });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const editUser = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .patch(`${BACKEND_API}/user/updateUser/${id}`, value)
        .then((res) => res.data);
      if (result.success) {
        dispatch({ type: EDIT_USER, payload: result.user });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getAllCodes = (value) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .get(`${BACKEND_API}/service/getAllCodes/${value}`)
        .then((res) => res.data);
      if (result.success) {
        switch (value) {
          case "gender":
            dispatch({ type: GET_ALL_GENDER, payload: result.codes });
            break;
          case "role":
            dispatch({ type: GET_ALL_ROLE, payload: result.codes });
            break;
          case "position":
            dispatch({ type: GET_ALL_POSITION, payload: result.codes });
            break;
        }

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getDoctors = (limit) => {
  return async (dispatch, getState) => {
    try {
      const doctors = await axios
        .get(`${BACKEND_API}/doctor/getDoctors/${limit}`)
        .then((res) => res.data);
      if (doctors.success) {
        dispatch({ type: GET_LIMIT_DOCTOR, payload: doctors.doctors });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const doctors = await axios
        .get(`${BACKEND_API}/doctor/getAllDoctors`)
        .then((res) => res.data);
      console.log(doctors);
      if (doctors.success) {
        const fixs = doctors.doctors.map((doctor) => {
          return {
            value: doctor.fullName,
            label: doctor.fullName,
            id: doctor.id,
            contentHTML: doctor?.idData.contentHTML,
            contentText: doctor?.idData.contentMarkdown,
            introDoctor: doctor?.idData.description,
            idInfoData: doctor.idInfoData,
          };
        });
        console.log(fixs);
        dispatch({ type: GET_ALL_DOCTOR, payload: fixs });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const postDetailDoctor = (value) => {
  return async (dispatch, getState) => {
    try {
      const detail = await axios.post(
        `${BACKEND_API}/doctor/postDetailDoctor`,
        value
      );
      if (detail.success) {
        console.log(detail);
        return true;
        // dispatch({
        //   type: POST_DETAIL_DOCTOR,
        //   payload: { markdown: detail.markdown, doctorInfo: detail.doctorInfo },
        // });
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getCodeDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .get(`${BACKEND_API}/service/getCodeForDoctorInfo`)
        .then((res) => res.data);
      if (result.success) {
        dispatch({
          type: GET_CODE_DOCTOR_INFO,
          payload: result.codes.map((item) => {
            return { ...item, value: item.keyMap, label: item.valueVi };
          }),
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getDoctorInfo = (value) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios
        .post(`${BACKEND_API}/doctor/getDoctorInfo`, { doctorId: value })
        .then((res) => res.data);
      if (result.success) {
        dispatch({ type: GET_DOCTOR_INFO, payload: result.result });
        console.log(result);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};
