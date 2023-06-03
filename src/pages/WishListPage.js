import "../styles/pages/WishList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const WishListPage = () => {
  const [wishList, setWishList] = useState([]);
  const userSeq = sessionStorage.getItem("userSeq");
  const navigate = useNavigate();

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
      setWishList(res.data.resultData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWishList = async (clothId) => {
    const param = {
      data: {
        clothId: clothId,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/clothes/deleteWishList",
        param
      );
      alert("삭제 되었습니다");
      getWishList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="wishList-Logo">관심상품</div>
      <div className="product-list">
        <div className="product-container product-header">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox2" />
          </div>
          <div className="product-imageLogo">이미지</div>

          <div className="product-titleLogo">상품정보</div>

          <div className="product-discountLogo">판매가</div>
        </div>
        {wishList.map((product) => (
          <div className="product-container2" key={product.cloth_id}>
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
            </div>
            <img
              className="product-image"
              src={product.cloth_defaultImage}
              alt="제품 이미지"
            />
            <div className="product-details">
              <div className="product-title2">{product.cloth_name}</div>

              <div className="product-discount2">
                할인가: {product.cloth_discount}원
              </div>
            </div>
            <div className="product-actions">
              <Link
                to={`/product?clothId=${product.cloth_id}`}
                className="btn btn-outline-secondary"
                style={{ marginBottom: "5px" }}
              >
                주문하기
              </Link>
              <button
                className="btn btn-outline-dark"
                onClick={() => deleteWishList(product.cloth_id)}
              >
                삭제하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
