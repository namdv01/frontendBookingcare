import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/thunk";

const DialogMes = (props) => {
  const dispatch = useDispatch();

  const agreeRemoveUser = (e, id) => {
    if (dispatch(deleteUser(id))) {
      props.notify("success", "Remove user success");
      props.handleClose();
    } else {
      props.notify("error", "Not remove user now!!!");
    }
  };

  return (
    <Dialog
      style={{ padding: "16px 24px" }}
      open={true}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ background: "red", color: "white", fontSize: "20px" }}
      >
        Cảnh báo xóa user
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ padding: "20px 16px" }}
          color="textPrimary"
        >
          xóa bỏ {props.userSelector.fullName} hoàn toàn khỏi hệ thống
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={(e) => agreeRemoveUser(e, props.userSelector.id)}
        >
          Thực hiện xóa
        </Button>
        <Button color="default" onClick={props.handleClose}>
          Hủy thao tác
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMes;
