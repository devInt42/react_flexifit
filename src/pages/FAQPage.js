import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFAQData } from "../store/action";

const FAQPage = () => {
  const dispatch = useDispatch();
  const faqList = useSelector((state) => state.faqData);

  useEffect(() => {
    dispatch(getFAQData());
  }, [dispatch]);

  return (
    <div className="qna-page">
      {faqList.map((faq) => (
        <div key={faq.faq_id} className="qna-item">
          <div className="qna-item-content">
            <div>
              <span className="qna-item-title">{faq.faq_title}</span>
              <span className="qna-item-author">작성자:</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
