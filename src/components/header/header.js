import React from "react";
import "../../Fonts/Font.css";

function Header() {
  return (
    <div>
      <div className="header-right">
        <span
          style={{
            paddingRight: "30px",
            paddingTop: "10px",
            fontWeight: "bold",
          }}
        >
          회원가입
        </span>
        <span style={{ paddingRight: "30px", paddingTop: "10px" }}>로그인</span>
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
          F L E X I F I T
        </h1>
        <span style={{ paddingRight: "50px", fontSize: "20PX" }}>티셔츠</span>
        <span style={{ paddingRight: "50px", fontSize: "20PX" }}>
          맨투맨/후드/집업
        </span>
        <span style={{ paddingRight: "50px", fontSize: "20PX" }}>아우터 </span>
        <span style={{ paddingRight: "50px", fontSize: "20PX" }}>바지 </span>
        <span style={{ paddingRight: "0px", fontSize: "20PX" }}>전체상품 </span>
      </div>
      <p />
      <hr className="hr-line" />
    </div>
  );
}

export default Header;
