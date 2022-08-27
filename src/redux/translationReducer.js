import { translateInitState } from "./reducer";
import { TRANSLATE_EN, TRANSLATE_VN, BEGIN_LANGUAGE } from "./constants";
import en from "../utils/translation/en.json";
import vi from "../utils/translation/vi.json";

const translateReducer = (state = translateInitState, action) => {
  switch (action.type) {
    case TRANSLATE_EN:
      localStorage.setItem("bookingcareLanguage", "en");
      return {
        ...state,
        isVietNamese: false,
        language: "en",
        messages: en,
      };
    case TRANSLATE_VN:
      localStorage.setItem("bookingcareLanguage", "vi");
      return {
        ...state,
        isVietNamese: true,
        language: "vi",
        messages: vi,
      };

    case BEGIN_LANGUAGE:
      if (localStorage.getItem("bookingcareLanguage")) {
        const language = localStorage.getItem("bookingcareLanguage");
        return language == "vi"
          ? {
              ...state,
              isVietNamese: true,
              language: "vi",
              messages: vi,
            }
          : {
              ...state,
              isVietNamese: false,
              language: "en",
              messages: en,
            };
      } else {
        localStorage.setItem("bookingcareLanguage", "vi");
        return {
          ...state,
          isVietNamese: true,
          language: "vi",
          messages: vi,
        };
      }

    default:
      return state;
  }
};

export default translateReducer;
