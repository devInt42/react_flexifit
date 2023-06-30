import React, { useEffect, useState } from "react";
import "../../styles/pages/FAQ.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WriteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const param = {
      data: {
        title: title,
        content: content,
      },
    };
    try {
      const res = await axios.post("http://localhost:8080/faq/insert", param);
      console.log(res.data);
      if (res.data.resultMsg == "false") {
        alert("제목과 내용은 필수 값 입니다.");
      } else {
        alert("등록 되었습니다.");
        navigate("/faq");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="faq-page">
      <span className="faqLogo">FAQ</span>

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

      <div className="button-row">
        <Link to="/faq" className="button list-button">
          목록
        </Link>
        <Link to="/faq" className="button cancel-button">
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
    </div>
  );
};

export default WriteForm;
