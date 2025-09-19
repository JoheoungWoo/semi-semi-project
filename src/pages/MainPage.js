import React from "react";
import Header from "../mainpage/Header";
import NavBar from "../mainpage/NavBar";
import Footer from "../mainpage/Footer";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavBar />

      {/* 메인페이지 헤더&네비와 푸터가 붙어있어 임시로 빈 공간으로 채워둠*/}
      <main className="flex-grow">{/* 여기에 페이지 내용이 들어갑니다 */}</main>
      <Footer />
    </div>
  );
};

export default MainPage;
