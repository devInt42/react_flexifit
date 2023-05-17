import React, { useState, useEffect } from "react";
import axios from "axios";

const TshirtPage = ({ selectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(selectCategory);

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  const getData = async () => {
    if (selectedCategory) {
      const param = {
        data: { category: selectedCategory },
      };
      try {
        const res = await axios.post(
          `http://localhost:8080/clothes/${selectedCategory}`,
          param
        );
        console.log(res.data.resultData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return <div>TshirtPage</div>;
};

export default TshirtPage;
