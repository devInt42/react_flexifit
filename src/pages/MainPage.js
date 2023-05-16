import Header from "../components/header/header";
import "../styles/pages/Header.css";
import ListPage from "../components/main/ListPage";
import { useState } from "react";
import Banner from "../components/banner/banner";
import "../styles/pages/Main.css";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("shirts");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="header-container">
        <Header handleCategorySelect={handleCategorySelect} />
      </div>
      <p />
      <ListPage category={selectedCategory} />
      <Banner />
      <div className="mainNotice">개별 주문, 단체 주문 모두 가능해요!</div>
    </div>
  );
};

export default MainPage;
