import React from "react";
import { useParams } from "react-router-dom";

const ClinicDetail = () => {
  const params = useParams();

  return <div>ClinicDetail {params.idClinic}</div>;
};

export default ClinicDetail;
