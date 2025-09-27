import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewForm = () => {
  const [list, setList] = useState([]);
  const [newData, setNewData] = useState({
    user_name: "",
    title: "",
    content: "",
  });

  const reviewSubmitHandler = async () => {
    await axios.post("http://localhost:8080/add", newData);
    alert("리뷰가 등록되었습니다!");
    setNewData({ user_name: "", title: "", content: "" });

    const { data } = await axios.get("http://localhost:8080/list");
    setList(data);
  };

  useEffect(() => {
    const reviewGet = async () => {
      const { data } = await axios.get("http://localhost:8080/list");
      console.log(data);
      setList(data);
    };
    reviewGet();
  }, []);

  const reviewAddAndChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewData((data) => ({ ...data, [name]: value }));
  };

  const reviewDeleteHandler = async (id) => {
    const { data } = await axios.get(`http://localhost:8080/delete?id=${id}`);
    alert("리뷰가 삭제되었습니다!");
    setList(data);
    console.log(id);
  };

  return (
    <div className="p-6">
      {/* 리뷰가 등록될 공간 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">리뷰</h2>
        {list.map((review, idx) => (
          <div
            key={idx}
            className="relative bg-white p-4 rounded shadow mb-4 border border-gray-200"
          >
            <div className="text-sm text-gray-600">
              작성자 : {review.user_name}
            </div>
            <div className="font-semibold text-gray-900 mt-1">
              제목 : {review.title}
            </div>
            <div className="text-gray-700 mt-2 mb-4">
              내용 : {review.content}
            </div>

            {/* 삭제 버튼 */}
            <button
              className="absolute top-4 right-4 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              onClick={() => reviewDeleteHandler(review.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 리뷰 작성 폼 */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          상품 리뷰 작성하기
        </h3>

        {/* 작성자 입력 */}
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
            onChange={reviewAddAndChangeHandler}
            id="userName"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="이름을 입력해주세요."
          />
        </div>

        {/* 제목 입력 */}
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
            onChange={reviewAddAndChangeHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="리뷰 제목을 입력해주세요."
          />
        </div>

        {/* 리뷰 내용 입력 */}
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
            onChange={reviewAddAndChangeHandler}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="상품에 대한 솔직한 리뷰를 남겨주세요."
          ></textarea>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
            onClick={() =>
              setNewData({ user_name: "", title: "", content: "" })
            }
          >
            취소
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
            onClick={reviewSubmitHandler}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
