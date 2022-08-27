import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API } from "../utils/constant";
import { beginAuthState } from "../redux/thunk";
import SystemHeader from "../components/SystemHeader";

const System = () => {
  const auth = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");

  const navigateLogin = () => {
    navigate("../login");
  };

  useEffect(() => {
    const getOwnUser = async () => {
      const u = await axios
        .get(`${BACKEND_API}/user/getOwner`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          return { name: data.user.fullName, role: data.user.roleId };
        })
        .then(({ name, role }) => {
          setRole(role);
        });
    };
    if (auth.isLogin) {
      getOwnUser();
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/system" && role == "R1")
      navigate("user-manage");
    else if (location.pathname === "/system" && role == "R2")
      navigate("schedule-manage");
  }, [role]);

  useEffect(() => {
    if (!auth.isLogin) {
      navigateLogin();
    }
  }, [auth]);

  return (
    <div className="system">
      <SystemHeader />
      <Outlet />
    </div>
  );
};

export default System;
