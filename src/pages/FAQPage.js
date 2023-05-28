import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/pages/FAQ.css";
import { getFAQData } from "../store/action";
import axios from "axios";

const FAQPage = () => {
  const dispatch = useDispatch();
  const faqList = useSelector((state) => state.faqData);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqContent, setFaqContent] = useState("");
  const [selectedId, setSelectedId] = useState(""); //faqId
  const isLoading = useSelector((state) => state.isLoading);
  const userSeq = sessionStorage.getItem("userSeq");

  useEffect(() => {
    dispatch(getFAQData());
  }, [dispatch, faqTitle, faqContent, selectedTitle, selectedContent]);

  const handleTitleClick = (id, title, content) => {
    if (userSeq === "0") {
      setSelectedId(id);
      setSelectedTitle(title);
      setSelectedContent(content);
      setFaqTitle(title);
      setFaqContent(content);
    }
    if (selectedTitle === title) {
      setSelectedTitle("");
      setSelectedContent("");
    } else {
      setSelectedTitle(title);
      setSelectedContent(content);
    }
  };

  //관리자일때

  const handleEdit = async () => {
    const param = {
      data: {
        faqTitle: faqTitle,
        faqContent: faqContent,
        selectedId: selectedId,
      },
    };
    try {
      const res = await axios.post(`http://localhost:8080/faq/update`, param);
      alert("수정이 완료되었습니다.");
      setSelectedTitle(faqTitle); // 수정된 제목으로 업데이트
      setSelectedContent(faqContent);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    //삭제
  };

  return (
    <div className="faq-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span className="faqLogo">FAQ</span>
          <span className="faqminiLogo">주문 / 결제</span>
          <hr />
          {faqList &&
            faqList.map((faq) => (
              <div key={faq.faq_id}>
                <div
                  className={`faq-title ${
                    selectedId === faq.faq_id ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleTitleClick(faq.faq_id, faq.faq_title, faq.faq_content)
                  }
                >
                  <span className="plus-button">+</span>
                  {faq.faq_title}
                </div>
                {selectedId === faq.faq_id && userSeq === "0" && (
                  <div className="faq-content">
                    <input
                      type="text"
                      className="faq-input"
                      value={faqTitle}
                      onChange={(e) => setFaqTitle(e.target.value)}
                    />
                    <textarea
                      className="faq-textarea"
                      value={faqContent}
                      onChange={(e) => setFaqContent(e.target.value)}
                    />
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleEdit}
                        style={{ marginRight: "5px" }}
                      >
                        편집
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleDelete(faq.faq_id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
                {selectedId !== faq.faq_id && (
                  <div className="faq-content">{faq.faq_content}</div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FAQPage;
