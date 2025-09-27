// router/root.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListPage from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import ProductList from "../components/ProductList";
import products from "../dummydata/products";
import MainPage from "../pages/MainPage";

const root = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
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
  {
    path: "product/list",
    element: <ProductList products={products} />,
  },
]);

export default root;
