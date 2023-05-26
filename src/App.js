import React, { useState } from "react";
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
import Footer from "./components/footer/footer.js";
import MyPage from "./pages/MyPage";
import WriteForm from "./components/QNA/WriteForm";
import SecretForm from "./components/QNA/SecretForm";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/MyPage" element={<MyPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/qna" element={<QNA />} />
            <Route path="/qna/write" element={<WriteForm />} />
            <Route path="/qna/private" element={<SecretForm />} />
            <Route path="/tshirt" element={<Tshirt />} />
            <Route path="/sweatshirt" element={<SweatShirt />} />
            <Route path="/outer" element={<Outer />} />
            <Route path="/pants" element={<Pants />} />
            <Route path="/all" element={<AllList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
