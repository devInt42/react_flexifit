import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPage = ({ category }) => {
  useEffect(() => {
    getData();
  }, [category]);

  const getData = async () => {
    const param = {
      data: { category: category },
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/clothes/${category}`,
        param
      );
      console.log(res.data.resultData);
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
};

export default ListPage;
