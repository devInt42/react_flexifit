import React, { useEffect, useState } from "react";
import "../styles/pages/QNA.css";
import { useDispatch, useSelector } from "react-redux";
import { getQnaData } from "../store/action";
import axios from "axios";
import { Link } from "react-router-dom";

const QnaPage = () => {
  const dispatch = useDispatch();
  const qnaList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const [selectedQnaId, setSelectedQnaId] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    getTotalCount();
  }, [totalCount]);

  //QNA count
  const getTotalCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/qna/count");
      setTotalCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQnaClick = (qnaId) => {
    setSelectedQnaId((prevId) => {
      if (prevId === qnaId) {
        return null;
      } else {
        return qnaId;
      }
    });
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getQnaData(page, itemsPerPage));
  }, [dispatch, page]);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalCount; i++) {
      buttons.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <a className="page-link" href="#" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
    return buttons;
  };

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
            ))}
          </ul>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageClick(page - 1)}
                >
                  Previous
                </a>
              </li>
              {renderPageButtons()}
              <li
                className={`page-item ${page === totalCount ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageClick(page + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div></div>
        </div>
      )}
      <Link to="/qna/write" className="button write-button">
        글쓰기
      </Link>
    </div>
  );
};

export default QnaPage;
