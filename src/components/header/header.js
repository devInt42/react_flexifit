import "../../Fonts/Font.css";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../store/action";

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

const Header = () => {
  const navigate = useNavigate();
  const selectCategory = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const isLoggedIn = sessionStorage.getItem("userId");

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div>
      <div className="header-right">
        {isLoggedIn ? (
          <Link
            to="/"
            onClick={handleLogout}
            style={{
              paddingRight: "30px",
              paddingTop: "10px",
              textDecoration: "none",
              color: "black",
            }}
          >
            로그아웃
          </Link>
        ) : (
          <>
            <NavigationLink to="/signup">회원가입</NavigationLink>
            <NavigationLink to="/login">로그인</NavigationLink>
          </>
        )}
        <NavigationLink to="/faq">FAQ</NavigationLink>
        <NavigationLink to="/qna">QNA</NavigationLink>
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
              textDecoration: "none",
              color: "black",
              fontSize: "35px",
            }}
          >
            F L E X I F I T
          </Link>
        </h1>
        <span
          className={`header-category ${
            selectCategory === "shirts" ? "selected" : ""
          }`}
          onClick={() => handleSelectCategory("shirts")}
        >
          <Link
            to="/Tshirt"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            티셔츠
          </Link>
        </span>
        <span
          className={`header-category ${
            selectCategory === "Sweatshirt" ? "selected" : ""
          }`}
          onClick={() => handleSelectCategory("Sweatshirt")}
        >
          <Link
            to="/sweatshirt"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            맨투맨/후드/집업
          </Link>
        </span>
        <span
          className={`header-category ${
            selectCategory === "outer" ? "selected" : ""
          }`}
          onClick={() => handleSelectCategory("outer")}
        >
          <Link
            to="/outer"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            아우터
          </Link>
        </span>
        <span
          className={`header-category ${
            selectCategory === "pants" ? "selected" : ""
          }`}
          onClick={() => handleSelectCategory("pants")}
        >
          <Link
            to="/pants"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            바지
          </Link>
        </span>
        <span
          className={`header-category ${
            selectCategory === "all" ? "selected" : ""
          }`}
          style={{ paddingRight: "0px", fontSize: "17PX" }}
          onClick={() => handleSelectCategory("all")}
        >
          <Link
            to="/all"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            전체상품
          </Link>
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
        <hr className="hr-line" />
      </div>
    </div>
  );
};

export default Header;
