import { useState, useEffect } from "react";
import "../../styles/pages/ShoppingList.css";

const OrderForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("parcel");

  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userId"));
  }, []);

  const handleDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
  };

  return (
    <div className="shop-container">
      <div className="shop-Logo">주문서 작성</div>
      <div className="order-container">
        <div className="order-content">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              <div className="order-title">제작 요청사항</div>
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="상품 제작 요청사항이 있으면 작성해주세요."
            ></textarea>
            <div className="order-miniContent">
              디자인에 따라 가능 여부가 달라지며 추가 비용이 발생합니다.
            </div>
          </div>
        </div>
      </div>
      <div className="order-container">
        <div className="order-title" style={{ marginBottom: "20px" }}>
          주문자 정보
        </div>
        <div class="mb-3" style={{ padding: "5px" }}>
          <label for="exampleFormControlInput1" class="form-label">
            이름
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
          ></input>
        </div>
        <div class="mb-3" style={{ padding: "5px" }}>
          <label for="exampleFormControlInput1" class="form-label">
            연락처
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="- 없이 01000000000 "
          ></input>
        </div>
        <div class="mb-3" style={{ padding: "5px" }}>
          <label for="exampleFormControlInput1" class="form-label">
            이메일
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            value={userEmail}
          ></input>
          <div className="order-miniContent">
            위 이메일로 주문 내역 메일이 전송됩니다.
          </div>
          <div className="order-miniContent">
            이메일 변경은 마이페이지 &gt; 개인정보에서 수정 가능합니다.
          </div>
        </div>
      </div>
      <div className="order-container">
        <div className="order-title" style={{ marginBottom: "20px" }}>
          배송 정보 안내
        </div>
        <div
          className="form-check"
          style={{ width: "15%", float: "left", marginRight: "10px" }}
        >
          <input
            className="form-check-input"
            type="radio"
            name="deliveryType"
            id="deliveryType1"
            value="parcel"
            checked={deliveryType === "parcel"}
            onChange={handleDeliveryTypeChange}
          />
          <label
            className="form-check-label"
            htmlFor="deliveryType1"
            style={{ fontWeight: "bolder" }}
          >
            택배배송
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="deliveryType"
            id="deliveryType2"
            value="quick"
            checked={deliveryType === "quick"}
            onChange={handleDeliveryTypeChange}
          />
          <label
            className="form-check-label"
            htmlFor="deliveryType2"
            style={{ fontWeight: "bolder" }}
          >
            퀵배송
          </label>
        </div>
        <div style={{ clear: "both" }}></div>
        {deliveryType === "parcel" && (
          <div className="parcel-delivery-info">
            <div> 택배배송안내</div>
            <div
              className="parcel-delivery-title"
              style={{ marginTop: "10px" }}
            >
              배송지역
              <span className="parcel-delivery-content">
                CJ대한통운 / 전국지역
              </span>
            </div>
            <div className="parcel-delivery-title">
              택배상담
              <span className="parcel-delivery-content">
                1588-1255 (평일 9AM-6PM / 토요일 9AM~ 1PM)
              </span>
            </div>
            <div className="parcel-delivery-title">
              배송비용{" "}
              <span className="parcel-delivery-content">주문건당 3,000원</span>
            </div>
            <div className="parcel-delivery-title">
              배송기간{" "}
              <span className="parcel-delivery-content">
                택배사로 상품 출고 후 영업일 기준 1~2일 이내 수령 (단, 지역 및
                배송사 상황에 따라 달라질 수 있음)
              </span>
            </div>
            <hr />
            <div className="parcel-delivery-info2">
              - 주문 제작 상품의 특성상 기본 무지 상품의 재고 현황보다 주문
              수량이 초과될 시 출고가 늦어질 수 있습니다.
            </div>
            <div className="parcel-delivery-info2">
              - 제품은 100% 주문 제작으로 만들어지며, 출고 이후에도 택배사의
              사정에 따라 변수가 생길 수 있습니다.
            </div>
            <div className="parcel-delivery-info2">
              - 주문 전 1:1 상담 / 전화 상담 등을 통해 제작 일정을 확인하신 후
              주문하시면 친절하게 안내해드립니다.
            </div>
            <div className="parcel-delivery-info2">
              - 대량 단체주문건의 경우에는 주문 및 결제 완료 후 영업일 기준으로
              약 7~10일 가량 소요될 수 있습니다.
            </div>
          </div>
        )}

        {deliveryType === "quick" && (
          <div className="parcel-delivery-info">
            <div> 퀵 배송안내</div>
            <div
              className="parcel-delivery-title"
              style={{ marginTop: "10px" }}
            >
              출발위치
              <span className="parcel-delivery-content">
                서울시 금천구 가산동
              </span>
            </div>
            <div className="parcel-delivery-title">
              배송비용
              <span className="parcel-delivery-content">
                구간요금은 30 - 120분 처리 기준이며 지역, 시간, 부피 등에 따라
                추가 할증이 붙을 수 있습니다.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
