import React, { useEffect, useState } from "react";
import TableManageUser from "./TableManageUser";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@material-ui/core";
import axios from "axios";
import { BACKEND_API } from "../utils/constant";
import SystemCreateUser from "./SystemCreateUser";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getAllCodes, getAllUser } from "../redux/thunk";
import { FormattedMessage } from "react-intl";

const UserManageSys = () => {
  const users = useSelector((state) => state.userSystemReducer.users);
  const genders = useSelector((state) => state.userSystemReducer.genders);

  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  const notify = (type, value) =>
    toast[type](value, {
      draggable: false,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: "3000",
      closeOnClick: true,
    });

  useEffect(() => {
    dispatch(getAllUser("all"));
    dispatch(getAllCodes("gender"));
    dispatch(getAllCodes("role"));
    dispatch(getAllCodes("position"));
  }, []);

  const open = (e) => {
    setOpenForm(true);
  };

  return (
    <div className="userManageSys" style={{ margin: "36px 5%" }}>
      <ToastContainer></ToastContainer>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          textTransform: "uppercase",
          color: "#007bff",
        }}
      >
        <FormattedMessage id="system.manage.user" />
      </h2>

      <Button
        onClick={open}
        variant="contained"
        color="secondary"
        startIcon={<AiOutlinePlus style={{ fontWeight: "bold" }} />}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <FormattedMessage id="system.manage.addUser" />
      </Button>
      <TableManageUser notify={notify} />
      {openForm ? (
        <SystemCreateUser
          notify={notify}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserManageSys;
