import "../scss/login.scss";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/thunk";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    showPassword: false,
    value: "",
  });

  useEffect(() => {
    if (isLogin) navigate("../system");
  }, [isLogin]);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword({ ...password, value: e.target.value });
  };

  const toggleVisiblePassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const submitForm = (e) => {
    e.preventDefault();
    // dispatch({ type: "test" });
    dispatch(getUser({ email, password }));
    setEmail("");
    setPassword({
      ...password,
      showPassword: false,
      value: "",
    });
  };

  const forgotPassword = (e) => {
    navigate("../forgotPassword");
  };

  const signUpNow = (e) => {
    navigate("../register");
  };

  return (
    <div className="border-formLogin">
      <form
        onSubmit={submitForm}
        noValidate
        autoComplete="off"
        className="formLogin"
      >
        <h1>Login Form</h1>
        <TextField
          id="inputEmail"
          label="Email"
          margin="normal"
          value={email}
          onChange={changeEmail}
        />

        <FormControl margin="normal">
          <InputLabel>Password</InputLabel>
          <Input
            type={password.showPassword ? "text" : "password"}
            value={password.value}
            onChange={changePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleVisiblePassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {password.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          ></Input>
        </FormControl>

        <Button type="submit" id="btnSubmitLogin" variant="contained">
          Login
        </Button>
        <FormHelperText onClick={forgotPassword} className="forgetPassword">
          Forgot Password ?
        </FormHelperText>
        <h3 className="registerNew">
          Not a member? <span onClick={signUpNow}>Sign up now</span>
        </h3>
      </form>
    </div>
  );
};

export default FormLogin;
