import React, { useEffect, useState } from "react";
import "../styles/pages/QNA.css";
import WriteForm from "../components/QNA/WriteForm";
import { useDispatch, useSelector } from "react-redux";
import { getQnaData } from "../store/action";

const QnaPage = () => {
  const dispatch = useDispatch();
  const qnaList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const [selectedQnaId, setSelectedQnaId] = useState("");

  const handleQnaClick = (qnaId) => {
    setSelectedQnaId((prevId) => {
      if (prevId === qnaId) {
        return null;
      } else {
        return qnaId;
      }
    });
  };

  useEffect(() => {
    dispatch(getQnaData());
  }, [dispatch]);

  return (
    <div className="qna-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span className="qnaLogo">Q&A</span>
          <ul className="qna-list">
            {qnaList.map((qna) => (
              <li key={qna.qna_id} className="qna-item">
                <div className="qna-item-content">
                  <input
                    style={{
                      float: "left",
                      marginRight: "30px",
                      marginTop: "8px",
                    }}
                    type="checkbox"
                    checked={selectedQnaId === qna.qna_id}
                    onChange={() => handleQnaClick(qna.qna_id)}
                  />
                  <div>
                    <span className="qna-item-title">{qna.qna_title}</span>
                    <span className="qna-item-date">
                      작성일: {qna.qna_date}{" "}
                    </span>
                    <span className="qna-item-author">
                      작성자: {qna.user_name}
                    </span>
                  </div>
                </div>
              </li>
            ))}{" "}
            <WriteForm />
          </ul>
        </div>
      )}
    </div>
  );
};

export default QnaPage;
