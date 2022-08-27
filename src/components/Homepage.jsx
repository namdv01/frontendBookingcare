import React from "react";
import DoctorSection from "../components/DoctorSection";
import HandbookSlider from "../components/HandbookSlider";
import HealthFacilities from "../components/HealthFacilities";
import SearchSection from "../components/SearchSection";
import Specialist from "../components/Specialist";
import AdvertiseSection from "../components/AdvertiseSection";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <SearchSection />
      <Specialist />
      <HealthFacilities />
      <DoctorSection />
      <HandbookSlider />
      <AdvertiseSection />
    </>
  );
};

export default Homepage;
