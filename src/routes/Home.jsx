import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [offsetHeight, setOffsetHeight] = useState(0);
  useEffect(() => {
    setOffsetHeight(marginHeader());
  }, []);

  const marginHeader = () => {
    return document.querySelector(".headerContainer").offsetHeight;
  };

  return (
    <div className="homeContainer" style={{ marginTop: `${offsetHeight}px` }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
