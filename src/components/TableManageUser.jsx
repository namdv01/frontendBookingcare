import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@material-ui/core";
import { ImBin2, ImPen, ImPencil } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import DialogMes from "./DialogMes";
import "../scss/tableManageUser.scss";
import SystemEditUser from "./SystemEditUser";
import { FormattedMessage } from "react-intl";

const TableManageUser = (props) => {
  const users = useSelector((state) => state.userSystemReducer.users);

  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [userSelector, setUserSelector] = useState({
    id: null,
    fullName: "",
  });
  const [openFormEditUser, setOpenFormEditUser] = useState(false);

  const handleOpen = (e) => {
    setOpenDialogRemove(true);
  };

  const handleClose = (e) => {
    setOpenDialogRemove(false);
    setUserSelector({ ...userSelector, id: null, fullName: "" });
  };

  const handleOpenFormEdit = (e) => {
    setOpenFormEditUser(true);
  };

  const handleCloseFormEdit = (e) => {
    setOpenFormEditUser(false);
    setUserSelector({ ...userSelector, id: null, fullName: "" });
  };

  const editUser = (e, id, fullName) => {
    setUserSelector({ ...userSelector, id, fullName });
    handleOpenFormEdit(e);
  };

  const removeUser = (e, id, fullName) => {
    setUserSelector({ ...userSelector, id, fullName });
    handleOpen(e);
  };

  return (
    <>
      <TableContainer
        className="tableFull"
        component={Paper}
        style={{ width: "100%", margin: "0 auto" }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "green" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                {<FormattedMessage id="system.order" />}
              </TableCell>

              <TableCell
                style={{ color: "white", fontSize: "18px" }}
                align="right"
              >
                {<FormattedMessage id="system.email" />}
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "18px" }}
                align="right"
              >
                {<FormattedMessage id="system.fullname" />}
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "18px" }}
                align="right"
              >
                {<FormattedMessage id="system.address" />}
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "18px" }}
                align="right"
              >
                {<FormattedMessage id="system.phonenumber" />}
              </TableCell>
              <TableCell
                style={{ color: "white", fontSize: "18px" }}
                align="right"
              >
                {<FormattedMessage id="system.actions" />}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow key={`uis${index}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.fullName}</TableCell>
                  <TableCell align="right">{item.address}</TableCell>
                  <TableCell align="right">{item.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <ImPencil
                      className="iconEditUser"
                      color="orange"
                      size="18"
                      style={{ marginRight: "16px", padding: "8px" }}
                      onClick={(e) => editUser(e, item.id, item.fullName)}
                    />
                    <ImBin2
                      className="iconRemoveUser"
                      color="red"
                      size="18"
                      style={{ padding: "8px" }}
                      onClick={(e) => removeUser(e, item.id, item.fullName)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="tableResponsive">
        {users.map((item, index) => {
          return (
            <div key={`uis${index}`} className="tableCellRow">
              <div className="tableCellRes">
                <span className="title">
                  {<FormattedMessage id="system.order" />}
                </span>{" "}
                {index + 1}
              </div>
              <div className="tableCellRes">
                <span className="title">
                  {<FormattedMessage id="system.email" />}
                </span>{" "}
                {item.email}
              </div>
              <div className="tableCellRes">
                <span className="title">
                  {<FormattedMessage id="system.fullname" />}
                </span>{" "}
                {item.fullName}
              </div>
              <div className="tableCellRes">
                <span className="title">
                  {<FormattedMessage id="system.address" />}
                </span>{" "}
                {item.address}
              </div>
              <div className="tableCellRes">
                <span className="title">
                  {<FormattedMessage id="system.phonenumber" />}
                </span>{" "}
                {item.phoneNumber}
              </div>
              <div className="tableCellRes">
                <Button
                  onClick={(e) => editUser(e, item.id, item.fullName)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<ImPencil className="icon" color="orange" />}
                  style={{ margin: "8px 2px" }}
                  className="iconEditUser"
                >
                  {<FormattedMessage id="system.edit" />}
                </Button>
                <Button
                  onClick={(e) => removeUser(e, item.id, item.fullName)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<ImBin2 className="icon" color="red" />}
                  style={{ margin: "8px 2px" }}
                  className="iconEditUser"
                >
                  {<FormattedMessage id="system.remove" />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {openDialogRemove ? (
        <DialogMes
          notify={props.notify}
          userSelector={userSelector}
          handleClose={handleClose}
        />
      ) : (
        <></>
      )}
      {openFormEditUser ? (
        <SystemEditUser
          notify={props.notify}
          openForm={openFormEditUser}
          setOpenForm={handleCloseFormEdit}
          user={users.find((e) => e.id == userSelector.id)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TableManageUser;
