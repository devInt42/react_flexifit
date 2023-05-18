import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import FAQ from "./pages/FAQPage";
import QNA from "./pages/QNAPage";
import Tshirt from "./pages/TshirtListPage";
import AllList from "./pages/AllListsPage";
import Outer from "./pages/OuterListPage";
import Pants from "./pages/PantsListPage";
import SweatShirt from "./pages/SweatShirtListPage";
import Header from "./components/header/header";
import "./styles/pages/Header.css";
import { useState } from "react";
import Footer from "./components/footer/footer.js";

function App() {
  const [selectCategory, setSelectCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectCategory(category);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="header-container">
          <Header handleCategorySelect={handleCategorySelect} />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/qna" element={<QNA />} />
            <Route
              path="/tshirt"
              element={<Tshirt selectCategory={selectCategory} />}
            />
            <Route
              path="/sweatshirt"
              element={<SweatShirt selectCategory={selectCategory} />}
            />
            <Route
              path="/outer"
              element={<Outer />}
              selectCategory={selectCategory}
            />
            <Route
              path="/pants"
              element={<Pants selectCategory={selectCategory} />}
            />
            <Route
              path="/all"
              element={<AllList selectCategory={selectCategory} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
