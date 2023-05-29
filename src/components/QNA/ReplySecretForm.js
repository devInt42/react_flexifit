import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ReplySecretForm = () => {
  const [qnaId, setQnaId] = useState(null);
  const [qnaPassword, setQnaPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(qnaId);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("qnaId");
    setQnaId(id);
  }, [location]);

  const handlePasswordChange = (e) => {
    setQnaPassword(e.target.value);
  };

  const confirmPassword = async () => {
    const param = {
      data: {
        qnaId: qnaId,
        qnaPassword: qnaPassword,
      },
    };
    try {
      const res = await axios.post("http://localhost:8080/qna/check", param);
      if (res.data === 0) {
        alert("비밀번호가 틀렸습니다.");
        navigate("/qna");
      } else if (res.data === 1) {
        navigate(`/qna/reply?qnaId=${qnaId}`);
      }
    } catch (err) {
      console.error(err);
    }
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

export default ReplySecretForm;
