import React, { useEffect, useState } from "react";
import axios from "axios";

const SortingOptions = () => {
  const [option, setOption] = useState("");

  const handleSortChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    getOption();
  }, [option]);

  const getOption = async () => {
    if (option) {
      try {
        const res = await axios.get(
          `http://localhost:8080/clothes/option/${option}`,
          {
            params: { option: option },
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <select className="form-select" onChange={handleSortChange}>
      <option value="1">인기순</option>
      <option value="2">낮은가격순</option>
      <option value="3">높은가격순</option>
    </select>
  );
};

export default SortingOptions;
