import React, { useEffect } from "react";
import FormLogin from "../components/FormLogin";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { beginAuthState } from "../redux/thunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (auth.isLogin) navigate("../system");
    else if (localStorage.getItem("bookingcareToken")) {
      dispatch(beginAuthState());
    }
  }, [auth]);

  return (
    <div className="loginContainer">
      <FormLogin />
    </div>
  );
};

export default Login;
