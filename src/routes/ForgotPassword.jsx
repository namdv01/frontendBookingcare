import React from "react";
import AdvertiseSection from "../components/AdvertiseSection";
import { useSelector, useDispatch } from "react-redux";
import FormForgotPassword from "../components/FormForgotPassword";
import SystemCreateUser from "../components/SystemCreateUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarkDown from "../components/MarkDown";

const ForgotPassword = () => {
  const number = useSelector((state) => state.testReducer.number);
  const dispatch = useDispatch();
  const cong = () => {
    dispatch({ type: "test_cong" });
  };

  const notify = () =>
    toast.success("success", {
      draggable: false,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: "5000",
      closeOnClick: true,
    });

  return (
    <div style={{ width: "80%", margin: "10px auto" }}>
      <MarkDown />
      {/* <button onClick={notify}>Notify!</button> */}
      {/* <ToastContainer></ToastContainer> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer /> */}
      {/* <SystemCreateUser /> */}
      {/* <FormForgotPassword /> */}
      {/* <div onClick={cong}>cộng</div> */}
      {/* <div style={{ color: "red" }}>{number}</div> */}
      {/* <AdvertiseSection /> */}
    </div>
  );
};

export default ForgotPassword;
