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
    <div className="review-titleContainer">
      <div className="review-container">
        <div className="review-Logo">내 정보</div>
        <div className="review-title">주문 상품 정보 </div>

        <div className="review-list">
          <div className="review-date">주문일자</div>
          <div className="review-image">이미지</div>
          <div className="review-info">상품정보/수량</div>

          <div className="review-price">상품구매금액</div>
          <div className="review-status">주문처리상태</div>
        </div>
        {myReview.length > 0 ? (
          myReview.map((review) => (
            <div key={review.cloth_id} className="review-item">
              <div className="review-cloth-date">{review.cloth_date}</div>
              <div className="review-cloth-image">
                <img
                  className="review-cloth-defaultImage"
                  src={review.cloth_defaultImage}
                  alt="Cloth Image"
                />
              </div>
              <div className="review-cloth-info">
                <div className="review-cloth-name">
                  {review.cloth_name} / {review.cloth_totalCount}
                </div>
                <div className="review-cloth-color">
                  [옵션 : {review.cloth_color}]
                </div>
              </div>
              <div className="review-cloth-discount">
                {review.cloth_discount}원
              </div>
              <div className="review-cloth-deliver">
                배송완료
                <div className="review-cloth-button">
                  <button
                    type="button"
                    class="btn btn-dark small-button"
                    style={{ marginTop: "10px", width: "75px" }}
                  >
                    구매후기
                  </button>
                </div>
              </div>
              <div className="border-line" />
            </div>
          ))
        ) : (
          <div>작성 가능한 리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default ReviewPage;
