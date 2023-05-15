import React from "react";
import "../../Fonts/Font.css";
import { AiOutlineUser } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { AiOutlineShopping } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header-right">
        <Link
          to="/signup"
          style={{
            paddingRight: "30px",
            paddingTop: "10px",
            fontWeight: "bold",
            textDecoration: "none",
            color: "black",
          }}
        >
          회원가입
        </Link>

        <Link
          to="/login"
          style={{
            paddingRight: "30px",
            paddingTop: "10px",

            textDecoration: "none",
            color: "black",
          }}
        >
          로그인
        </Link>

        <span style={{ paddingRight: "30px", paddingTop: "10px" }}>FAQ</span>
        <span style={{ paddingTop: "10px" }}>QNA</span>
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
        <span style={{ paddingRight: "50px", fontSize: "17PX" }}>티셔츠</span>
        <span style={{ paddingRight: "50px", fontSize: "17PX" }}>
          맨투맨/후드/집업
        </span>
        <span style={{ paddingRight: "50px", fontSize: "17PX" }}>아우터 </span>
        <span style={{ paddingRight: "50px", fontSize: "17PX" }}>바지 </span>
        <span style={{ paddingRight: "0px", fontSize: "17PX" }}>전체상품 </span>
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
}

export default Header;
