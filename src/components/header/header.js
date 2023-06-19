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
  const isLoggedIn = sessionStorage.getItem("userSeq");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userSeq");
    navigate("/");
    alert("로그아웃 되었습니다.");
  };

  //팝오버
  const handlePopoverToggle = () => {
    if (isLoggedIn) {
      setPopoverVisible((prevVisible) => !prevVisible);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
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
        <div style={{ fontSize: "1.5rem" }}>
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
        </div>
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
          <span
            style={{ paddingRight: "15px" }}
            onMouseEnter={handlePopoverToggle}
            onMouseLeave={handlePopoverToggle}
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-container="body"
              onClick={handlePopoverToggle}
              style={{
                borderColor: "transparent",
                backgroundColor: "transparent",
              }}
            >
              <AiOutlineUser style={{ fontSize: "25px", color: "black" }} />
            </button>

            {popoverVisible && isLoggedIn && (
              <div
                className="popover"
                style={{
                  position: "absolute",
                  color: "white",
                }}
              >
                <span className="menu-item">
                  <span className="menu-email">{userId}</span>
                  <br />
                  <span className="gray-line">
                    <Link
                      to="/login/MyPage/review"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      나의 리뷰
                    </Link>
                  </span>
                  <br />
                  <span className="gray-line">
                    <Link
                      to="/login/MyPage"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      개인정보
                    </Link>
                  </span>
                  <br />
                  <span className="menu-logout" onClick={handleLogout}>
                    로그아웃
                  </span>
                </span>
              </div>
            )}
          </span>
          <span style={{ paddingRight: "25px" }}>
            <Link to="/product/wishList">
              <CgHeart style={{ fontSize: "25px", color: "black" }} />
            </Link>
          </span>

          <span style={{ paddingRight: "25px" }}>
            <Link to="/product/shoppingList">
              <AiOutlineShopping style={{ fontSize: "25px", color: "black" }} />
            </Link>
          </span>
        </span>
        <hr className="hr-line" />
      </div>
    </div>
  );
};

export default Header;
