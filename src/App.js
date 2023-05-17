import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import FAQ from "./pages/FAQPage";
import QNA from "./pages/QNAPage";
import TshirtPage from "./pages/TshirtPage";
import Header from "./components/header/header";
import "./styles/pages/Header.css";
import { useState } from "react";

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
              element={<TshirtPage selectCategory={selectCategory} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
