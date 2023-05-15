import React, { useEffect } from "react";
import "../../Fonts/Font.css";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        paddingRight: "30px",
        paddingTop: "10px",
        textDecoration: "none",
        color: "black",
      }}
    >
      {children}
    </Link>
  );
};

const Header = ({ handleCategorySelect }) => {
  const [selectCategory, setSelectCategory] = useState("shirts");

  const handleSelectCategory = (category) => {
    setSelectCategory(category);
    handleCategorySelect(category); // MainPage의 handleCategorySelect 호출
  };

  return (
    <div>
      <div className="header-right">
        <NavigationLink to="/signup">회원가입</NavigationLink>
        <NavigationLink to="/login">로그인</NavigationLink>
        <NavigationLink to="/faqPage">FAQ</NavigationLink>
        <NavigationLink to="/qnaPage">QNA</NavigationLink>
      </div>
      <div className="header-top">
        <h1
          style={{
            fontFamily: "Ubuntu Bold",
            float: "left",
            marginRight: "80px",
          }}
        >
          <Link
            to="/"
            style={{
              paddingRight: "30px",
              paddingTop: "10px",
              textDecoration: "none",
              color: "black",
            }}
          >
            F L E X I F I T
          </Link>
        </h1>
        <span
          style={{ paddingRight: "50px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("shirts")}
        >
          티셔츠
        </span>
        <span
          style={{ paddingRight: "50px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("맨투맨/후드/집업")}
        >
          맨투맨/후드/집업
        </span>
        <span
          style={{ paddingRight: "50px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("outer")}
        >
          아우터{" "}
        </span>
        <span
          style={{ paddingRight: "50px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("pants")}
        >
          바지{" "}
        </span>
        <span
          style={{ paddingRight: "0px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("all")}
        >
          전체상품{" "}
        </span>
        <span style={{ float: "right" }}>
          <span style={{ paddingRight: "25px" }}>
            <AiOutlineUser style={{ fontSize: "25px" }} />
          </span>
          <span style={{ paddingRight: "25px" }}>
            <CgHeart style={{ fontSize: "25px" }} />
          </span>
          <AiOutlineShopping style={{ fontSize: "25px" }} />
        </span>
      </div>
      <p />

      <hr className="hr-line" />
    </div>
  );
};

export default Header;
