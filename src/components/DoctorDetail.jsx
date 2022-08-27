import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API } from "../utils/constant";
import "../scss/doctorDetail.scss";
import DetailScheduleTime from "./DetailScheduleTime";
import DoctorInfoEle from "./DoctorInfoEle";

const DoctorDetail = () => {
  const params = useParams();
  const [doctorDetail, setDoctorDetail] = useState({});

  useEffect(() => {
    const callDoctorDetail = async () => {
      try {
        const result = await axios
          .get(`${BACKEND_API}/doctor/doctorDetail/${params.idDoctor}`)
          .then((res) => res.data);
        if (result.success) {
          setDoctorDetail({ ...result.doctor });
        }
      } catch (error) {
        console.log(error);
      }
    };
    callDoctorDetail();
  }, []);

  return (
    <div className="doctorDetailContainer">
      <div className="title">
        <div className="img">
          <img src={doctorDetail.image} alt="" />
        </div>
        <div className="name">
          <h3>
            {doctorDetail.positionData?.valueVi
              ? doctorDetail.positionData.valueVi + " "
              : "Bác sĩ "}
            {doctorDetail.fullName}
          </h3>
          <p>{doctorDetail.idData?.description}</p>
        </div>
      </div>
      <div className="schedule">
        <DetailScheduleTime idDoctor={params.idDoctor} />
        <DoctorInfoEle />
      </div>
      <div
        className="desc"
        dangerouslySetInnerHTML={{ __html: doctorDetail.idData?.contentHTML }}
      ></div>
    </div>
  );
};

export default DoctorDetail;
