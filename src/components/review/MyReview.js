import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyReview = () => {
  const [reviewId, setReviewId] = useState("");
  const [reviewById, setReviewById] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [userReview, setUserReview] = useState("");
  const [doubleCheck, setDoubleCheck] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");

  const navigate = useNavigate();

  const saveReviewInfo = async () => {
    if (selectedRating === 0 || selectedSize === "" || userReview === "") {
      alert("모든 필드를 작성해주세요.");
      return;
    }

    if (doubleCheck !== null) {
      try {
        const param = {
          data: {
            userSeq: userSeq,
            reviewId: reviewId,
            selectedRating: selectedRating,
            selectedSize: selectedSize,
            userReview: userReview,
          },
        };

        const res = await axios.post(
          "http://localhost:8080/review/insert",
          param
        );

        alert("리뷰 등록이 완료되었습니다.");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 중복체크
  const doubleCheckReview = async () => {
    try {
      const checkParam = {
        data: {
          reviewId: reviewId,
          userSeq: userSeq,
        },
      };

      const checkRes = await axios.post(
        "http://localhost:8080/review/checkExistingReview",
        checkParam
      );

      if (checkRes.data.resultData && checkRes.data.resultData.length > 0) {
        alert("이미 작성된 리뷰입니다.");
        navigate("/login/MyPage/review");
        setDoubleCheck(checkRes.data.resultData);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clothId = urlParams.get("cloth_id");
    setReviewId(clothId);
  }, []);

  useEffect(() => {
    getReviewById();
  }, [reviewId]);

  useEffect(() => {
    doubleCheckReview();
  }, [reviewId]);

  const getReviewById = async () => {
    const param = {
      data: {
        userSeq: userSeq,
        reviewId: reviewId,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/review/reviewById",
        param
      );
      setReviewById(res.data.resultData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRating = (value) => {
    setSelectedRating(value);
  };

  const handleSize = (value) => {
    setSelectedSize(value);
  };

  return (
    <div>
      <div className="review-title">리뷰쓰기</div>
      <div className="review-titleContainer">
        {reviewById.length > 0 ? (
          reviewById.map((review) => (
            <div key={review.cloth_id}>
              <div className="review-cloth-image">
                <img
                  className="review-cloth-defaultImage2"
                  src={review.cloth_defaultImage}
                  alt="Cloth Image"
                />
              </div>
              <div className="review-cloth-info2">
                <div className="review-cloth-name2">{review.cloth_name}</div>
                <div className="review-cloth-color2">
                  [수량 : {review.cloth_totalCount}]
                </div>
                <div className="review-cloth-color2">
                  [옵션 : {review.cloth_color}]
                </div>
              </div>
            </div>
          ))
        ) : (
          <div> </div>
        )}
      </div>
      {reviewById.length > 0 && <div className="review-cloth-hrLine"></div>}
      <div className=" review-user">상품은 만족하셨나요?</div>
      <div className="review-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={ratingValue}
              className={`star ${
                ratingValue <= selectedRating ? "filled" : ""
              }`}
              onClick={() => handleRating(ratingValue)}
            >
              ★
            </span>
          );
        })}
      </div>
      <hr />
      <div className=" review-user">사이즈는 어떤가요?</div>
      <div className="review-rating">
        <span
          className={`circle ${selectedSize === "small" ? "selected" : ""}`}
          onClick={() => handleSize("small")}
        ></span>
        <span
          className={`circle ${selectedSize === "medium" ? "selected" : ""}`}
          onClick={() => handleSize("medium")}
        ></span>
        <span
          className={`circle ${selectedSize === "large" ? "selected" : ""}`}
          onClick={() => handleSize("large")}
        ></span>
      </div>
      <div className="review-rating-circle2">
        <span className="review-rating-circle3">작음</span>
        <span className="review-rating-circle3">보통</span>
        <span className="review-rating-circle3">큼</span>
      </div>
      <hr />

      <div className=" review-user">어떤점이 좋았나요?</div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          style={{ margin: "15px auto", width: "98%" }}
          placeholder="최소 20자 이상 작성해주세요."
        ></textarea>
      </div>
      <hr />
      <button
        type="button"
        className="btn btn-dark"
        style={{
          width: "200px",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          fontSize: "17px",
        }}
        onClick={saveReviewInfo}
      >
        등록하기
      </button>
    </div>
  );
};
export default MyReview;
