import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({
  totalPrice,
  recipientName,
  recipientPhone1,
  detailAddress,
  address,
  postcode,
}) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const navigate = useNavigate();

  const onClickPayment = () => {
    const { IMP } = window;
    const merchantKey = "imp88784171"; // 가맹점 식별키(Merchant Key)로 대체해야 함
    IMP.init(merchantKey);

    const requiredValues = [
      totalPrice,
      recipientName,
      recipientPhone1,
      address,
      detailAddress,
      postcode,
    ];

    const hasEmptyValue = requiredValues.some((value) => value === "");

    if (hasEmptyValue) {
      alert("필수값을 모두 입력해주세요");
      return;
    }

    const data = {
      pg: "html5_inicis", // 결제할 PG사
      pay_method: "card", // 결제 수단
      merchant_uid: "merchant_" + new Date().getTime(), // 주문번호
      name: "플렉시핏 결제", // 주문명
      amount: totalPrice, // 결제 금액 - totalPrice 변수로 변경
      buyer_name: recipientName, // 구매자 이름 - recipientName 변수로 변경
      buyer_tel: recipientPhone1, // 구매자 전화번호 - recipientPhone1 변수로 변경
      buyer_addr: address + " " + detailAddress, // 구매자 주소 - address와 detailAddress 변수를 조합
      buyer_postcode: postcode, // 구매자 우편번호 - postcode 변수로 변경
      m_redirect_url: "/product/shoppingList/completeOrder", // 결제 완료 후 리디렉션할 URL
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
      navigate("/product/shoppingList/completeOrder");
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-dark"
        style={{ width: "100%", marginTop: "13px", height: "60px" }}
        onClick={onClickPayment}
      >
        결제하기
      </button>
    </div>
  );
};

export default Payment;
