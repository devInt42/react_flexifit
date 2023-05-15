import Header from "../components/header/header";
import "../styles/pages/Header.css";
import ListPage from "../components/main/ListPage";
import { useState } from "react";
import { useEffect } from "react";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("티셔츠");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="header-container">
        <Header handleCategorySelect={handleCategorySelect} />
        <ListPage category={selectedCategory} />
      </div>
    </div>
  );
};

export default MainPage;
