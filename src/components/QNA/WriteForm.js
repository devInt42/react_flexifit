import React, { useState } from "react";
import "../../styles/pages/QNA.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WriteForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState("");

  // Show/hide password
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div className="qna-Writepage">
      <p className="WriteLogo ">Q & A</p>
      <p className="WriteMiniLogo">상품 Q&A입니다.</p>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          제목
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          내용
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="10"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="formFileSm" className="form-label">
          첨부파일
        </label>
        <input
          className="form-control form-control-sm"
          id="formFileSm"
          type="file"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">비밀번호</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={userPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
          />
          <span
            className="password-toggle"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <div className="button-row">
        <Link to="/qna" className="button list-button">
          목록
        </Link>
        <Link to="/qna" className="button cancel-button">
          취소
        </Link>
        <button className="button submit-button">수정</button>
      </div>
    </div>
  );
};

export default WriteForm;
