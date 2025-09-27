import React, { useEffect, useState } from "react";
import {
  reviewAdd,
  reviewDelete,
  reviewList,
  updateReview,
} from "./reviewAPI/reviewApi";

const ReviewForm = () => {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null); //수정하려는 리뷰의 id를 저장하려는 상태
  const [newData, setNewData] = useState({
    user_name: "",
    title: "",
    content: "",
  }); //리뷰 등록용
  const [editData, setEditData] = useState({
    user_name: "",
    title: "",
    content: "",
  }); //리뷰 수정용

  //리뷰 list 받아오기
  useEffect(() => {
    const reviewGet = async () => {
      const data = await reviewList();
      setList(data);
    };
    reviewGet();
  }, []);

  //리뷰 등록 요청
  const reviewSubmitHandler = async () => {
    await reviewAdd(newData);
    alert("리뷰가 등록 되었습니다");
    setNewData({ user_name: "", title: "", content: "" });
    const data = await reviewList();
    setList(data);
  };

  //리뷰 등록 폼 핸들러
  const reviewAddHandler = (e) => {
    const { name, value } = e.target;
    setNewData((data) => ({ ...data, [name]: value }));
  };

  //리뷰 수정 완료 요청
  const reviewUpdate = async () => {
    if (editingId !== null) {
      await updateReview(editingId, editData);
      alert("리뷰가 수정 되었습니다");
      setEditingId(null);
      setEditData({ user_name: "", title: "", content: "" });
    }
    const data = await reviewList();
    setList(data);
  };

  //리뷰 수정 폼
  const reviewUpdateChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditData((data) => ({ ...data, [name]: value }));
  };

  //리뷰 수정 핸들러
  const reviewUpdateHandler = (review) => {
    setEditData({
      user_name: review.user_name,
      title: review.title,
      content: review.content,
    });
    setEditingId(review.id);
  };

  //리뷰 취소 핸들러
  const reviewCancelEditHandler = () => {
    setEditingId(null);
    setEditData({ user_name: "", title: "", content: "" });
  };

  //리뷰 삭제
  const reviewDeleteHandler = async (id) => {
    const data = await reviewDelete(id);
    alert("리뷰가 삭제 되었습니다");
    setList(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">리뷰</h2>

      {list.map((review) => (
        <div
          key={review.id}
          className="relative bg-white p-4 rounded shadow mb-4 border border-gray-200"
        >
          {editingId === review.id ? (
            // 수정폼
            <>
              <div className="mb-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  작성자
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={editData.user_name}
                  onChange={reviewUpdateChangeHandler}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={reviewUpdateChangeHandler}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  내용
                </label>
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={reviewUpdateChangeHandler}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex space-x-2 justify-end">
                <button
                  onClick={reviewCancelEditHandler}
                  className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  onClick={reviewUpdate}
                  className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  수정 완료
                </button>
              </div>
            </>
          ) : (
            // 일반 리뷰 표시
            <>
              <div className="text-sm text-gray-600 mb-1">
                작성자 : {review.user_name}
              </div>
              <div className="font-semibold text-gray-900 mb-1">
                제목 : {review.title}
              </div>
              <div className="text-gray-700 mb-4">내용 : {review.content}</div>

              <div className="absolute top-4 right-20">
                <button
                  onClick={() => reviewUpdateHandler(review)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  수정
                </button>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => reviewDeleteHandler(review.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* 리뷰 등록 폼 */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {editingId === null ? "상품 리뷰 작성하기" : "리뷰 수정하기"}
        </h3>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-semibold mb-2"
          >
            작성자
          </label>
          <input
            type="text"
            name="user_name"
            value={newData.user_name}
            onChange={reviewAddHandler}
            id="userName"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="이름을 입력해주세요."
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="reviewTitle"
            className="block text-gray-700 font-semibold mb-2"
          >
            제목
          </label>
          <input
            type="text"
            id="reviewTitle"
            name="title"
            value={newData.title}
            onChange={reviewAddHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="리뷰 제목을 입력해주세요."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="reviewContent"
            className="block text-gray-700 font-semibold mb-2"
          >
            리뷰 내용
          </label>
          <textarea
            id="reviewContent"
            rows="5"
            name="content"
            value={newData.content}
            onChange={reviewAddHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="상품에 대한 솔직한 리뷰를 남겨주세요."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
            onClick={reviewCancelEditHandler}
          >
            {editingId === null ? "취소" : "수정 취소"}
          </button>

          {editingId === null ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
              onClick={reviewSubmitHandler}
            >
              등록
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
              onClick={reviewUpdate}
            >
              수정 완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
