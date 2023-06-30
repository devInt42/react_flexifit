import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/Review.css";

const AllReviewPage = () => {
  const [reviewCount, setReviewCount] = useState("");
  const [reviewList, setReviewList] = useState();

  //star개수
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= rating; i++) {
      stars.push(
        <span key={i} className="star-filled">
          ★
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    getCount();
    getAllReview();
  }, [reviewCount]);

  const getCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/review/count");
      setReviewCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //전체 리뷰
  const getAllReview = async () => {
    try {
      const res = await axios.get("http://localhost:8080/review/allReview");
      setReviewList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="allReview-container2">
      <div className="allReview-title" style={{ marginBottom: "30px" }}>
        전체리뷰{" "}
        <span style={{ fontSize: "25px", color: "gray" }}>({reviewCount})</span>
      </div>

      <div className="allreview-container">
        {reviewList && reviewList.length > 0 ? (
          reviewList.map((item) => (
            <div key={item.review_seq} className="allreview-item">
              <img className="allreview-image" src={item.cloth_defaultImage} />
              <div className="allreview-stars">
                {renderStars(item.review_star)}
              </div>
              <div className="allreview-text">{item.review_text}</div>
              <div className="allreview-name">작성자: {item.user_name}</div>
            </div>
          ))
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default AllReviewPage;
