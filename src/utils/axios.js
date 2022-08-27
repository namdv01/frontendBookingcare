import axios from "axios";
const configHeaderToken = (token) => {
  if (token != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export default configHeaderToken;
