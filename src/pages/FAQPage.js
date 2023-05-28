import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/pages/FAQ.css";
import { getFAQData } from "../store/action";

const FAQPage = () => {
  const dispatch = useDispatch();
  const faqList = useSelector((state) => state.faqData);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(getFAQData());
  }, [dispatch]);

  const handleTitleClick = (title, content) => {
    if (selectedTitle === title) {
      setSelectedTitle("");
      setSelectedContent("");
    } else {
      setSelectedTitle(title);
      setSelectedContent(content);
    }
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
                    selectedTitle === faq.faq_title ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleTitleClick(faq.faq_title, faq.faq_content)
                  }
                >
                  {faq.faq_title}
                </div>
                {selectedTitle === faq.faq_title && (
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
