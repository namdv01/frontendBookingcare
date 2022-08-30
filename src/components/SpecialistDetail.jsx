import React from "react";
import { useParams } from "react-router-dom";

const SpecialistDetail = () => {
  const params = useParams();

  return <div>SpecialistDetail idSpecialty = {params.idSpecialty}</div>;
};

export default SpecialistDetail;
