import { useState, useEffect } from "react";
import "../../styles/pages/ShoppingList.css";
import axios from "axios";

const OrderForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("parcel");
  const [orderPersonName, setOrderPersonName] = useState("");
  const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [totalCount, setTotalCount] = useState();
  const userSeq = sessionStorage.getItem("userSeq");
  //우편검색 api

  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    getShoppingList();
    getShopCount();
  }, []);

  const getShoppingList = async () => {
    const param = {
      data: {
        userSeq: userSeq,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/getShoppingList",
        param
      );
      // cloth_discount 값들을 합산하여 totalPrice 계산
      const totalPrice = res.data.resultData.reduce(
        (accumulator, currentItem) => accumulator + currentItem.cloth_discount,
        0
      );
      setTotalPrice(totalPrice);
    } catch (err) {
      console.error(err);
    }
  };

  //count
  const getShopCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/clothes/shopcount", {
        params: { userSeq: userSeq },
      });
      setTotalCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryTypeChange = (e) => {
    setDeliveryType(e.target.value);
  };

  const handleNameChange = (e) => {
    setOrderPersonName(e.target.value);
  };

  const handleSameAsOrdererChange = () => {
    if (!isSameAsOrderer) {
      setRecipientName(orderPersonName);
    } else {
      setRecipientName("");
    }
    setIsSameAsOrderer(!isSameAsOrderer);
  };

  const handleRecipientChange = (e) => {
    setRecipientName(e.target.value);
  };

  const handlePostalCodeSearch = async () => {
    // try {
    //   const response = await fetch(`API_URL/${postalCode}`); // Replace API_URL with the actual API endpoint for postal code search
    //   const data = await response.json();
    //   setAddress(data.address); // Update the address based on the selected postal code
    // } catch (error) {
    //   console.error("Error fetching postal code data:", error);
    // }
  };

  return (
    <div className="shop-container">
      <div className="shop-Logo">주문서 작성</div>
      <div className="shopping-mini">
        장바구니 &gt; <span style={{ fontWeight: "bolder" }}>주문서작성</span>
        &gt; 주문완료
      </div>
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
      </div>{" "}
      <div className="order-container">
        <div class="my-custom-class">
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
              value={orderPersonName}
              onChange={handleNameChange}
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
      <div className="order-container">
        <div className="order-title">배송지 정보</div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={isSameAsOrderer}
            onChange={handleSameAsOrdererChange}
          ></input>
          <label class="form-check-label" for="flexCheckDefault">
            주문자와 동일
          </label>
        </div>
        <hr />
        <div class="my-custom-class">
          <div class="mb-3" style={{ padding: "5px" }}>
            <label for="exampleFormControlInput1" class="form-label">
              수령인
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              value={recipientName}
              onChange={handleRecipientChange}
            ></input>
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <label for="exampleFormControlInput1" class="form-label">
              연락처1
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
            ></input>
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <label for="exampleFormControlInput1" class="form-label">
              연락처2
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
            ></input>
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <label for="exampleFormControlInput1" class="form-label">
              배송지
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="우편번호"
                style={{ width: "70%" }}
              ></input>
              <button
                onClick={handlePostalCodeSearch}
                style={{ marginLeft: "10px" }}
              >
                우편번호 검색
              </button>
            </div>
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="주소"
            ></input>
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="상세 주소를 입력하세요"
            ></input>{" "}
          </div>
          <div class="mb-3" style={{ padding: "5px" }}>
            <label for="exampleFormControlInput1" class="form-label">
              배송 메모
            </label>
            <select class="form-select" aria-label="Default select example">
              <option selected>배송 메모를 선택해주세요</option>
              <option value="1">배송전에 미리 연락 부탁드립니다.</option>
              <option value="2">부재시 경비실에 맡겨주세요.</option>
              <option value="3">부재시 전화하시거나 문자 남겨주세요.</option>
            </select>
          </div>
        </div>
      </div>
      <div className="order-container">
        <div className="order-title">총 결제금액 </div>

        <div class="mb-3" style={{ padding: "7px" }}>
          <div className="order-recipe-title">
            총 수량
            <span className="order-recipe-content">{totalCount}개</span>
          </div>
          <div className="order-recipe-title">
            총 상품 금액{" "}
            <span className="order-recipe-content">{totalPrice}원</span>
          </div>
          <div className="order-recipe-title">
            배송비 <span className="order-recipe-content">3000원</span>
          </div>
          <div className="order-recipe-title2">
            최종 결제 금액
            <span className="order-recipe-content">{totalPrice + 3000}원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
