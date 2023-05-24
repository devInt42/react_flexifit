import React, { useState } from "react";
import "../styles/pages/QNA.css";
import UpdateForm from "../components/QNA/UpdateForm";
import DeleteForm from "../components/QNA/DeleteForm";
import WriteForm from "../components/QNA/WriteForm";

const QnaPage = () => {
  const qnaList = [
    {
      id: 1,
      title: "제목이다11111111111",
      date: "2023-05-24",
      author: "user1",
    },
    { id: 2, title: "질문 2", date: "2023-05-25", author: "user2" },
    // ...더 많은 질문들
  ];

  const [selectedQna, setSelectedQna] = useState(null);

  const handleQnaSelect = (qnaId) => {
    setSelectedQna((prevSelectedQna) =>
      prevSelectedQna === qnaId ? null : qnaId
    );
  };

  return (
    <div className="qna-page">
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Q&A</h2>
      <ul className="qna-list">
        {qnaList.map((qna) => (
          <li key={qna.id} className="qna-item">
            <div className="qna-item-content">
              <input
                style={{ float: "left", marginRight: "30px", marginTop: "5px" }}
                type="checkbox"
                checked={selectedQna === qna.id}
                onChange={() => handleQnaSelect(qna.id)}
              />
              <div>
                <h3 className="qna-item-title">{qna.title}</h3>

                <span className="qna-item-date">작성일: {qna.date}</span>
                <span className="qna-item-author">작성자: {qna.author}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <WriteForm />
      <UpdateForm qnaId={selectedQna} />
      <DeleteForm qnaId={selectedQna} />
    </div>
  );
};

export default QnaPage;
