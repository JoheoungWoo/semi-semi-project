import React from "react";
import { addToCart } from "../api/cartApi";

export default function ProductList({ products }) {
  const handleAdd = async (id) => {
    try {
      await addToCart(id, 1);
      // 필요하면 토스트/배지 업데이트. 장바구니 페이지에선 자동 새로고침 필요 없음.
      alert("장바구니에 담았습니다!");
    } catch (e) {
      alert(e?.response?.data || e.message);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "24px auto", padding: 16 }}>
      <h2>상품 목록</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <img src={p.imageUrl} alt={p.name}
                 style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }} />
            <div style={{ marginTop: 8, fontWeight: 600 }}>{p.name}</div>
            <div>{Number(p.price).toLocaleString()}원</div>
            <button style={{ marginTop: 8, width: "100%" }} onClick={() => handleAdd(p.id)}>
              담기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
