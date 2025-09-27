import React, { useEffect, useState, useMemo } from "react";
import { fetchCart, addToCart, removeItem, clearCart } from "../api/cartApi";

export default function CartComponent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchCart(); // ✅ 항상 서버에서 최신 장바구니 받아오기
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const inc = async (pid) => {
    const data = await addToCart(pid, 1);
    setItems(data); // ✅ 서버가 준 최신 상태 반영
  };

  const dec = async (pid) => {
    const data = await addToCart(pid, -1);
    setItems(data);
  };

  const del = async (pid) => {
    await removeItem(pid);
    await load();
  };

  const wipe = async () => {
    await clearCart();
    setItems([]);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  if (loading) return <p style={{ padding: 16 }}>불러오는 중…</p>;

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", padding: 16 }}>
      <h2>장바구니</h2>
      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {items.map((i) => (
              <li key={i.productId}
                  style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: 12, border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                <img src={i.imageUrl} alt={i.name}
                     style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{i.name}</div>
                  <div style={{ color: "#666" }}>{i.price.toLocaleString()}원</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                    <button onClick={() => dec(i.productId)}>-</button>
                    <span>{i.qty}</span>
                    <button onClick={() => inc(i.productId)}>+</button>
                    <button onClick={() => del(i.productId)} style={{ marginLeft: 8, color: "#b00" }}>삭제</button>
                  </div>
                </div>
                <div style={{ textAlign: "right", fontWeight: 700 }}>
                  {(i.qty * i.price).toLocaleString()}원
                </div>
              </li>
            ))}
          </ul>
          <hr style={{ margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={wipe}>전체 비우기</button>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              합계: {subtotal.toLocaleString()}원
            </div>
          </div>
        </>
      )}
    </div>
  );
}
