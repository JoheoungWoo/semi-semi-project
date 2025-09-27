import React from "react";
import DetailComponets from "../components/DetailComponets";
import NavBar from "../mainpage/NavBar";
import Header from "../mainpage/Header";
import Footer from "../mainpage/Footer";

const DetailPage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <DetailComponets />
      <Footer />
    </div>
  );
};

export default DetailPage;
