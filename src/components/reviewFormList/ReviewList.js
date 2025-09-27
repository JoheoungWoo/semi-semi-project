import React from "react";

const ReviewList = ({
  list,
  editingId,
  editData,
  onReviewUpdateStart,
  reviewUpdateChangeHandler,
  reviewCancelEditHandler,
  reviewUpdate,
  reviewDeleteHandler,
}) => {
  return (
    <>
      {list.map((review) => (
        <div
          key={review.id}
          className="relative bg-white p-4 rounded shadow mb-4 border border-gray-200"
        >
          {editingId === review.id ? (
            // 수정폼 UI
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
            // 일반 리뷰 표시 UI
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
                  onClick={() => onReviewUpdateStart(review)}
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
    </>
  );
};

export default ReviewList;
