import { LOGIN, BEGIN_STATE, LOGOUT } from "./constants";
import { authInitState } from "./reducer";
import configHeaderToken from "../utils/axios";

const authReducer = (state = authInitState, action) => {
  switch (action.type) {
    case LOGIN:
      const token = action.payload;
      localStorage.setItem("bookingcareToken", token);
      configHeaderToken(token);
      return {
        ...state,
        isLogin: true,
        token: token,
        isLoading: false,
      };

    case BEGIN_STATE:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        token: action.payload.token,
        isLoading: false,
      };

    case LOGOUT:
      localStorage.removeItem("bookingcareToken");
      return {
        ...state,
        isLogin: false,
        token: "",
      };

    case "test":
      return {
        ...state,
        isLogin: true,
      };

    default:
      return state;
  }
};

export default authReducer;
