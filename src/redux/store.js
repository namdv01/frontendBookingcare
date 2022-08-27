import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer, {
  testInitState,
  authInitState,
  translateInitState,
  systemInitState,
} from "./reducer";
import thunk from "redux-thunk";
import { PERSIST, PURGE } from "redux-persist/es/constants";
import { persistStore } from "redux-persist";

import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import { BEGIN_LANGUAGE, TRANSLATE_EN, TRANSLATE_VN } from "./constants";

const config = {
  whitelist: [TRANSLATE_VN, TRANSLATE_EN, BEGIN_LANGUAGE],
};

const store = createStore(
  rootReducer,
  {
    testReducer: testInitState,
    authReducer: authInitState,
    translateReducer: translateInitState,
    userSystemReducer: systemInitState,
  },
  composeWithDevTools(applyMiddleware(createStateSyncMiddleware(config), thunk))
);

initStateWithPrevTab(store);
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
// export default initStateWithPrevTab(store);
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

export default store;
