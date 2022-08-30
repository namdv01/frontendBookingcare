import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ToastContainer, toast } from "react-toastify";
import MarkDown from "./MarkDown";
import "../scss/manageSpecialist.scss";
import {
  TextField,
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecialist, postNewSpecialist } from "../redux/thunk";
import Select from "react-select";
import { useEffect } from "react";

const ManageSpecialist = () => {
  const notify = (type, value) =>
    toast[type](value, {
      draggable: false,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: "1500",
      closeOnClick: true,
    });

  const dispatch = useDispatch();
  const oldSpecialist = useSelector(
    (state) => state.userSystemReducer.allSpecialist
  );

  const [textValue, setTextValue] = useState({
    name: "",
    image: null,
    markdown: {
      contentHTML: "",
      contentText: "",
    },
  });

  const [idSpecialist, setIdSpecialist] = useState(null);

  const data = () => {
    const formData = new FormData();
    formData.append("name", textValue.name);
    formData.append("image", textValue.image);
    formData.append("description", textValue.markdown.contentHTML);
    return formData;
  };

  const onChangeMarkdown = ({ html, text }) => {
    setTextValue({
      ...textValue,
      markdown: { ...textValue.markdown, contentHTML: html, contentText: text },
    });
  };

  const submitFormSpecialist = async (e) => {
    const result = dispatch(postNewSpecialist(data()));

    if (result) {
      notify("success", "tạo thêm chuyên khoa thành công");
    } else {
      notify("error", "Có lỗi khi tạo chuyên khoa");
    }
  };

  const onChangeUploadFile = (e) => {
    setTextValue({ ...textValue, image: e.target.files[0] });
  };

  useEffect(() => {
    dispatch(getAllSpecialist());
  }, []);

  return (
    <div className="manageSpecialist">
      <ToastContainer></ToastContainer>

      <h2>
        <FormattedMessage id="manageSpecialist.title" />
      </h2>
      <div className="top">
        <div className="name">
          <h4>
            <FormattedMessage id="manageSpecialist.name" />
          </h4>
          <TextField
            // onFocus={(e) => handleFocus(e, "email")}
            // value={formValue.email}
            name="name"
            value={textValue.name}
            onChange={(e) => {
              setTextValue({ ...textValue, name: e.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ margin: "8px 20% 24px 0", width: "80%" }}
          />
        </div>
        <div className="img">
          <h4>
            <FormattedMessage id="manageSpecialist.img" />
          </h4>
          <TextField
            onChange={onChangeUploadFile}
            type="file"
            name="image"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ margin: "8px 20% 24px 0", width: "80%" }}
          />
        </div>
        <div className="oldSpecialist">
          <h4>
            <FormattedMessage id="manageSpecialist.oldSpecialist" />
          </h4>
          <Select
            styles={{ minHeight: "60px", width: "80%", margin: "8px 10%" }}
            defaultValue={idSpecialist}
            onChange={(e) => {
              setIdSpecialist(e.value);
              textValue.markdown.contentText = e.description;
              setTextValue({ ...textValue, name: e.label });
            }}
            options={oldSpecialist}
          />
        </div>
      </div>
      <div>
        <MarkDown
          state={textValue.markdown}
          onChangeMarkdown={onChangeMarkdown}
        />
      </div>
      <div className="btnBorder">
        <button onClick={submitFormSpecialist}>
          <FormattedMessage id="systemManageDoctor.buttonSave" />
        </button>
      </div>
    </div>
  );
};

export default ManageSpecialist;
