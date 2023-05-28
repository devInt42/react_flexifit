import React, { useState } from "react";
import { useSelector } from "react-redux";

const FAQPage = () => {
  const faqList = useSelector((state) => state.faqData);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");

  const handleTitleClick = (title, content) => {
    if (title === selectedTitle) {
      setSelectedTitle("");
      setQnaContent("");
    } else {
      setSelectedTitle(title);
      setQnaContent(content);
    }
  };

  return (
    <div>
      {faqList.map((faq) => (
        <div key={faq.faq_id}>
          <div
            className="faq-title"
            style={{
              fontWeight: selectedTitle === faq.faq_title ? "bold" : "normal",
            }}
            onClick={() => handleTitleClick(faq.faq_title, faq.faq_content)}
          >
            {faq.faq_title}
            <span className="faq-author">작성자: {faq.user_name}</span>
          </div>
          {selectedTitle === faq.faq_title && (
            <div className="faq-content">{qnaContent}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
