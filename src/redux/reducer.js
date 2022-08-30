import axios from "axios";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import translateReducer from "./translationReducer";
import { BACKEND_API } from "../utils/constant";
import testReducer from "./testReducer";
import userSystemReducer from "./usersSystemReducer";
import en from "../utils/translation/en.json";
import vi from "../utils/translation/vi.json";
import { withReduxStateSync } from "redux-state-sync";

const authInitState = {
  isLogin: false,
  token: "",
  isLoading: false,
};

const translateInitState = {
  isVietNamese: true,
  language: "vi",
  messages: vi,
};

const testInitState = {
  number: 1,
};

const systemInitState = {
  users: [],
  genders: [],
  roles: {},
  positions: {},
  doctors: [],
  allDoctors: [],
  codeDoctorInfo: [],
  doctorInfo: {},
  allSpecialist: [],
  allClinic: [],
};

const rootReducer = combineReducers({
  authReducer,
  translateReducer,
  testReducer,
  userSystemReducer,
});
export default withReduxStateSync(rootReducer);
// export default rootReducer;

export { authInitState, translateInitState, testInitState, systemInitState };
