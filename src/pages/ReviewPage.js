import { useEffect, useState } from "react";
import "../styles/pages/Review.css";
import axios from "axios";

const ReviewPage = () => {
  const userSeq = sessionStorage.getItem("userSeq");
  const [myReview, setMyReview] = useState("");

  useEffect(() => {
    getUserReview();
  }, []);

  const getUserReview = async () => {
    const param = {
      data: {
        userSeq: userSeq,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/review/listByUser",
        param
      );
      setMyReview(res.data.resultData);
      console.log(res.data.resultData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="review-container">
      <div className="review-Logo">내 정보</div>
      <div className="review-title">주문 상품 정보 </div>

      <div className="review-list">
        <div className="review-date">주문일자</div>
        <div className="review-image">이미지</div>
        <div className="review-info">상품정보</div>
        <div className="review-count">수량</div>
        <div className="review-price">상품구매금액</div>
        <div className="review-status">주문처리상태</div>
      </div>
      {myReview.length > 0 ? (
        myReview.map((review) => (
          <div key={review.cloth_id}>
            <div>{review.cloth_date}</div>
            <img src={review.cloth_defaultImage} alt="Cloth Image" />
            <div>{review.cloth_name}</div>
            <div>{review.cloth_totalCount}</div>
            <div>{review.cloth_color}</div>
            <div>{review.cloth_discount}</div>
            <div>배송완료 </div>
          </div>
        ))
      ) : (
        <div>작성 가능한 리뷰가 없습니다.</div>
      )}
    </div>
  );
};
export default ReviewPage;
