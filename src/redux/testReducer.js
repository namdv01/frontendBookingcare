import { testInitState } from "./reducer";

const testReducer = (state = testInitState, action) => {
  switch (action.type) {
    case "test_cong":
      return {
        ...state,
        number: state.number + 1,
      };
    default:
      return state;
  }
};

export default testReducer;
