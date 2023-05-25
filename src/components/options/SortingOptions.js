import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../store/action";

const SortingOptions = () => {
  const selectCategory = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(selectCategory);
  const [option, setOption] = useState("1");
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    getOption();
  }, [option]);

  const getOption = async () => {
    if (option) {
      const param = {
        data: { option: option, category: selectedCategory },
      };
      try {
        const res = await axios.post(
          `http://localhost:8080/clothes/sort`,
          param
        );
        dispatch(setData(res.data.resultData));
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
