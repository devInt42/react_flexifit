import React, { useEffect, useState } from "react";
import "../../styles/pages/QNA.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const WriteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState(""); // 초기화

  const userSeq = sessionStorage.getItem("userSeq");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("file", null);
    }

    formData.append("title", title);
    formData.append("content", content);
    formData.append("userPassword", userPassword);
    formData.append("userSeq", userSeq);

    try {
      const res = await axios.post(
        "http://localhost:8080/qna/insert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.resultMsg === "false") {
        alert("제목과 내용은 필수값 입니다.");
      } else {
        alert("등록되었습니다.");
        navigate("/qna");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="qna-Writepage">
      <p className="WriteLogo">Q & A</p>
      <p className="WriteMiniLogo">상품 Q&A입니다.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            제목
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
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
            value={content}
            onChange={handleContentChange}
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
            onChange={handleFileChange}
          />
        </div>
        {selectedFile && (
          <div>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected File" />
          </div>
        )}
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
          <button
            type="submit"
            className="button submit-button"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
