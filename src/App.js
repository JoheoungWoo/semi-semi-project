// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartComponent from "./components/CartComponent";
import products from "./data/products"; // 네가 갖고 있던 배열

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/">상품</Link>
        <Link to="/cart">장바구니</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<CartComponent />} />
      </Routes>
    </BrowserRouter>
  );
}
