import "../styles/pages/WishList.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const WishListPage = () => {
  const [wishList, setWishList] = useState([]);
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
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="wishList-Logo">관심상품</div>
    </div>
  );
};

export default WishListPage;
