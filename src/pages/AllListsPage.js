import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/Tshirt.css";

const AllListPage = ({ selectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(selectCategory);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  const getData = async () => {
    if (selectedCategory) {
      try {
        const res = await axios.post(
          `http://localhost:8080/clothes/getProductInfo`,
          { data: {} }
        );
        setData(res.data.resultData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="header-container">
      <p>
        <h3 style={{ marginTop: "50px", color: "black", fontWeight: "bolder" }}>
          전체상품
        </h3>
      </p>
      <div className="product-container">
        {data.map((item) => {
          const imagePath = process.env.PUBLIC_URL + "/images/shirt1.png";
          //   console.log(imagePath);

          return (
            <div className="product-item" key={item.cloth_id}>
              <div className="product-image">
                <img src={imagePath} alt="Product Image" />
              </div>
              <div className="product-details">
                <div className="product-size">{item.cloth_size}</div>
                <div className="product-title">{item.cloth_name}</div>
                <div className="product-description">
                  {item.cloth_description}
                </div>
                <div className="product-price">
                  <span className="original-price">₩{item.cloth_price}원</span>
                </div>
                {item.cloth_discount && (
                  <span className="discounted-price">
                    ₩{item.cloth_discount}원
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllListPage;
