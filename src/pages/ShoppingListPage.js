import "../styles/pages/ShoppingList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Payment from "../components/payment/Payment";

const ShoppingListPage = (props) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [clothIds, setClothIds] = useState(); //구매하기 누를시 이동
  const [totalPrice, setTotalPrice] = useState();
  const [totalCount, setTotalCount] = useState();
  const userSeq = sessionStorage.getItem("userSeq");

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
      const shoppingList = res.data.resultData;
      setShoppingList(shoppingList);

      let totalPrice = 0;
      shoppingList.forEach((item) => {
        const subtotal = item.cloth_totalCount * item.cloth_discount;
        totalPrice += subtotal;
      });
      setTotalPrice(totalPrice);

      const clothIds = shoppingList.map((item) => item.cloth_id);
      setClothIds(clothIds);
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

  const removeShoppingList = async (clothId) => {
    console.log(clothId);
    const param = {
      data: {
        clothId: clothId,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/deleteShoppingList",
        param
      );
      alert("삭제되었습니다.");
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  return Array.from(shoppingList.values()).length === 0 ? (
    <div className="shopping-container">
      <div className="empty-shoppingList">
        <div className="empty-shopContent">
          <div className="empty-shopIcon">
            <BsHandbagFill size={"60px"} style={{ marginBottom: "10px" }} />
          </div>
          <div className="empty-shopTitle">비어있는 장바구니를 채워주세요!</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="shopping-container">
      <div className="shopping-Logo">장바구니</div>
      <div className="shopping-mini">
        <span style={{ fontWeight: "bolder" }}>장바구니</span> &gt; 주문서작성
        &gt; 주문완료
      </div>
      <div className="shopping-list">
        <div className="shopping-info">상품정보</div>
        <div className="shopping-size">사이즈/수량</div>
        <div className="shopping-price">가격</div>
        <div className="shopping-edit">편집</div>
      </div>
      <div>
        {Array.from(shoppingList.values()).map((item) => (
          <div key={item.shoppingcart_seq}>
            <div className="shopping-date">
              {item.cloth_date}
              <span style={{ fontSize: "15px", padding: "5px" }}>|</span> No.
              {item.cloth_id}
            </div>
            <div className="shop-frontImage">
              <img className="shop-image" src={item.custom_frontImageUrl} />
            </div>

            <div className="shop-BackImage">
              <img className="shop-image" src={item.custom_backImageUrl} />
            </div>

            <div className="shop-title">{item.cloth_name}</div>
            <div className="shop-size">
              {item.cloth_size} <span style={{ padding: "10px" }}>/</span>{" "}
              {item.cloth_totalCount}
            </div>

            <div className="shop-price">{item.cloth_discount}원</div>
            <div className="shop-btn">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => removeShoppingList(item.cloth_id)}
              >
                삭제하기
              </button>
            </div>
            <hr className="real-hr" />
          </div>
        ))}
      </div>
      <div className="shopping-totallist">
        <div className="shopping-info">총 수량</div>
        <div className="shopping-size">가격</div>
        <div className="shopping-price">배송비</div>
        <div className="shopping-edit">합계</div>
      </div>
      <div className="shop-total">{totalCount}개</div>
      <div className="shop-total">{totalPrice}원</div>
      <div className="shop-total2">3000원</div>{" "}
      <div
        className="shop-total"
        style={{ fontSize: "20px", fontWeight: "bolder" }}
      >
        {3000 + totalPrice}원
      </div>
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
      >
        <Link
          to="/product/shoppingList/checkout"
          style={{ textDecoration: "none", color: "white" }}
        >
          주문서 작성
        </Link>
      </button>
    </div>
  );
};

export default ShoppingListPage;
