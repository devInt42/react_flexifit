import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/Tshirt.css";

const PantsListPage = ({ selectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(selectCategory);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  useEffect(() => {
    getCount();
  }, [count]);

  //count
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

  //data
  const getData = async () => {
    if (selectedCategory) {
      const param = {
        data: { category: selectedCategory },
      };
      try {
        const res = await axios.post(
          `http://localhost:8080/clothes/getProductInfo`,
          param
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
        <h3 className="title-text">
          바지 <span className="count-text">({count})</span>
        </h3>
      </p>
      <div className="product-container">
        {data.map((item) => {
          const imagePath = process.env.PUBLIC_URL + "/images/shirt1.png";
          // console.log(imagePath);

          return (
            <div className="product-item" key={item.cloth_id}>
              <div className="product-image">
                <img src={imagePath} alt="pants Image" />
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

export default PantsListPage;
