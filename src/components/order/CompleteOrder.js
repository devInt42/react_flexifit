import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompleteOrder = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="shop-container">
      <div className="shop-Logo">주문 완료</div>
      <div className="shopping-mini">
        장바구니 &gt; 주문서작성 &gt;{" "}
        <span style={{ fontWeight: "bolder" }}>주문완료</span>
      </div>

      <div className="payment-container">
        <div className="payment-title">주문이 완료되었습니다.</div>
        <button className="payment-button" onClick={handleContinueShopping}>
          쇼핑 계속하기
        </button>
      </div>
    </div>
  );
};

export default CompleteOrder;
