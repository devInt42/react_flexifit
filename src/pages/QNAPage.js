import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQnaData } from "../store/action";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const QnaPage = () => {
  const dispatch = useDispatch();
  const qnaList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const navigate = useNavigate();
  const userSeq = sessionStorage.getItem("userSeq");

  useEffect(() => {
    getTotalCount();
  }, []);

  const getTotalCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/qna/count");
      setTotalCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleClick = async (qnaId, qnaPassword) => {
    //관리자는 비밀글 여부x
    if (qnaPassword === "" || userSeq === "0") {
      navigate(`/qna/board?qnaId=${qnaId}`);
    } else {
      navigate(`/qna/private?qnaId=${qnaId}`);
    }
  };

  useEffect(() => {
    dispatch(getQnaData(page, itemsPerPage));
  }, [dispatch, page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

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
                  <div>
                    <span
                      className="qna-item-title"
                      onClick={() =>
                        handleTitleClick(qna.qna_id, qna.qna_password)
                      }
                    >
                      {qna.qna_title}
                    </span>
                    <span className="qna-item-date">
                      작성일: {qna.qna_date}
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
        </div>
      )}
      <Link to="/qna/write" className="button write-button">
        글쓰기
      </Link>
    </div>
  );
};

export default QnaPage;
