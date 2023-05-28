import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/Tshirt.css";
import Option from "../components/options/SortingOptions";
import { useSelector } from "react-redux";

const TshirtPage = () => {
  const data = useSelector((state) => state.data);
  const selectCategory = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(selectCategory);
  const [count, setCount] = useState();

  useEffect(() => {
    getCount();
  }, [count]);

  const getCount = async (category) => {
    try {
      const res = await axios.get("http://localhost:8080/clothes/count", {
        params: { category: selectedCategory },
      });
      setCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="header-container">
      <p>
        <h3 className="title-text">
          티셔츠 <span className="count-text">({count})</span>
          <span className="option">
            <Option />
          </span>
        </h3>
      </p>
      <div className="product-container">
        {data.map((item) => {
          const imagePath = process.env.PUBLIC_URL + "/images/shirt1.png";

          return (
            <div className="product-item" key={item.cloth_id}>
              <div className="product-image">
                <img src={imagePath} alt="T-Shirt Image" />
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

export default TshirtPage;
