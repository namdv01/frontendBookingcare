import {
  CREATE_NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_ALL_GENDER,
  GET_ALL_POSITION,
  GET_ALL_ROLE,
  GET_ALL_USER,
  GET_LIMIT_DOCTOR,
  GET_ALL_DOCTOR,
  GET_CODE_DOCTOR_INFO,
  POST_DETAIL_DOCTOR,
  GET_DOCTOR_INFO,
} from "./constants";
import { systemInitState } from "./reducer";

const userSystemReducer = (state = systemInitState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      state.users = action.payload;
      return { ...state };

    case CREATE_NEW_USER:
      return { ...state, users: [...state.users, action.payload] };

    case DELETE_USER:
      state.users = state.users.filter((user) => user.id != action.payload);
      return { ...state };

    case EDIT_USER:
      state.users = state.users.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );
      return { ...state };

    case GET_ALL_GENDER:
      state.genders = action.payload;
      return { ...state };

    case GET_ALL_ROLE:
      state.roles = action.payload;
      return { ...state };

    case GET_ALL_POSITION:
      state.positions = action.payload;
      return { ...state };

    case GET_LIMIT_DOCTOR:
      state.doctors = action.payload;
      return { ...state };

    case GET_ALL_DOCTOR:
      state.allDoctors = action.payload;
      return { ...state };

    case GET_CODE_DOCTOR_INFO:
      state.codeDoctorInfo = action.payload;
      return { ...state };

    case GET_DOCTOR_INFO:
      state.doctorInfo = action.payload;
      return { ...state };

    default:
      return state;
  }
};

export default userSystemReducer;
