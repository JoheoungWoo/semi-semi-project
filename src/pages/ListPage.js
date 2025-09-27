import React from "react";
import ListComponets from "../components/ListComponets";
import NavBar from "../mainpage/NavBar";
import Header from "../mainpage/Header";
import Footer from "../mainpage/Footer";

const ListPage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <ListComponets />
      <Footer />
    </div>
  );
};

export default ListPage;
