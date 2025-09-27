// src/api/cartApi.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // ✅ JSESSIONID 쿠키 자동 포함
});

export const fetchCart = async () => (await api.get("/cart")).data;
export const addToCart = async (productId, deltaQty = 1) =>
  (await api.post("/cart/items", null, { params: { productId, deltaQty } })).data;
export const removeItem = async (productId) =>
  (await api.delete(`/cart/items/${productId}`)).data;
export const clearCart = async () => {
  await api.delete("/cart");     // 굳이 .data 안 써도 OK
};
