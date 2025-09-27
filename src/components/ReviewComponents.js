import React, { useEffect, useState } from "react";
import ReviewList from "./reviewFormList/ReviewList";
import ReviewForm from "./reviewFormList/ReviewForm";
import {
  reviewAdd,
  reviewDelete,
  reviewList,
  updateReview,
} from "../api/reviewApi";

const ReviewComponents = () => {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [newData, setNewData] = useState({
    user_name: "",
    title: "",
    content: "",
  });

  const [editData, setEditData] = useState({
    user_name: "",
    title: "",
    content: "",
  });

  // 리뷰 리스트 불러오기
  useEffect(() => {
    async function fetchReviews() {
      const data = await reviewList();
      setList(data);
    }
    fetchReviews();
  }, []);

  // 리뷰 등록 폼 변경 핸들러
  const reviewAddHandler = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  // 리뷰 등록
  const reviewSubmitHandler = async () => {
    await reviewAdd(newData);
    alert("리뷰 등록 완료");
    setNewData({ user_name: "", title: "", content: "" });
    const data = await reviewList();
    setList(data);
  };

  // 수정 시작 (수정 폼 열기)
  const onReviewUpdateStart = (review) => {
    setEditData({
      user_name: review.user_name,
      title: review.title,
      content: review.content,
    });
    setEditingId(review.id);
  };

  // 수정 폼 변경 핸들러
  const reviewUpdateChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 완료
  const reviewUpdate = async () => {
    if (editingId !== null) {
      await updateReview(editingId, editData);
      alert("리뷰 수정 완료");
      setEditingId(null);
      setEditData({ user_name: "", title: "", content: "" });
      const data = await reviewList();
      setList(data);
    }
  };

  // 수정 취소
  const reviewCancelEditHandler = () => {
    setEditingId(null);
    setEditData({ user_name: "", title: "", content: "" });
  };

  // 리뷰 삭제
  const reviewDeleteHandler = async (id) => {
    const data = await reviewDelete(id);
    alert("리뷰 삭제 완료");
    setList(data);
  };

  return (
    <div>
      <ReviewList
        list={list}
        editingId={editingId}
        editData={editData}
        onReviewUpdateStart={onReviewUpdateStart}
        reviewUpdateChangeHandler={reviewUpdateChangeHandler}
        reviewCancelEditHandler={reviewCancelEditHandler}
        reviewUpdate={reviewUpdate}
        reviewDeleteHandler={reviewDeleteHandler}
      />

      <ReviewForm
        newData={newData}
        reviewAddHandler={reviewAddHandler}
        reviewSubmitHandler={reviewSubmitHandler}
        editingId={editingId}
        reviewCancelEditHandler={reviewCancelEditHandler}
        reviewUpdate={reviewUpdate}
      />
    </div>
  );
};

export default ReviewComponents;
