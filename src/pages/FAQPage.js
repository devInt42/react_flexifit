import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQnaData } from "../store/action";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FQAPage = () => {
  const dispatch = useDispatch();
  const faqList = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getTotalCount();
  }, []);

  const getTotalCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/faq/count");
      setTotalCount(res.data);
    } catch (err) {
      console.log(err);
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
            {faqList.map((faq) => (
              <li key={faq.faq_id} className="qna-item">
                <div className="qna-item-content">
                  <div>
                    <span className="qna-item-title">{faq.qna_title}</span>
                    <span className="qna-item-date">
                      작성일: {faq.faq_date}
                    </span>
                    <span className="qna-item-author">
                      작성자: {faq.admin_name}
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
    </div>
  );
};

export default FQAPage;
