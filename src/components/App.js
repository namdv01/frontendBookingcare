import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "../routes/ForgotPassword";
import Home from "../routes/Home";
import Login from "../routes/Login";
import NotFound from "../routes/NotFound";
import System from "../routes/System";
import "../scss/root.scss";
import { useSelector, useDispatch } from "react-redux";
import { IntlProvider } from "react-intl";
import en from "../utils/translation/en.json";
import vi from "../utils/translation/vi.json";
import { useEffect, useState } from "react";
import { BEGIN_LANGUAGE } from "../redux/constants";
import UserManageSys from "./UserManageSys";
import SystemManageDoctor from "./SystemManageDoctor";
import DoctorDetail from "./DoctorDetail";
import Homepage from "./Homepage";
import ScheduleManage from "./ScheduleManage";
import ManageSpecialist from "./ManageSpecialist";
import SpecialistDetail from "./SpecialistDetail";
import ClinicDetail from "./ClinicDetail";
import ScrollSpecialist from "./ScrollSpecialist";
import ScrollClinic from "./ScrollClinic";
import ScrollDoctor from "./ScrollDoctor";
import Fixxing from "./Fixxing";

function App() {
  const translate = useSelector((state) => state.translateReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: BEGIN_LANGUAGE });
  }, []);

  return (
    <IntlProvider locale={translate.language} messages={translate.messages}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Homepage />} />
              <Route path="doctor/:idDoctor" element={<DoctorDetail />} />
              {/*  */}
              <Route path="specialty/:idSpecialty" element={<Fixxing />} />
              <Route path="clinic/:idClinic" element={<Fixxing />} />
              {/*  */}
              <Route path="specialist" element={<ScrollSpecialist />} />
              <Route path="doctor" element={<ScrollDoctor />} />
              <Route path="health_facilities" element={<ScrollClinic />} />
              <Route path="examination_service" element={<Fixxing />} />
              <Route path="handbook" element={<Fixxing />} />
            </Route>
            <Route path="system" element={<System />}>
              <Route path="user-manage" element={<UserManageSys />} />
              <Route path="doctor-manage" element={<SystemManageDoctor />} />
              <Route path="patient-manage" element={<UserManageSys />} />
              <Route path="admin-manage" element={<UserManageSys />} />
              <Route path="schedule-manage" element={<ScheduleManage />} />
              <Route path="clinic" element={<div>trang phòng khám</div>} />
              <Route path="specialist" element={<ManageSpecialist />} />
              <Route path="*" element={<NotFound />} />
              <Route path="handbook" element={<div>trang cẩm nang</div>} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </IntlProvider>
  );
}

export default App;
