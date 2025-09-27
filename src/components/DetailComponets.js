import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../dummydata/products.js";
import Header from "../mainpage/Header";
import NavBar from "../mainpage/NavBar";
import Footer from "../mainpage/Footer";
import ReviewComponents from "../components/ReviewComponents";
import QandAComponents from "../components/QandAComponents";
import { addToCart } from "../api/cartApi.js";


const DetailComponets = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const [qty, setQty] = useState(1);


  const product = products.find((p) => p.id === Number(id));

  // 상품 옵션 더미 데이터
  const productOptions = {
    colors: ["black", "white", "navy"],
    sizes: ["S", "M", "L", "XL"],
  };

  const handleAdd = async (id, qty) => {
  try {
    await addToCart(id, qty);
    alert("장바구니에 담았습니다!");
  } catch (e) {
    alert("담기 실패: " + (e.response?.data || e.message));
  }
};

  return (
    <>
      <Header />
      <NavBar />
      <div className="container mx-auto px-4 py-8 mt-32">
        {/* 제품 상세 정보 섹션 */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="w-full lg:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          {/* 제품 정보 및 버튼 */}
          <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-900 mb-4"></p>

            {/* 상품 옵션 선택 영역 */}
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              {/* 색상 선택 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  색상 선택
                </h3>
                <div className="flex gap-2">
                  {productOptions.colors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                        selectedColor === color
                          ? "border-gray-900"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    ></div>
                  ))}
                </div>
              </div>

              {/* 사이즈 선택 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  사이즈 선택
                </h3>
                <div className="flex gap-2">
                  {productOptions.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* 수량 */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">수량</h3>
                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 border rounded-md text-gray-600"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-6 text-center">{qty}</span>
                  <button
                    className="w-8 h-8 border rounded-md text-gray-600"
                    onClick={() => setQty((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* 총 금액 */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-700">
                총 상품 금액
              </span>
              <span className="text-3xl font-extrabold text-gray-900"></span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
              className="w-full sm:w-1/2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={() => handleAdd(product.id, qty)}  // ✅ 화살표 함수로 감싸야 함
              >
              장바구니 담기
              </button>
              <button className="w-full sm:w-1/2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition duration-300">
                구매하기
              </button>
            </div>
          </div>
        </div>
        {/* 리뷰 & QnA */}
        <ReviewComponents />
        <QandAComponents />
      </div>
      <Footer />
    </>
  );
};

export default DetailComponets;
