import React from "react";

const ReviewForm = ({
  newData,
  reviewAddHandler,
  reviewSubmitHandler,
  editingId,
  reviewCancelEditHandler,
  reviewUpdate,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        {editingId === null ? "리뷰 작성하기" : "리뷰 수정하기"}
      </h3>

      <div className="mb-4">
        <input
          type="text"
          name="user_name"
          value={newData.user_name}
          onChange={reviewAddHandler}
          placeholder="작성자"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={newData.title}
          onChange={reviewAddHandler}
          placeholder="제목"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="mb-6">
        <textarea
          name="content"
          value={newData.content}
          onChange={reviewAddHandler}
          placeholder="내용"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          rows={5}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={reviewCancelEditHandler}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-md transition duration-300"
        >
          {editingId === null ? "취소" : "수정 취소"}
        </button>

        {editingId === null ? (
          <button
            onClick={reviewSubmitHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            등록
          </button>
        ) : (
          <button
            onClick={reviewUpdate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            수정 완료
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
