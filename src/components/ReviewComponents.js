import React from "react";

const ReviewForm = () => {
  return (
    <div className="p-6">
      {/* 리뷰가 등록될 공간 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">리뷰</h2>
        <div className="bg-gray-100 p-4 rounded-lg text-gray-500 text-center">
          {/* 여기에 등록된 리뷰가 표시됩니다. */}
          등록된 리뷰가 없습니다.
        </div>
      </div>

      {/* 리뷰 작성 폼 */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          상품 리뷰 작성하기
        </h3>

        {/* 리뷰 내용 입력창 */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="reviewContent"
          >
            리뷰 내용
          </label>
          <textarea
            id="reviewContent"
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="상품에 대한 솔직한 리뷰를 남겨주세요."
          ></textarea>
        </div>

        {/* 제출 및 취소 버튼 */}
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300">
            취소
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
