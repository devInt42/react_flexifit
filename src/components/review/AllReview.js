import { useState, useEffect } from "react";
import axios from "axios";

const AllReview = () => {
  const [reviewCount, setReviewCount] = useState("");
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getCount();
  }, [reviewCount]);

  const getCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/review/count");
      setReviewCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="allReview-title">
        리뷰{" "}
        <span style={{ fontSize: "25px", color: "gray" }}>({reviewCount})</span>
      </div>
      <div className="review-titleContainer"></div>
    </div>
  );
};
export default AllReview;
