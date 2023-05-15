import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPage = ({ category }) => {
  useEffect(() => {
    getData();
    console.log(category);
  }, [category]);

  //받아오는 부분 여기
  const getData = async () => {
    const param = {
      data: { category: category },
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/clothes/${category}`,
        param
      );
      console.log("Success");
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
};

export default ListPage;
