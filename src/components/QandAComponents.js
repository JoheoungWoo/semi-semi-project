import axios from "axios";
import React, { useEffect, useState } from "react";

const QnAForm = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    user_name: "",
    title: "",
    content: "",
  });

  // QnA 등록
  const addHandler = async () => {
    if (!form.user_name || !form.title || !form.content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    await axios.post("http://localhost:8080/add", form);
    alert("QnA가 등록되었습니다!");

    setForm({ user_name: "", title: "", content: "" });
    const { data } = await axios.get("http://localhost:8080/list");
    setList(data);
  };

  // QnA 불러오기
  useEffect(() => {
    const fetchList = async () => {
      const { data } = await axios.get("http://localhost:8080/list");
      setList(data);
    };
    fetchList();
  }, []);

  // 입력 변경
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 삭제
  const deleteHandler = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const { data } = await axios.get(`http://localhost:8080/delete?id=${id}`);
    setList(data);
  };

  return (
    <div className="p-6">
      {/* QnA 리스트 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Q&A 목록</h2>
        {list.map((qna) => (
          <div
            key={qna.id}
            className="relative bg-gray-50 p-4 rounded-md border mb-3"
          >
            <p className="text-sm text-gray-600">작성자: {qna.user_name}</p>
            <p className="font-semibold">제목: {qna.title}</p>
            <p className="mt-1 text-gray-700 whitespace-pre-line">
              {qna.content}
            </p>
            <button
              className="absolute top-4 right-4 bg-red-400 text-white px-2 py-1 rounded text-sm hover:bg-red-500"
              onClick={() => deleteHandler(qna.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* QnA 작성 폼 */}
      <div className="bg-white border rounded-md p-6 shadow">
        <h3 className="text-lg font-bold mb-4">질문 작성하기</h3>

        <input
          type="text"
          name="user_name"
          value={form.user_name}
          onChange={changeHandler}
          placeholder="작성자"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={changeHandler}
          placeholder="제목"
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={changeHandler}
          placeholder="내용"
          rows="4"
          className="w-full border p-2 rounded mb-3"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setForm({ user_name: "", title: "", content: "" })}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={addHandler}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default QandAComponents;

