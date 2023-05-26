import React, { useState } from "react";
import { Link } from "react-router-dom";

const SecretForm = ({ qnaId }) => {
  const [qnaPassword, setQnaPassword] = useState("");

  const handlePasswordChange = (e) => {
    setQnaPassword(e.target.value);
  };
  console.log(qnaId);
  const confirmPassword = (e) => {
    // qna_id와 input pwd를 보내서 같다면 해당 게시물 페이지로 이동
    // 일치하지 않으면 빠꾸
  };

  return (
    <div>
      <div className="qna-private-page">
        <div className="qnaLogo">Q & A</div>
      </div>
      <hr className="qna-line" />
      <div className="qna-private-page">
        <p>
          이 글은 비밀글입니다.
          <span style={{ color: "lightblue", paddingLeft: "5px" }}>
            비밀번호를 입력하여 주세요.
          </span>
        </p>
        <p>관리자는 확인버튼만 누르시면 됩니다.</p>
        <p style={{ color: "black", paddingRight: "10px", marginTop: "30px" }}>
          비밀번호{" "}
          <input
            type="password"
            value={qnaPassword}
            onChange={handlePasswordChange}
          />
        </p>
        <Link to="/qna" className="qna-cancleBtn">
          목록
        </Link>
        <button className="qna-submitBtn" onClick={confirmPassword}>
          확인
        </button>
      </div>
      <hr className="qna-line" />
    </div>
  );
};

export default SecretForm;
