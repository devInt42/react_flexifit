import React, { useState } from "react";

const SortingOptions = () => {
  const [option, setOption] = useState("");

  const handleSortChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <select className="form-select" onChange={handleSortChange}>
      <option value="1">인기순</option>
      <option value="1">낮은가격순</option>
      <option value="2">높은가격순</option>
    </select>
  );
};

export default SortingOptions;
