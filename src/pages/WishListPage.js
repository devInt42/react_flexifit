import "../styles/pages/WishList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const WishListPage = () => {
  const [wishList, setWishList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const userSeq = sessionStorage.getItem("userSeq");

  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = async () => {
    const param = {
      data: {
        userSeq: userSeq,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/getWishList",
        param
      );
      setWishList(res.data.resultData); // 상품 목록을 상태에 설정
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className="wishList-Logo">관심상품</div>
      <div className="product-list">
        <div className="product-container product-header">
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </div>
          <div className="product-imageLogo">이미지</div>

          <div className="product-titleLogo">상품정보</div>

          <div className="product-discountLogo">판매가</div>
        </div>
        {wishList.map((product, index) => (
          <div className="product-container" key={product.cloth_id}>
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
            </div>
            <img
              className="product-image"
              src={product.cloth_defaultImage}
              alt="제품 이미지"
            />
            <div className="product-details">
              <div className="product-title">{product.cloth_name}</div>

              <div className="product-discount">
                할인가: {product.cloth_discount}원
              </div>
            </div>
            <div className="product-actions">
              <button
                className="btn btn-outline-secondary"
                style={{ marginBottom: "5px" }}
              >
                주문하기
              </button>
              <button className="btn btn-outline-dark">삭제하기</button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-success"
        style={{ marginRight: "5px", marginTop: "45px", marginLeft: "12px" }}
      >
        선택상품주문
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "45px" }}
      >
        전체상품주문
      </button>
    </div>
  );
};

export default WishListPage;
