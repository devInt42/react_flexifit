import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllReview = () => {
  const [reviewCount, setReviewCount] = useState("");
  const [reviewList, setReviewList] = useState();

  //star
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

  const getAllReview = async () => {
    try {
      const res = await axios.get("http://localhost:8080/review/getAllReview");
      setReviewList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="allreview-container">
      <div className="allReview-title">
        리뷰{" "}
        <span style={{ fontSize: "25px", color: "gray" }}>({reviewCount})</span>
        <span
          style={{
            float: "right",
            fontSize: "15px",
            color: "gray",
            marginTop: "10px",
            fontWeight: "lighter",
          }}
        >
          <Link
            to="/allReview"
            style={{ textDecoration: "none", color: "gray" }}
          >
            전체보기
          </Link>
        </span>
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
export default AllReview;
