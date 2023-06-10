import "../styles/pages/ShoppingList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const ShoppingListPage = (props) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [clothId, setClothId] = useState();

  const userSeq = sessionStorage.getItem("userSeq");

  useEffect(() => {
    setClothId(props);
  }, [props]);

  useEffect(() => {
    getShoppingList();
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
      setShoppingList(res.data.resultData);
      console.log(res.data.resultData);
    } catch (err) {
      console.error(err);
    }
  };

  // const deleteWishList = async (clothId) => {
  //   const param = {
  //     data: {
  //       clothId: clothId,
  //     },
  //   };
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8080/clothes/deleteWishList",
  //       param
  //     );
  //     alert("삭제 되었습니다");
  //     getWishList();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <div className="shopping-Logo">관심상품</div>

      <div>
        {Array.from(shoppingList.values()).map((item) => (
          <div key={item.shoppingcart_seq}>
            <div className="shop-frontImage">
              <img src={item.custom_frontImageUrl} />
            </div>
            <div className="shop-BackImage">
              <img src={item.custom_backImageUrl} />
            </div>
            <div className="shop-title">{item.cloth_name}</div>
            <div className="shop-size">{item.cloth_size}</div>
            <div className="shop-count">{item.cloth_totalCount}</div>
            <div className="shop-color">{item.cloth_color}</div>
            <div className="shop-btn"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingListPage;
