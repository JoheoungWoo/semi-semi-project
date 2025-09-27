import React from "react";
import CartComponent from "../components/CartComponent";
import Header from "../mainpage/Header";
import NavBar from "../mainpage/NavBar";

const CartPage = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <CartComponent />
    </div>
  );
};

export default CartPage;
