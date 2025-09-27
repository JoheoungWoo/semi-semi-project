// router/root.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "../mainpage/Header";
import Footer from "../mainpage/Footer";
import MainLayout from "../mainpage/MainLayout";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import ProductList from "../components/ProductList";

const { Outlet } = require("react-router-dom");
const h = React.createElement;

function RootLayout() {
  return h(
    "div",
    { className: "min-h-screen flex flex-col bg-white text-black" },
    h(Header, { className: "relative z-20" }),
    h("div", { className: "flex-1 relative z-0 isolate" }, h(Outlet)),
    h(Footer, { className: "relative z-10" })
  );
}

const root = createBrowserRouter([
  {
    path: "/",
    element: h(RootLayout),
    children: [
      { index: true, element: h(MainLayout) },
      { path: "list", element: h(ListPage) },
      { path: "product/:id", element: h(DetailPage) },
      { path: "cart/:id", element: h(CartPage) },
    ],
  },
  {
    path: "list",
    element: <ListPage />,
  },
  {
    path: "product/:id",
    element: <DetailPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  // {
  //   path: "product/list",
  //   element: <ProductList />,
  // },
]);

export default root;

